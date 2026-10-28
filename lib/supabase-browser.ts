import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * V-005 has public, browser-only learning screens, so no server authentication
 * or privileged Supabase SDK calls are needed at this stage.
 * A later release with protected user data must add server-side verification
 * and ownership-based RLS; browser state alone is never authorization.
 */
let browserClient: SupabaseClient | null = null;

export function getAuthSetupMessage(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return "Sign-in is not configured yet. You can continue learning as a guest.";
  }
  // Never accept a privileged secret as a browser key.
  if (key.startsWith("sb_secret_") || key.startsWith("sb_service_role_")) {
    return "A private server key was supplied as public browser configuration. Sign-in is disabled.";
  }
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
      return "Supabase project URL is invalid. Guest learning is still available.";
    }
  } catch {
    return "Supabase project URL is invalid. Guest learning is still available.";
  }
  return null;
}

export function getBrowserAuth(): SupabaseClient | null {
  if (typeof window === "undefined" || getAuthSetupMessage()) return null;
  if (!browserClient) {
    browserClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          flowType: "pkce"
        }
      }
    );
  }
  return browserClient;
}
