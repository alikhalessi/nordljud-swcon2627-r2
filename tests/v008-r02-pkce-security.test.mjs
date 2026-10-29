import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const client = readFileSync(new URL("../lib/supabase-browser.ts",import.meta.url),"utf8");
const callback = readFileSync(new URL("../app/auth/callback/page.tsx",import.meta.url),"utf8");
const reset = readFileSync(new URL("../app/auth/reset/page.tsx",import.meta.url),"utf8");

test("R02 security: the explicit PKCE handler owns code exchange; SDK cannot race to auto-consume code",()=>{
  assert.match(client,/detectSessionInUrl:\s*false/);
  assert.match(callback,/exchangeCodeForSession\(/);
  assert.match(reset,/exchangeCodeForSession\(/);
});
test("R02 security: callback must validate a one-time code instead of accepting an older signed-in session",()=>{
  assert.match(callback,/params\.get\("code"\)/);
  assert.match(callback,/if\(!code\)/);
  assert.match(callback,/auth\.auth\.getUser\(/);
  assert.doesNotMatch(callback,/if\(!session&&params\.has\("code"\)\)/);
});
test("R02 security: reset never enables password changes using a pre-existing session alone",()=>{
  assert.match(reset,/params\.get\("code"\)/);
  assert.match(reset,/if\(!code\)/);
  assert.match(reset,/exchangeCodeForSession\(/);
  assert.match(reset,/auth\.getUser\(/);
  assert.doesNotMatch(reset,/if\(error\|\|!data\.session\)/);
});
