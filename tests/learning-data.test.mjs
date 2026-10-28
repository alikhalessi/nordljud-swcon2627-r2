import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const levels = ["A2", "B1", "B2", "C1"];
const seeds = read("../shared-content/mission-seeds.json").missions;

test("there is a Swedish learning dataset for every level", () => {
  for (const level of levels) {
    const entries = read(`../shared-content/verb-library/${level}.json`);
    assert.ok(Array.isArray(entries), `${level} should provide an array`);
    assert.ok(entries.length > 0, `${level} should not be empty`);
  }
});

test("the first version offers one lesson seed for each level", () => {
  assert.deepEqual(seeds.map((item) => item.level), levels);
});

test("each lesson seed can show a Swedish and English example", () => {
  for (const seed of seeds) {
    const rows = read(`../shared-content/verb-library/${seed.level}.json`);
    const row = rows.find((item) => item.v === seed.verb);
    assert.ok(row, `Missing target verb ${seed.verb} in ${seed.level}`);
    assert.ok(row.forms.Pres.sv?.trim(), `Missing Swedish example for ${seed.id}`);
    assert.ok(row.forms.Pres.en?.trim(), `Missing English example for ${seed.id}`);
  }
});
