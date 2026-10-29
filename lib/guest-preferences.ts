/**
 * V-006-F03: browser-local guest study *selection* only.
 * This module never stores an account, practice score, favorites or history.
 * Storage may be disabled by the browser; study must continue without it.
 */
export type GuestLevel = "A2" | "B1" | "B2" | "C1";
export type GuestStudyMode = "learn" | "practice";
export type GuestPreferences = {
  level: GuestLevel;
  verb: string;
  meaning: string;
  mode: GuestStudyMode;
};

const STORAGE_KEY = "nordljud-r2-guest-selection-v1";
const defaults: GuestPreferences = {
  level: "A2",
  verb: "",
  meaning: "",
  mode: "learn"
};

export function readGuestPreferences(): GuestPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const json = window.localStorage.getItem(STORAGE_KEY);
    if (!json) return null;
    const value: unknown = JSON.parse(json);
    if (!value || typeof value !== "object") return null;
    const input = value as Record<string, unknown>;
    if (!["A2", "B1", "B2", "C1"].includes(String(input.level))) return null;
    if (input.mode !== "learn" && input.mode !== "practice") return null;
    if (typeof input.verb !== "string" || input.verb.length > 150) return null;
    if (typeof input.meaning !== "string" || input.meaning.length > 300) return null;
    return {
      level: input.level as GuestLevel,
      verb: input.verb,
      meaning: input.meaning,
      mode: input.mode
    };
  } catch {
    // Private browsing and disabled storage must not break Guest Mode.
    return null;
  }
}

export function updateGuestPreferences(patch: Partial<GuestPreferences>): void {
  if (typeof window === "undefined") return;
  try {
    const next = { ...(readGuestPreferences() ?? defaults), ...patch };
    if (!["A2", "B1", "B2", "C1"].includes(next.level)) return;
    if (next.mode !== "learn" && next.mode !== "practice") return;
    if (typeof next.verb !== "string" || next.verb.length > 150) return;
    if (typeof next.meaning !== "string" || next.meaning.length > 300) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Local preferences are optional; never block learning on storage errors.
  }
}
