import { runAutomaticOperation } from "../domain/operation-state";
export interface AuthConfiguration {url:string;publishableKey:string;canonicalOrigin:string}
export interface AuthPort {getUser:()=>Promise<{data:{user:{id:string}|null};error:unknown}>;exchangeCodeForSession:(code:string)=>Promise<{error:unknown}>;signOut:(options:{scope:"local"})=>Promise<{error:unknown}>}
export interface AuthOutcome {status:"authenticated"|"signed-out"|"unavailable";ownerId?:string;message:string}
function hostedOrigin(value:string):string|null {
 try{const url=new URL(value);if(url.protocol!=="https:"||url.username||url.password||url.pathname!=="/"||url.search||url.hash||url.hostname==="localhost"||url.hostname.endsWith(".localhost")||/^[\d.]+$/.test(url.hostname)||url.hostname.includes(":"))return null;return url.origin;}catch{return null;}
}
export function readAuthConfiguration(env:Record<string,string|undefined>=process.env):AuthConfiguration|null {
 if(env.NORDLJUD_ACCOUNT_ENABLED!=="1")return null;
 const url=hostedOrigin(env.NEXT_PUBLIC_SUPABASE_URL??"");
 const canonicalOrigin=hostedOrigin(env.NORDLJUD_APP_ORIGIN??"");
 const publishableKey=env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
 if(!url||!canonicalOrigin||!/^sb_publishable_[A-Za-z0-9_-]{4,4096}$/.test(publishableKey))return null;
 return {url,publishableKey,canonicalOrigin};
}
export function canonicalCallback(config:AuthConfiguration):string|null {const origin=hostedOrigin(config.canonicalOrigin);return origin?`${origin}/auth/callback`:null;}
export function safeMutationRequest(request:Request,config:AuthConfiguration):boolean {
 const origin=hostedOrigin(config.canonicalOrigin);
 return !!origin&&new URL(request.url).origin===origin&&request.headers.get("origin")===origin&&request.headers.get("content-type")?.split(";")[0].trim().toLowerCase()==="application/json";
}
export async function verifiedSession(auth:AuthPort):Promise<AuthOutcome>{
 const result=await runAutomaticOperation(()=>auth.getUser(),{kind:"read"});
 if(result.status!=="ready")return {status:"unavailable",message:"Account verification is unavailable. Continue Guest learning or try again."};
 const {data,error}=result.value;
 if(error){
  const missing=typeof error==="object"&&error!==null&&(("name" in error&&error.name==="AuthSessionMissingError")||("status" in error&&(error.status===401||error.status===403)));
  return missing?{status:"signed-out",message:"No valid account session. Continue as a Guest or sign in again."}:{status:"unavailable",message:"Account verification is unavailable. Continue Guest learning or try again."};
 }
 if(!data.user)return {status:"signed-out",message:"Signed out. Guest learning remains available."};
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.user.id))return {status:"unavailable",message:"Account identity could not be verified. Continue Guest learning."};
 return {status:"authenticated",ownerId:data.user.id,message:"Account session verified. Cloud progress still requires its separate authorized schema and ownership checks."};
}
export async function freshOwner(auth:AuthPort):Promise<string|null>{const result=await verifiedSession(auth);return result.status==="authenticated"?result.ownerId??null:null;}
export async function completeCallback(auth:AuthPort,query:URLSearchParams,hasVerifier:boolean):Promise<AuthOutcome>{
 const failed:AuthOutcome={status:"unavailable",message:"Sign-in did not complete. Return to the original browser and start a fresh sign-in; Guest learning remains available."};
 const codes=query.getAll("code");
 if(!hasVerifier||codes.length!==1||!codes[0]||codes[0].length>2048||[...query.keys()].some(key=>key!=="code"))return failed;
 const exchange=await runAutomaticOperation(()=>auth.exchangeCodeForSession(codes[0]),{kind:"read"});
 if(exchange.status!=="ready"||exchange.value.error)return failed;
 const session=await verifiedSession(auth);
 return session.status==="authenticated"?session:failed;
}
export async function signOutThisBrowser(auth:AuthPort):Promise<AuthOutcome>{
 const result=await runAutomaticOperation(()=>auth.signOut({scope:"local"}),{kind:"write"});
 return result.status==="saved"&&!result.value.error?{status:"signed-out",message:"Signed out of this browser. Saved account progress was not deleted; other device sessions may remain active."}:{status:"unavailable",message:"Sign-out was not confirmed. Private views must remain paused; retry this browser's sign-out or continue separate Guest learning."};
}
