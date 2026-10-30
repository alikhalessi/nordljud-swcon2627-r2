import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LEVELS } from "../../src/domain/contracts";
import { getMission } from "../../src/data/missions";
import { loadLexicon } from "../../src/data/lexicon";
describe("frozen mission metadata, before practice-question generation", () => {
  const seeds = JSON.parse(readFileSync("shared-content/mission-seeds.json","utf8")).missions;
  const ordinals = [14,141,140,292];
  LEVELS.forEach((level,i) => it(`resolves ${level} only to its source-backed seed`, () => {
    const mission = getMission(level);
    expect(mission.id).toBe(seeds[i].id);
    expect(mission.level).toBe(level);
    expect(mission.title).toBe(seeds[i].title);
    expect(mission.learnerGoal).toBe(seeds[i].learnerGoal);
    expect(mission.formKeys).toEqual(seeds[i].formKeys);
    expect(mission.sourceSenseId).toBe(`${level}:${String(ordinals[i]).padStart(4,"0")}`);
    expect(mission.sense).toEqual(loadLexicon(level).records[ordinals[i]]);
    expect(mission).not.toHaveProperty("checks");
  }));
});
