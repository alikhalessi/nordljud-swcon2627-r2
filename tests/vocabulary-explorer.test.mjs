import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const levels = ["A2", "B1", "B2", "C1"];
const formKeys = ["Inf", "Imp", "Pres", "Pret", "Sup"];
const read = (level) => JSON.parse(readFileSync(new URL(`../shared-content/verb-library/${level}.json`, import.meta.url), "utf8"));

test("V-002: each level preserves all 456 semantic entries", () => {
  for (const level of levels) {
    const rows = read(level);
    assert.equal(rows.length, 456, `${level} should have 456 independently selectable records`);
    assert.ok(rows.every((row) => row.v?.trim() && row.meaning?.trim()), `${level}: a verb or meaning is missing`);
  }
});

test("V-002: all five form slots are represented and present examples are bilingual", () => {
  for (const level of levels) {
    for (const [index, row] of read(level).entries()) {
      for (const key of formKeys) {
        const form = row.forms?.[key];
        assert.ok(form, `${level} index ${index}: ${key} form slot missing`);
        assert.equal(typeof form.word, "string", `${level} index ${index}: ${key} word field absent`);
        assert.equal(typeof form.sv, "string", `${level} index ${index}: ${key} Swedish field absent`);
        assert.equal(typeof form.en, "string", `${level} index ${index}: ${key} English field absent`);
        // Empty bilingual fields already exist in the original dataset; never invent translations.
        assert.equal(Boolean(form.sv.trim()), Boolean(form.en.trim()),
          `${level} index ${index}: ${key} bilingual example incomplete`);
      }
      // Existing V-001 lesson contract: every present-tense form has a usable example.
      assert.ok(row.forms.Pres.sv.trim() && row.forms.Pres.en.trim());
    }
  }
});

test("V-002: missing source examples are real and must not be described as complete", () => {
  const expectedMissingImperativeExamples = { A2: 34, B1: 29, B2: 31, C1: 31 };
  for (const level of levels) {
    const missing = read(level).filter((row) => !row.forms.Imp.sv.trim()).length;
    assert.equal(missing, expectedMissingImperativeExamples[level]);
  }
});

test("V-002: homographic sticka senses remain two distinct records", () => {
  for (const level of levels) {
    const senses = read(level).filter((row) => row.v === "sticka");
    assert.equal(senses.length, 2, `${level} should keep two distinct sticka meanings`);
    assert.equal(new Set(senses.map((row) => row.meaning)).size, 2);
  }
});
