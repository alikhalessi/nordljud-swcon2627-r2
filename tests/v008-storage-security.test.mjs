import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadGuestSnapshot, EMPTY_GUEST_SNAPSHOT, GUEST_REVIEW_KEY, isValidDay } from "../lib/review-core.mjs";

const schema=readFileSync(new URL("../database/proposed-migrations/V008_review_learning_records_PROPOSAL_NOT_APPLIED.sql",import.meta.url),"utf8");
const store=readFileSync(new URL("../app/review-state.tsx",import.meta.url),"utf8");
const app=readFileSync(new URL("../app/learning-app.tsx",import.meta.url),"utf8");

test("V008 proposed migration declares all three owner-scoped tables and RLS",()=>{
  for(const name of ["nordljud_daily_completions","nordljud_review_items","nordljud_review_sessions"]){
    assert.ok(schema.includes(`create table if not exists public.${name}`));
    assert.ok(schema.includes(`alter table public.${name} enable row level security;`));
    assert.ok(schema.includes(`revoke all on public.${name} from anon;`));
    assert.ok(schema.includes(`grant select,insert,update,delete on public.${name} to authenticated;`));
  }
  assert.equal((schema.match(/\(select auth\.uid\(\)\) = user_id/g)??[]).length,15);
  assert.match(schema,/with check \(\(select auth\.uid\(\)\) = user_id\)/);
  assert.match(schema,/NOT APPLIED TO ANY ENVIRONMENT/);
  assert.doesNotMatch(schema,/service_role/i);
});
test("V008 no guest data or account data merge while account is loading",()=>{
  assert.ok(GUEST_REVIEW_KEY.includes("guest-review-v1"));
  assert.match(store,/if\(auth\.loading\)return/);
  assert.match(store,/userIdRef\.current!==id/);
  assert.match(store,/setState\(\{\.\.\.EMPTY_GUEST_SNAPSHOT\}\)/);
  assert.match(store,/if\(mode!=="guest"\)return/);
  assert.match(store,/BLOCKED: Secure cloud review tables/);
});
test("V008 malformed or hostile browser snapshot does not create private records",()=>{
  const examples=[
    JSON.stringify({version:1,completions:[],reminders:[{level:"A2",verb:"sticka",meaning:"knit",dueOn:"2026-11-02"}],sessions:[]}),
    JSON.stringify({version:1,completions:[{level:"B4",lessonOn:"2026-11-01",algorithmVersion:"f04-2026-10-29-v1"}],reminders:[],sessions:[]}),
    JSON.stringify({version:1,completions:[],reminders:[],sessions:[{id:"hi",score:3,total:1}]}),
    "x".repeat(200001)
  ];
  for(const s of examples)assert.deepEqual(loadGuestSnapshot(s),EMPTY_GUEST_SNAPSHOT);
  assert.equal(isValidDay("2026-13-01"),false);
});
test("V008 no notification or migration runtime in UI",()=>{
  const files=[app,store,
    readFileSync(new URL("../app/my-review.tsx",import.meta.url),"utf8"),
    readFileSync(new URL("../app/daily-archive.tsx",import.meta.url),"utf8")];
  for(const file of files)assert.doesNotMatch(file,/PushManager|requestPermission\(|service_role|apply_migration/);
  assert.match(app,/role="tablist" aria-label="Your Learning views"/);
});
