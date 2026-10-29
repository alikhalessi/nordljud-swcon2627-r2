import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {authErrorText} from "../lib/auth-flow.mjs";

const ui=readFileSync(new URL("../app/auth-controls.tsx",import.meta.url),"utf8");

test("R02 QA RED: sign-out failure does not display raw provider error or private identifiers",()=>{
  const signout=ui.match(/async function signOut\(\) \{([\s\S]*?)\n  \}\n\n  return \(/)?.[1];
  assert.ok(signout,"signOut implementation must be inspected");
  assert.doesNotMatch(signout,/cause\.message/,"raw exception text must never reach a sign-out UI");
  assert.match(signout,/authErrorText\(cause/);
  assert.doesNotMatch(authErrorText({code:"unknown",message:"account private@example.com"}),/private@example.com/);
});

test("R02 QA RED: initial getUser() cannot overwrite a newer auth event",()=>{
  assert.match(ui,/createAuthRevisionGuard\(/);
  assert.match(ui,/authRevision\.advance\(/);
  assert.match(ui,/const lookupRevision = authRevision\.capture\(\)/);
  assert.match(ui,/!authRevision\.isCurrent\(lookupRevision\)/);
});

test("R02 QA RED: auth-event revision behavior invalidates stale async work",async()=>{
  const mod=await import("../lib/auth-flow.mjs");
  assert.equal(typeof mod.createAuthRevisionGuard,"function","a standalone testable revision guard is required");
  const revision=mod.createAuthRevisionGuard();
  const first=revision.capture();
  assert.equal(revision.isCurrent(first),true);
  revision.advance();
  assert.equal(revision.isCurrent(first),false,"older initial lookup must not supersede newer auth event");
  const second=revision.capture();
  assert.equal(revision.isCurrent(second),true);
  revision.advance();
  assert.equal(revision.isCurrent(second),false,"multiple changes must invalidate every stale lookup");
});
