/** Shared CORE contracts. Source strings remain untouched. */
export const LEVELS = ["A2", "B1", "B2", "C1"] as const;
export type Level = (typeof LEVELS)[number];
export const FORM_KEYS = ["Inf", "Imp", "Pres", "Pret", "Sup"] as const;
export type FormKey = (typeof FORM_KEYS)[number];
export interface SourceForm { word: string; sv: string; en: string }
export interface FieldAvailability { word: boolean; sv: boolean; en: boolean }
export interface RawSense {
  v: string; frequency: string; meaning: string; page: number;
  forms: Record<FormKey, SourceForm>;
}
export interface SenseRecord extends RawSense {
  id: string; senseId: string; level: Level; ordinal: number;
  availability: Record<FormKey, FieldAvailability>;
}
export type SourceSense = SenseRecord;
export interface LexiconCollection {
  level: Level; sourceManifestId: string; sourceBlob: string; records: SenseRecord[];
}
export interface Mission {
  id: string; level: Level; title: string; learnerGoal: string; verb: string;
  formKeys: FormKey[]; sourceSenseId: string; sense: SenseRecord; sourceManifestId: string;
  checks?: MissionChecks;
}
export interface SenseFlags { favorite: boolean; studied: boolean }
export type FlagAction = "favorite" | "unfavorite" | "markStudied" | "unmarkStudied";
export type CheckKind = "comprehension" | "verbForm";
export interface CheckChoice { id: string; label: string }
export interface CheckDefinition {
  id: string; kind: CheckKind; prompt: string; sourceText: string; formKey: FormKey;
  available: boolean; unavailableReason: string | null;
  choices: CheckChoice[]; correctChoiceId: string | null;
}
export type MissionChecks = Record<CheckKind, CheckDefinition>;
export type PracticeOutcome = "correct" | "incorrect" | "revealed" | "unavailable";
export interface PracticeState {
  attemptId: string; revealed: boolean; outcome: PracticeOutcome | null;
  latestOutcome: PracticeOutcome | null; selectedChoiceId: string | null; credit: 0 | 1;
}
export interface CounterpartResult { sense: SenseRecord | null; reason: "missing" | "ambiguous" | null }
