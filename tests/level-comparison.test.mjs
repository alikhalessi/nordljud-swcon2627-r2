import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const levels = ["A2", "B1", "B2", "C1"];
const load = (level) =>
  JSON.parse(readFileSync(new URL(`../shared-content/verb-library/${level}.json`, import.meta.url), "utf8"));
const datasets = Object.fromEntries(levels.map((level) => [level, load(level)]));
const identity = (row) => `${row.v}\u0000${row.meaning}`;

test("V-003: every exact verb-and-meaning identity exists once in every level", () => {
  const reference = datasets.A2.map(identity).sort();
  assert.equal(reference.length, 456);
  assert.equal(new Set(reference).size, 456);
  for (const level of levels) {
    const actual = datasets[level].map(identity).sort();
    assert.deepEqual(actual, reference, `${level} identities should match A2`);
  }
});

test("V-003: arbeta has a distinct bilingual present-tense example per level", () => {
  const examples = levels.map((level) => {
    const matches = datasets[level].filter((row) => row.v === "arbeta" && row.meaning === "work");
    assert.equal(matches.length, 1);
    assert.ok(matches[0].forms.Pres.sv.trim());
    assert.ok(matches[0].forms.Pres.en.trim());
    return matches[0].forms.Pres.sv;
  });
  assert.equal(new Set(examples).size, 4);
});

test("V-003: sticka's two meanings remain separate across levels", () => {
  const senses = datasets.A2.filter((row) => row.v === "sticka");
  assert.equal(senses.length, 2);
  for (const sense of senses) {
    for (const level of levels) {
      const matches = datasets[level].filter((row) =>
        row.v === sense.v && row.meaning === sense.meaning
      );
      assert.equal(matches.length, 1);
    }
  }
});
