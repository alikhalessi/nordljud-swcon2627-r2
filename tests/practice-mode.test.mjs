import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { canRevealCorrectAnswer, makePracticeQuestions, isAvailableFormWord } from "../lib/practice-engine.mjs";

const levels = ["A2", "B1", "B2", "C1"];
function rowsFor(level) {
  const originals = JSON.parse(readFileSync(
    new URL("../shared-content/verb-library/" + level + ".json", import.meta.url), "utf8"
  ));
  return originals.map((row, index) => ({
    id: level + "-" + index,
    verb: row.v,
    meaning: row.meaning,
    forms: row.forms
  }));
}

test("V-004: unique choices, exactly one correct option, per actual verb", () => {
  for (const level of levels) {
    const rows = rowsFor(level);
    for (const entry of rows) {
      const questions = makePracticeQuestions(entry, rows);
      // Missing forms cannot create fake form/cloze questions.
      // Require a contextual meaning item, and additional questions only
      // when the actual source has at least three different usable forms.
      const validFormCount = new Set(Object.values(entry.forms)
        .map((form) => form?.word?.trim()).filter(isAvailableFormWord)).size;
      assert.ok(questions.length >= (validFormCount >= 3 ? 2 : 1),
        level + "/" + entry.verb + ": insufficient source-grounded exercises");
      for (const q of questions) {
        assert.ok(["meaning", "form", "cloze"].includes(q.kind));
        assert.ok(q.choices.length >= 3);
        assert.equal(new Set(q.choices).size, q.choices.length);
        assert.equal(q.choices.filter((item) => item === q.answer).length, 1);
      }
    }
  }
});

test("V-004: generated cloze reconstructs an unchanged bilingual source example", () => {
  for (const level of levels) {
    const rows = rowsFor(level);
    for (const entry of rows) {
      const question = makePracticeQuestions(entry, rows).find((item) => item.kind === "cloze");
      if (!question) continue;
      assert.equal((question.context.match(/_____/g) ?? []).length, 1);
      const originalSentence = question.context.replace("_____", question.answer);
      assert.ok(Object.values(entry.forms).some((form) =>
        form.sv?.trim() === originalSentence &&
        question.explanation.includes("English: " + form.en?.trim())
      ), level + "/" + entry.verb + ": cloze source example cannot be reconstructed");
    }
  }
});

test("V-004: separate sense-specific exercises for both meanings of sticka", () => {
  for (const level of levels) {
    const rows = rowsFor(level);
    const senses = rows.filter((item) => item.verb === "sticka");
    assert.equal(senses.length, 2);
    for (const entry of senses) {
      const question = makePracticeQuestions(entry, rows).find((item) => item.kind === "meaning");
      assert.equal(question?.answer, entry.meaning);
      assert.ok(question?.choices.includes(entry.meaning));
    }
  }
});

test("V-004: arbeta provides meaning, conjugation and sentence questions at each level", () => {
  for (const level of levels) {
    const rows = rowsFor(level);
    const entry = rows.find((item) => item.verb === "arbeta" && item.meaning === "work");
    assert.ok(entry);
    assert.deepEqual(makePracticeQuestions(entry, rows).map((q) => q.kind),
      ["meaning", "form", "cloze"]);
  }
});

test("V-004-F01: show-answer option is only offered on an incorrect answer, never automatically", () => {
  assert.equal(canRevealCorrectAnswer(null, "work", false, false), false);
  assert.equal(canRevealCorrectAnswer("work", "work", false, true), false);
  assert.equal(canRevealCorrectAnswer("knit", "work", false, false), true);
  assert.equal(canRevealCorrectAnswer("knit", "work", true, false), false);
  assert.equal(canRevealCorrectAnswer("knit", "work", false, true), false);
});
