import { describe, expect, it } from "vitest";
import { LEVELS } from "../../src/domain/contracts";
import { loadLexicon } from "../../src/data/lexicon";
import { getMission } from "../../src/data/missions";
import { createChecks } from "../../src/domain/check-definitions";
describe("source-backed multiple-choice definitions", () => {
  for (const level of LEVELS) it(`provides both honest check kinds for ${level}`, () => {
    const mission = getMission(level), records = loadLexicon(level).records;
    const checks = createChecks(mission,records);
    for (const kind of ["comprehension","verbForm"] as const) {
      const check = checks[kind];
      expect(check.available).toBe(true);
      expect(check.kind).toBe(kind);
      expect(check.choices.length).toBeGreaterThanOrEqual(2);
      expect(new Set(check.choices.map(c=>c.label)).size).toBe(check.choices.length);
      const field = kind === "comprehension" ? "en" : "word";
      expect(check.choices.find(c=>c.id===check.correctChoiceId)?.label).toBe(mission.sense.forms[check.formKey][field]);
      expect(check.sourceText).toBe(mission.sense.forms[check.formKey].sv);
      const permitted = new Set(records.map(s=>s.forms[check.formKey][field]));
      for (const choice of check.choices) expect(permitted.has(choice.label)).toBe(true);
    }
  });
  it("preserves comprehension when only the form word is missing", () => {
    const original=getMission("A2");
    const mission={...original,sense:{...original.sense,forms:{...original.sense.forms,Pres:{...original.sense.forms.Pres,word:"—"}}}};
    const checks=createChecks(mission,loadLexicon("A2").records);
    expect(checks.comprehension.available).toBe(true);
    expect(checks.verbForm.available).toBe(false);
    expect(checks.verbForm.choices).toEqual([]);
    expect(checks.verbForm.correctChoiceId).toBeNull();
    expect(original.sense.forms.Pres.word).not.toBe("—");
  });
  it("does not invent distractors when insufficient distinct usable source fields exist", () => {
    const mission=getMission("A2");
    const checks=createChecks(mission,[mission.sense]);
    expect(checks.comprehension.available).toBe(false);
    expect(checks.verbForm.available).toBe(false);
  });
});
