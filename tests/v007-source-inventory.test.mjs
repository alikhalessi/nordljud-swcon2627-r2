import test from "node:test";
import assert from "node:assert/strict";
import { inspectAll } from "../scripts/v007-source-quality-inventory.mjs";

test("V-007: reproducible quality inventory preserves all four source arrays and exact flags", () => {
  const found = inspectAll();
  assert.deepEqual(found.map(({level}) => level), ["A2","B1","B2","C1"]);
  const missing = [36,32,31,32];
  const examples = [36,29,31,31];
  const withExamples = [0,3,0,1];
  for (let i=0;i<found.length;i++) {
    const {level,counters,flags} = found[i];
    assert.equal(counters.totalSenseRecords, 456, level);
    assert.equal(counters.missingFormSlots, missing[i], level);
    assert.equal(counters.missingBilingualExamples, examples[i], level);
    assert.equal(counters.oneSidedBilingualExamples, 0, level);
    assert.equal(counters.formUnavailableButExampleProvided, withExamples[i], level);
    assert.equal(counters.repeatedSpellings, 1, level);
    assert.ok(flags.every(f => f.source.endsWith(`/${level}.json`) &&
      f.rowOneBased === f.indexZeroBased + 1));
    const sticka = flags.filter(f => f.issue === "REPEATED_SPELLING_DISTINCT_SENSE" && f.verb === "sticka");
    assert.equal(sticka.length, 2, level);
  }
});

test("V-007: missing form with authentic bilingual example is flagged for expert review, not repaired in source", () => {
  const records = inspectAll();
  const b1 = records.find(x => x.level === "B1");
  const issues = b1.flags.filter(f => f.issue === "MISSING_FORM_WITH_EXAMPLE_REVIEW");
  assert.deepEqual(issues.map(f => f.rowOneBased), [84,87,230]);
  const c1 = records.find(x => x.level === "C1");
  assert.deepEqual(c1.flags.filter(f => f.issue === "MISSING_FORM_WITH_EXAMPLE_REVIEW")
    .map(f => f.rowOneBased), [87]);
});
