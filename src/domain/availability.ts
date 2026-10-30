import type { FieldAvailability, SourceForm } from "./contracts";

/** Availability is derived; original source strings are never repaired. */
export function fieldAvailable(value: unknown): boolean {
  if (typeof value !== "string" || value.trim() === "") return false;
  return !/^(?:—|–|-|\.{2,}|…|n\/a|tbd|todo|\[missing\]|\[unavailable\])$/i.test(value.trim());
}

export function formAvailability(form: Partial<SourceForm> | null | undefined): FieldAvailability {
  return { word: fieldAvailable(form?.word), sv: fieldAvailable(form?.sv), en: fieldAvailable(form?.en) };
}
