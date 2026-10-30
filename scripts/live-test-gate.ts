import { readFileSync } from "node:fs";
export function requireLiveTestAuthorization() {
  const file = process.env.NORDLJUD_D02_AUTHORIZATION_FILE;
  if (process.env.NORDLJUD_LIVE_TESTS !== "1" || !file) throw new Error("BLOCKED: explicit live opt-in and actual D02 authorization record required before network access");
  const grant = JSON.parse(readFileSync(file, "utf8")) as { approved: boolean; targetUrl: string; operations: string[] };
  const target = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!grant.approved || !target || new URL(target).origin !== new URL(grant.targetUrl).origin || !grant.operations?.includes("synthetic-account-tests")) throw new Error("BLOCKED: D02 target/test-operation authorization does not match");
  return grant;
}
