import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  addLocalDays, dayDistance, isValidDay, senseKey, loadGuestSnapshot,
  addReminder, snoozeReminder, markReviewed, toggleDailyCompletion,
  canOfferReview, assembleReviewQuestions, appendReviewSession,
  EMPTY_GUEST_SNAPSHOT
} from "../lib/review-core.mjs";
import { selectDailyVerbs, localDateKey } from "../lib/daily-lessons.ts";

const S = { level:"A2", verb:"sticka",meaning:"knit" };
const T = { level:"A2", verb:"sticka",meaning:"sting, prick; to leave (colloquial)" };
const date="2026-10-29";
function pool(level) {
  return JSON.parse(readFileSync(new URL(`../shared-content/verb-library/${level}.json`,import.meta.url),"utf8"))
    .map((x,i)=>({id:level+"-"+i,verb:x.v,meaning:x.meaning,forms:x.forms}));
}
test("V008: local date rollover, correct inclusive calendar and archive version", () => {
  assert.equal(addLocalDays("2026-10-29",2),"2026-10-31");
  assert.equal(addLocalDays("2026-12-31",1),"2027-01-01");
  assert.equal(dayDistance("2026-10-29","2026-11-12"),14);
  assert.equal(isValidDay("2026-02-29"),false);
  assert.equal(isValidDay("2028-02-29"),true);
  assert.notEqual(senseKey(S),senseKey(T));
});
test("V008: guest storage malformed, oversized and unavailable input never crashes", () => {
  for(const raw of ["","not-json","{}",'{"version":500}', '{"version":1,"completions":"oops"}',"{"]) {
    assert.deepEqual(loadGuestSnapshot(raw),EMPTY_GUEST_SNAPSHOT);
  }
  assert.deepEqual(loadGuestSnapshot(null),EMPTY_GUEST_SNAPSHOT);
});
test("V008: never equate browsing with a manually reported completion", () => {
  const original=loadGuestSnapshot(null);
  assert.equal(original.completions.length,0);
  const next=toggleDailyCompletion(original,"A2",date);
  assert.equal(next.completions.length,1);
  assert.equal(next.completions[0].lessonOn,date);
  assert.equal(toggleDailyCompletion(next,"A2",date).completions.length,0);
});
test("V008: distinct same-lemma senses and explicit two-day default due", () => {
  let state=addReminder(EMPTY_GUEST_SNAPSHOT,S,date);
  state=addReminder(state,T,date);
  assert.equal(state.reminders.length,2);
  assert.ok(state.reminders.every(x=>x.dueOn==="2026-10-31"));
  assert.equal(addReminder(state,S,date).reminders.length,2);
  assert.notEqual(state.reminders[0].meaning,state.reminders[1].meaning);
  assert.deepEqual(loadGuestSnapshot(JSON.stringify(state)),state);
});
test("V008: snooze and Mark reviewed keep review intent without auto mastery", () => {
  let state=addReminder(EMPTY_GUEST_SNAPSHOT,S,date);
  state=snoozeReminder(state,S,"2026-10-30",7);
  assert.equal(state.reminders[0].dueOn,"2026-11-06");
  assert.equal(state.reminders[0].firstRequestedOn,date);
  state=markReviewed(state,S,"2026-11-06");
  assert.equal(state.reminders[0].lastReviewedOn,"2026-11-06");
  assert.equal(state.reminders[0].dueOn,"2026-11-13");
  assert.equal(state.reminders.length,1);
  assert.equal(state.reminders[0].reviewedCount,1);
});
test("V008: 7/14-day eligibility from first explicit request, not a calendar Sunday", () => {
  const item=addReminder(EMPTY_GUEST_SNAPSHOT,S,date).reminders[0];
  assert.equal(canOfferReview(item,7,"2026-11-04"),false);
  assert.equal(canOfferReview(item,7,"2026-11-05"),true);
  assert.equal(canOfferReview(item,14,"2026-11-11"),false);
  assert.equal(canOfferReview(item,14,"2026-11-12"),true);
});
test("V008: review questions are exact sense, authentic and no dash answers", () => {
  const rows=pool("A2");
  let state=EMPTY_GUEST_SNAPSHOT;
  for(const r of rows.slice(0,8)) state=addReminder(state,{level:"A2",verb:r.verb,meaning:r.meaning},date);
  const qs=assembleReviewQuestions(state.reminders,{A2:rows},"2026-11-05",7);
  assert.ok(qs.length>=5 && qs.length<=10, "reliable 5–10 questions expected with eight source senses");
  for(const q of qs) {
    assert.equal(q.level,"A2");
    assert.equal(q.choices.filter(x=>x===q.answer).length,1);
    assert.ok(q.choices.every(x=>x!=="—"));
    assert.ok(rows.find(x=>x.verb===q.verb && x.meaning===q.meaning));
  }
  assert.equal(assembleReviewQuestions(state.reminders,{A2:rows},"2026-11-04",7).length,0);
});
test("V008: append actual review result separately, never mark mastery or remove queue", () => {
  const original=addReminder(EMPTY_GUEST_SNAPSHOT,S,date);
  const result={id:"test-session-1",windowDays:7,reviewedOn:"2026-11-05",score:0,total:1,results:[{...S,questionId:"meaning",correct:false}]};
  const next=appendReviewSession(original,result);
  assert.equal(next.sessions.length,1);
  assert.equal(next.sessions[0].score,0);
  assert.equal(next.reminders.length,1);
});
test("V008: all four level daily sets reconstruct for dates without writing sources", async()=>{
  for(const level of ["A2","B1","B2","C1"]){
    const rows=pool(level);
    const before=selectDailyVerbs(rows,level,"2026-10-29");
    const again=selectDailyVerbs(rows,level,"2026-10-29");
    assert.deepEqual(before,again);
    assert.equal(before.length,3);
  }
});
test("V008: source contains four learning subviews, record boundaries and reminder affordances",()=>{
  const app=readFileSync(new URL("../app/learning-app.tsx",import.meta.url),"utf8");
  const daily=readFileSync(new URL("../app/daily-lesson.tsx",import.meta.url),"utf8");
  const explore=readFileSync(new URL("../app/vocabulary-explorer.tsx",import.meta.url),"utf8");
  const provider=readFileSync(new URL("../app/review-state.tsx",import.meta.url),"utf8");
  assert.match(app,/Your Learning views/);
  for(const label of ["Today's Lesson","Daily Archive","My Review","My Progress"]) assert.ok(app.includes(label));
  assert.match(daily,/Remind Me Later/);
  assert.match(explore,/Remind Me Later/);
  assert.match(provider,/Clear guest learning data/);
  assert.match(app,/<DailyArchive/);
  assert.match(app,/<MyReview/);
});
