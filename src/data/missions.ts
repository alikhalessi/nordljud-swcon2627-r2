import { FORM_KEYS } from "../domain/contracts";
import type { FormKey, Level, Mission } from "../domain/contracts";
import { loadLexicon, readFrozenJson } from "./lexicon";

interface MissionSeed { id: string; level: Level; title: string; learnerGoal: string; verb: string; formKeys: FormKey[] }
interface SeedDocument { schemaVersion: string; missions: MissionSeed[] }

/** Metadata only: practice generation follows its separate test-first stage. */
export function getMission(level: Level): Mission {
  const collection = loadLexicon(level);
  const document = readFrozenJson<SeedDocument>("shared-content/mission-seeds.json");
  const seeds = document.missions.filter(seed => seed.level === level);
  if (document.schemaVersion !== "1.0" || seeds.length !== 1) throw new Error("Unexpected frozen mission identity");
  const seed = seeds[0];
  if (!seed.formKeys.every(key => FORM_KEYS.includes(key))) throw new Error("Unsupported frozen form reference");
  const senses = collection.records.filter(record => record.v === seed.verb);
  if (senses.length !== 1) throw new Error("Frozen mission must identify one unambiguous source sense");
  return { id: seed.id, level, title: seed.title, learnerGoal: seed.learnerGoal, verb: seed.verb,
    formKeys: [...seed.formKeys], sourceSenseId: senses[0].id, sense: senses[0], sourceManifestId: collection.sourceManifestId };
}
export const loadMission = getMission;
