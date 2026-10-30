import { describe, expect, it } from "vitest";
import { applyFlagAction, completeMission, defaultFlags, updateSenseFlags } from "../../src/domain/learner-state";

describe("explicit, level-specific learner choices", () => {
  it("starts unmarked and changes only the requested field without mutation", () => {
    const flags = defaultFlags();
    expect(flags).toEqual({ favorite: false, studied: false });
    const favorite = applyFlagAction(flags, "favorite");
    expect(favorite).toEqual({ favorite: true, studied: false });
    expect(flags).toEqual({ favorite: false, studied: false });
    expect(applyFlagAction(favorite, "markStudied")).toEqual({ favorite: true, studied: true });
    expect(applyFlagAction({ favorite: true, studied: true }, "unfavorite")).toEqual({ favorite: false, studied: true });
    expect(applyFlagAction({ favorite: true, studied: true }, "unmarkStudied")).toEqual({ favorite: true, studied: false });
  });
  it("never copies flags between levels or same-spelling senses", () => {
    const state = { "A2:0361": { favorite: true, studied: false }, "C1:0361": { favorite: false, studied: true }, "A2:0362": defaultFlags() };
    const next = updateSenseFlags(state, "A2:0361", "markStudied");
    expect(next["A2:0361"]).toEqual({ favorite: true, studied: true });
    expect(next["C1:0361"]).toEqual({ favorite: false, studied: true });
    expect(next["A2:0362"]).toEqual(defaultFlags());
    expect(state["A2:0361"].studied).toBe(false);
  });
  it("treats completion as explicit idempotent self-report, not Studied", () => {
    const flags = defaultFlags();
    expect(completeMission(false)).toBe(true);
    expect(completeMission(true)).toBe(true);
    expect(flags).toEqual(defaultFlags());
  });
});
