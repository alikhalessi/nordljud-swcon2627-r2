import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const levels = ["A2", "B1", "B2", "C1"];
const read = (level) => JSON.parse(readFileSync(new URL(`../shared-content/verb-library/${level}.json`, import.meta.url), "utf8"));

test("V-002: explorer source has all 456 semantic entries at each level", () => {
  for (const level of levels) {
    const rows = read(level);
    assert.equal(rows.length, 456, `${level} should have 456 independently selectable records`);
    assert.ok(rows.every((row) => row.v?.trim() && row.meaning?.trim()), `${level} missing verb or meaning`);
  }
});

test("V-002: all five conjugation forms and bilingual examples exist", () => {
  for (const level of levels) {
    for (const [index, row] of read(level).entries()) {
      for (const key of ["Inf", "Imp", "Pres", "Pret", "Sup"]) {
        assert.ok(row.forms[key]?.word?.trim(), `${level} index ${index}: ${key}.word missing`);
        assert.ok(row.forms[key]?.sv?.trim(), `${level} index ${index}: ${key}.sv missing`);
        assert.ok(row.forms[key]?.en?.trim(), `${level} index ${index}: ${key}.en missing`);
      }
    }
  }
});

test("V-002: homographic sticka senses remain two distinct records", () => {
  for (const level of levels) {
    const senses = read(level).filter((row) => row.v === "sticka");
    assert.equal(senses.length, 2, `${level} should keep two distinct sticka meanings`);
    assert.equal(new Set(senses.map((row) => row.meaning)).size, 2);
  }
});
