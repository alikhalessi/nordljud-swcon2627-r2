// R02: pure redirect validation and non-enumerating authentication messages.
// Exact HTTPS origins only. Do not accept arbitrary *.vercel.app domains.
export const KNOWN_PRODUCTION_ORIGINS = Object.freeze([
  "https://nordljud-r2-vibe-sepia.vercel.app",
  "https://nordljud-r2-vibe-aleksi9.vercel.app"
]);
const paths=new Set(["/auth/callback","/auth/reset"]);
function normalizedOrigin(raw) {
  if(typeof raw!=="string"||!raw.trim())throw new Error("Invalid app origin");
  const u=new URL(raw);
  if(u.username||u.password||u.search||u.hash||u.pathname!=="/")throw new Error("App origin must have no credentials or path");
  if(u.protocol!=="https:" && !(u.protocol==="http:" && u.hostname==="localhost"))throw new Error("Untrusted app origin");
  return u.origin;
}
export function getAllowedAppOrigin(raw, allowedOrigins=KNOWN_PRODUCTION_ORIGINS) {
  const origin=normalizedOrigin(raw);
  if(!Array.isArray(allowedOrigins)||!allowedOrigins.some(x=>{
    try{return normalizedOrigin(x)===origin;}catch{return false;}
  }))throw new Error("App origin is not in the approved redirect allowlist");
  return origin;
}
export function getAuthRedirectUrl(raw,path,allowedOrigins=KNOWN_PRODUCTION_ORIGINS) {
  if(typeof path!=="string"||!paths.has(path))throw new Error("Invalid authentication return path");
  return getAllowedAppOrigin(raw,allowedOrigins)+path;
}
export function authErrorText(error) {
  const code=error && typeof error.code==="string"?error.code:"";
  const msg=error&&typeof error.message==="string"?error.message.toLowerCase():"";
  if(code==="validation_failed" && /provider.*not enabled|unsupported provider/.test(msg))return "This sign-in method is not available yet. Please use another method or continue as a guest.";
  if(["over_email_send_rate_limit","over_request_rate_limit","too_many_requests"].includes(code))return "Too many attempts. Please try again later.";
  if(code==="email_not_confirmed")return "Confirm your email address before signing in. If needed, request another confirmation email.";
  if(code==="invalid_credentials")return "The email or password was not accepted.";
  if(code==="weak_password")return "Choose a stronger password and try again.";
  if(code==="otp_expired"||code==="flow_state_expired"||code==="bad_code_verifier")return "The sign-in or recovery link expired. Request a new one.";
  return "Authentication could not be completed. Please try again or continue as a guest.";
}
export function safeOriginsFromConfig(raw, isDevelopment=false) {
  const origins=[...KNOWN_PRODUCTION_ORIGINS];
  if(isDevelopment)origins.push("http://localhost:3000","http://localhost:3001");
  if(typeof raw==="string")for(const s of raw.split(",")){
    const v=s.trim();if(!v)continue;
    try{
      const normalized=normalizedOrigin(v);
      if(normalized.startsWith("https://")&&!origins.includes(normalized))origins.push(normalized);
    }catch{/* fail closed: malformed settings are not allowed */}
  }
  return origins;
}

/**
 * An initial asynchronous getUser() result must not replace a newer
 * auth state event (sign-out, sign-in or account switch).
 * One revision guard is scoped to each mounted observer.
 */
export function createAuthRevisionGuard() {
  let revision = 0;
  return Object.freeze({
    capture() { return revision; },
    advance() { revision += 1; },
    isCurrent(observed) { return Number.isSafeInteger(observed) && observed === revision; }
  });
}
