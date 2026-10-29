import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/daily-lessons.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const sandbox = { exports: {} };
runInNewContext(js, sandbox);
const { localDateKey, selectDailyVerbs } = sandbox.exports;
const levels = ["A2", "B1", "B2", "C1"];

function getEntries(level) {
  return JSON.parse(readFileSync(new URL(`../shared-content/verb-library/${level}.json`, import.meta.url), "utf8"))
    .map((x, index) => ({ id: level + "-" + index, verb: x.v, meaning: x.meaning, forms: x.forms }));
}
function identities(items) { return items.map(x => x.entry.verb + "\u0000" + x.entry.meaning); }

test("F04 daily selection is deterministic within a local day for all four levels", () => {
  for (const level of levels) {
    const pool = getEntries(level);
    assert.equal(pool.length, 456);
    const first = selectDailyVerbs(pool, level, "2026-10-29");
    const again = selectDailyVerbs(pool, level, "2026-10-29");
    assert.equal(first.length, 3, level);
    assert.deepEqual(identities(first), identities(again), level);
    assert.equal(new Set(identities(first)).size, 3, level);
    for (const item of first) {
      assert.equal(typeof item.entry.id, "string");
      assert.ok(item.example.sv.trim() && item.example.en.trim());
      assert.ok(pool.find(x => x.id === item.entry.id && x.meaning === item.entry.meaning));
    }
  }
});
test("F04 next local day rotates to a disjoint daily set", () => {
  for (const level of levels) {
    const pool = getEntries(level);
    const today = new Set(identities(selectDailyVerbs(pool, level, "2026-10-29")));
    const tomorrow = identities(selectDailyVerbs(pool, level, "2026-10-30"));
    assert.equal(tomorrow.length, 3);
    for (const value of tomorrow) assert.ok(!today.has(value), level + " repeated an immediate daily selection");
  }
});
test("F04 local calendar day uses local components and not a UTC date slice", () => {
  const date = new Date(2026, 9, 29, 23, 57, 2);
  assert.equal(localDateKey(date), "2026-10-29");
});
test("F04 preserves homograph senses and excludes incomplete bilingual examples", () => {
  const example = { Pres: { sv: "Jag stickar.", en: "I knit.", word: "stickar" } };
  const rows = [
    { id: "B1-0", verb: "sticka", meaning: "knit", forms: example },
    { id: "B1-1", verb: "sticka", meaning: "sting", forms: { Pres: { sv: "Det sticker.", en: "It stings." } } },
    { id: "B1-2", verb: "tom", meaning: "missing", forms: { Pres: { sv: "", en: "" } } },
    { id: "B1-3", verb: "lära", meaning: "learn", forms: { Pres: { sv: "Jag lär mig.", en: "I learn." } } }
  ];
  const chosen = selectDailyVerbs(rows, "B1", "2026-10-29");
  assert.equal(chosen.length, 3);
  assert.ok(identities(chosen).includes("sticka\u0000knit"));
  assert.ok(identities(chosen).includes("sticka\u0000sting"));
  assert.ok(!identities(chosen).includes("tom\u0000missing"));
  assert.equal(new Set(identities(chosen)).size, 3);
});
test("F04/F04-F01 route retains two main tabs, guest daily content and original lesson once", () => {
  const app = readFileSync(new URL("../app/learning-app.tsx", import.meta.url), "utf8");
  const ui = readFileSync(new URL("../app/daily-lesson.tsx", import.meta.url), "utf8");
  assert.match(app, /role="tablist" aria-label="Learning sections"/);
  assert.match(app, /role="tablist" aria-label="Your Learning views"/);
  assert.match(app, /Today's Lesson/);
  assert.match(app, /My Progress/);
  assert.match(app, /<VocabularyExplorer level=\{level\} target=\{target\}/);
  assert.match(app, /<DailyLesson level=\{level\} onOpenVerb=\{returnToVerb\}/);
  assert.equal((app.match(/className="lesson" aria-labelledby="lesson-heading"/g) || []).length, 1);
  assert.match(app, /onLearningViewKeyDown/);
  assert.match(app, /hidden=\{learningView !== "daily"\}/);
  assert.match(app, /hidden=\{learningView !== "progress"\}/);
  assert.match(ui, /Explore this verb/);
  assert.match(ui, /speechSynthesis/);
  assert.match(ui, /localDateKey\(new Date\(\)\)/);
  assert.doesNotMatch(ui, /requestPermission|PushManager|Notification\(/);
});
