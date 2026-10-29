import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  makePracticeQuestions,
  isAvailableFormWord,
  canRevealCorrectAnswer
} from "../lib/practice-engine.mjs";

const levels = ["A2", "B1", "B2", "C1"];
const rowsFor = (level) => JSON.parse(readFileSync(
  new URL(`../shared-content/verb-library/${level}.json`, import.meta.url), "utf8"
)).map((row, index) => ({
  id: `${level}-${index}`, verb: row.v, meaning: row.meaning, forms: row.forms
}));

test("V-007: missing-form sentinels cannot be spoken or become quiz options", () => {
  for (const word of [undefined, "", "  ", "—", "–", "-", "--", "−", "N/A", "not provided"]) {
    assert.equal(isAvailableFormWord(word), false, String(word));
  }
  assert.equal(isAvailableFormWord("stickar"), true);
  assert.equal(isAvailableFormWord("gå"), true);

  const synthetic = {
    id: "A2-999", verb: "testa", meaning: "test",
    forms: {
      Inf: { word: "testa", sv: "Jag vill testa.", en: "I want to test." },
      Imp: { word: "—", sv: "", en: "" },
      Pres: { word: "testar", sv: "Hon testar nu.", en: "She is testing now." },
      Pret: { word: "testade", sv: "Hon testade.", en: "She tested." },
      Sup: { word: "testat", sv: "Hon har testat.", en: "She has tested." }
    }
  };
  const qs = makePracticeQuestions(synthetic, [synthetic, {
    id: "A2-998", verb: "arbeta", meaning: "work", forms: synthetic.forms
  }]);
  assert.ok(qs.length >= 2);
  for (const q of qs) {
    assert.ok(!q.choices.includes("—"));
    assert.notEqual(q.answer, "—");
  }

  const explorer = readFileSync(new URL("../app/vocabulary-explorer.tsx", import.meta.url), "utf8");
  const compare = readFileSync(new URL("../app/level-comparison.tsx", import.meta.url), "utf8");
  assert.match(explorer, /isAvailableFormWord\(form\?\.word\)/);
  assert.match(compare, /isAvailableFormWord\(form\?\.word\)/);
  assert.match(explorer, /Form not available/);
  assert.match(compare, /Form not available/);
});

test("V-007: both sticka meanings use their own unspoiled Swedish context at all levels", () => {
  for (const level of levels) {
    const rows = rowsFor(level), senses = rows.filter((row) => row.verb === "sticka");
    assert.equal(senses.length, 2);
    const contexts = [];
    for (const entry of senses) {
      const q = makePracticeQuestions(entry, rows).find((x) => x.kind === "meaning");
      assert.ok(q, level + " " + entry.meaning);
      assert.match(q.prompt, /sentence/i);
      assert.ok(q.context.trim().length >= 10, level);
      assert.equal(q.answer, entry.meaning);
      assert.ok(q.choices.includes(senses.find((x) => x.id !== entry.id).meaning),
        "Other sticka sense should be a plausible distractor");
      assert.ok(Object.values(entry.forms).some((f) => f.sv?.trim() === q.context),
        "The Swedish sentence must be from the selected EXACT sense");
      assert.ok(!q.context.includes(q.answer), "English answer may not leak before choice");
      assert.ok(q.explanation.includes("English: "), "Show source-backed translation only after answering");
      contexts.push(q.context);
    }
    assert.notEqual(contexts[0], contexts[1], "The two sticka senses require different Swedish contexts");
  }
});

test("V-007: all four levels retain 456 senses and source-grounded unambiguous questions", () => {
  for (const level of levels) {
    const rows = rowsFor(level);
    assert.equal(rows.length, 456);
    for (const entry of rows) {
      const questions = makePracticeQuestions(entry, rows);
      assert.ok(questions.length >= 2, `${level}/${entry.verb} — insufficient reliable exercises`);
      for (const q of questions) {
        assert.equal(new Set(q.choices).size, q.choices.length);
        assert.equal(q.choices.filter((option) => option === q.answer).length, 1);
        assert.ok(q.choices.every((option) => !["—", "–", "-", "N/A"].includes(option)));
        if (q.kind === "meaning") {
          assert.ok(q.context.trim(), `${level}/${entry.verb} must have a source-context sentence`);
        }
        if (q.kind === "cloze") {
          assert.ok(Object.values(entry.forms).some((f) =>
            f.sv?.trim() === q.context.replace("_____", q.answer) &&
            q.explanation.includes("English: " + f.en?.trim())
          ), "Cloze answer must reconstruct an authentic bilingual example");
        }
      }
    }
  }
});

test("V-007: reveal after incorrect response does not award credit", () => {
  assert.equal(canRevealCorrectAnswer("wrong", "correct", false, false), true);
  assert.equal(canRevealCorrectAnswer("correct", "correct", false, true), false);
  assert.equal(canRevealCorrectAnswer("wrong", "correct", true, false), false);
  const panel = readFileSync(new URL("../app/practice-panel.tsx", import.meta.url), "utf8");
  assert.match(panel, /Revealing the answer does not earn a point/);
  assert.match(panel, /if \(value === question\.answer\)/);
  assert.match(panel, /setScore\(\(current\) => current \+ 1\)/);
});

test("V-007: navigation and original Mini Lesson are not replaced by language fixes", () => {
  const app = readFileSync(new URL("../app/learning-app.tsx", import.meta.url), "utf8");
  assert.match(app, /role="tablist" aria-label="Your Learning views"/);
  assert.match(app, /<DailyLesson level=\{level\} onOpenVerb=\{returnToVerb\}/);
  assert.match(app, /<VocabularyExplorer level=\{level\} target=\{target\}/);
  assert.match(app, /lesson\.choices\.map/);
});
