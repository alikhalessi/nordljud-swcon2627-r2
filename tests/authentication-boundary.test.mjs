import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const client = readFileSync(new URL("../lib/supabase-browser.ts", import.meta.url), "utf8");
const ui = readFileSync(new URL("../app/auth-controls.tsx", import.meta.url), "utf8");
const app = readFileSync(new URL("../app/learning-app.tsx", import.meta.url), "utf8");
const example = readFileSync(new URL("../.env.example", import.meta.url), "utf8");

test("V-005: only public publishable configuration is referenced by browser auth", () => {
  assert.match(client, /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(client, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(client, /process\.env\.SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(client, /process\.env\.SUPABASE_SECRET_KEY/);
  assert.match(client, /sb_secret_/);
  assert.match(client, /flowType: "pkce"/);
  assert.match(client, /detectSessionInUrl: true/);
  assert.match(example, /YOUR-NEW-PROJECT-REF/);
  assert.doesNotMatch(example, /(?:sb_secret_|service_role)/);
});

test("V-005: account UI provides email, Google, sign-out and Guest Mode", () => {
  assert.match(ui, /signInWithPassword/);
  assert.match(ui, /signUp/);
  assert.match(ui, /signInWithOAuth/);
  assert.match(ui, /provider: "google"/);
  assert.match(ui, /signOut/);
  assert.match(ui, /Continue as guest/);
  assert.match(ui, /window\.location\.origin/);
});

test("V-005: login is an optional addition, original lessons remain available", () => {
  assert.match(app, /VocabularyExplorer/);
  assert.match(app, /<AuthControls/);
  assert.match(app, /className="lesson"/);
});
