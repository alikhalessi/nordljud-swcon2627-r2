import type { CounterpartResult, SenseRecord } from "./contracts";

export function searchSenses(records: SenseRecord[], query: string): SenseRecord[] {
  const spelling = query.trim();
  return spelling === "" ? records : records.filter(record => record.v === spelling);
}

export function resolveCounterpart(sense: SenseRecord, target: SenseRecord[]): CounterpartResult {
  const candidates = target.filter(record => record.v === sense.v && record.meaning === sense.meaning);
  if (candidates.length === 1) return { sense: candidates[0], reason: null };
  return { sense: null, reason: candidates.length === 0 ? "missing" : "ambiguous" };
}
