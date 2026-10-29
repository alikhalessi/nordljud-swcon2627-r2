import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getAllowedAppOrigin, getAuthRedirectUrl, authErrorText} from "../lib/auth-flow.mjs";

const prod="https://nordljud-r2-vibe-sepia.vercel.app";
test("R02: OAuth/password recovery redirects must be explicit trusted HTTPS origins",()=>{
  assert.equal(getAllowedAppOrigin(prod,[prod]),prod);
  assert.equal(getAuthRedirectUrl(prod,"/auth/callback",[prod]),prod+"/auth/callback");
  assert.equal(getAuthRedirectUrl(prod,"/auth/reset",[prod]),prod+"/auth/reset");
  assert.throws(()=>getAllowedAppOrigin("https://evil.example",[prod]));
  assert.throws(()=>getAllowedAppOrigin("http://nordljud-r2-vibe-sepia.vercel.app",[prod]));
  assert.throws(()=>getAllowedAppOrigin("https://user:pass@nordljud-r2-vibe-sepia.vercel.app",[prod]));
  assert.throws(()=>getAuthRedirectUrl(prod,"//evil.example",[prod]));
  assert.throws(()=>getAuthRedirectUrl(prod,"/\\evil.example",[prod]));
  assert.throws(()=>getAuthRedirectUrl(prod,"https://evil.example",[prod]));
  assert.throws(()=>getAuthRedirectUrl(prod,"/auth/callback?secret=a",[prod]));
});
test("R02: provider-disabled and generic auth failures do not echo private provider details",()=>{
  assert.match(authErrorText({code:"validation_failed",message:"provider is not enabled"}),/not available/i);
  assert.doesNotMatch(authErrorText({code:"invalid_credentials",message:"user alice@example.com invalid"}),/alice@example.com/);
  assert.match(authErrorText({code:"over_email_send_rate_limit",message:"x"}),/try again/i);
});
test("R02: account flow includes recovery, verified redirect, and callback failure feedback",()=>{
  const ui=readFileSync(new URL("../app/auth-controls.tsx",import.meta.url),"utf8");
  assert.match(ui,/resetPasswordForEmail/);
  const reset=readFileSync(new URL("../app/auth/reset/page.tsx",import.meta.url),"utf8");
  assert.match(reset,/updateUser\(/);
  assert.match(reset,/exchangeCodeForSession\(/);
  assert.match(reset,/getUser\(/);
  assert.match(ui,/getAuthRedirectUrl\(/);
  assert.match(ui,/Forgot password/);
  assert.match(ui,/authErrorText\(/);
  assert.match(ui,/onAuthStateChange/);
  assert.doesNotMatch(ui,/emailRedirectTo: window\.location\.origin/);
  assert.doesNotMatch(ui,/redirectTo: window\.location\.origin/);
});
test("R02: cloud save must verify a changed row on updates and deletions",()=>{
  const store=readFileSync(new URL("../app/review-state.tsx",import.meta.url),"utf8");
  assert.match(store,/requireOneChangedRow/);
  assert.match(store,/\.select\("user_id"\)/);
  assert.match(store,/verified &&/);
  assert.match(store,/userIdRef\.current!==id/);
  assert.match(store,/if\(mode==="guest"\)/);
});
test("R02: candidate SQL is explicitly UNAPPLIED and ownable on every new table",()=>{
  const sql=readFileSync(new URL("../database/proposed-migrations/V008_R02_SECURE_CLOUD_SCHEMA_NOT_APPLIED.sql",import.meta.url),"utf8");
  assert.match(sql,/NOT APPLIED/);
  for(const table of ["nordljud_daily_completions","nordljud_review_items","nordljud_review_sessions"]){
    assert.ok(sql.includes("create table if not exists public."+table));
    assert.ok(sql.includes("alter table public."+table+" enable row level security"));
    assert.ok(sql.includes("revoke all on public."+table+" from anon"));
  }
  assert.match(sql,/with check \(\(select auth\.uid\(\)\) = user_id\)/);
  assert.match(sql,/jsonb_array_length\(question_results\)/);
  assert.doesNotMatch(sql,/security definer|service_role/i);
});
