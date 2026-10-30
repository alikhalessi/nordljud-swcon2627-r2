import type { FlagAction, SenseFlags } from "./contracts";

export function defaultFlags(): SenseFlags { return { favorite: false, studied: false }; }

/** Only deliberate flag actions enter this function; reading/practice never do. */
export function applyFlagAction(flags: SenseFlags, action: FlagAction): SenseFlags {
  switch (action) {
    case "favorite": return { ...flags, favorite: true };
    case "unfavorite": return { ...flags, favorite: false };
    case "markStudied": return { ...flags, studied: true };
    case "unmarkStudied": return { ...flags, studied: false };
    default: throw new RangeError("Unsupported learner flag action");
  }
}

export function updateSenseFlags(state: Record<string, SenseFlags>, id: string, action: FlagAction): Record<string, SenseFlags> {
  return { ...state, [id]: applyFlagAction(state[id] ?? defaultFlags(), action) };
}

/** Completion is explicit, idempotent self-report and changes no other state. */
export function completeMission(_current: boolean): boolean { void _current; return true; }
