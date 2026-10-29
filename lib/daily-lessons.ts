/**
 * V-006-F04: reproducible daily *picks* from frozen Swedish source records.
 * No AI content, user profiling, permanent tracking or network writes.
 */
export type DailyLevel = "A2" | "B1" | "B2" | "C1";
export type DailyVerbEntry = {
  id: string;
  verb: string;
  meaning: string;
  forms: Record<string, { word?: string; sv?: string; en?: string }>;
};
export type DailyPick = {
  entry: DailyVerbEntry;
  example: { word?: string; sv: string; en: string };
};

const LEVEL_OFFSETS: Record<DailyLevel, number> = { A2: 0, B1: 17, B2: 41, C1: 71 };
const FORM_KEYS = ["Pres", "Inf", "Pret", "Sup", "Imp"] as const;

/** The learner's local calendar date, not the UTC date of their device clock. */
export function localDateKey(now: Date): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ordinal(dayKey: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayKey)) throw new Error("Invalid daily date");
  const [year, month, day] = dayKey.split("-").map(Number);
  const value = Date.UTC(year, month - 1, day);
  const test = new Date(value);
  if (test.getUTCFullYear() !== year || test.getUTCMonth() + 1 !== month || test.getUTCDate() !== day) {
    throw new Error("Invalid daily calendar date");
  }
  return Math.floor(value / 86400000);
}

/**
 * Select up to three distinct verb+sense pairs with real bilingual examples.
 * Stable order is the existing level JSON/API order, not an invented AI ranking.
 * Each consecutive local day advances by three positions, so sets don't overlap
 * while six or more eligible entries exist.
 */
export function selectDailyVerbs(
  entries: DailyVerbEntry[],
  level: DailyLevel,
  dayKey: string,
  count = 3
): DailyPick[] {
  const day = ordinal(dayKey);
  const unique = new Set<string>();
  const eligible: DailyPick[] = [];
  for (const entry of entries) {
    if (!entry || typeof entry.verb !== "string" || typeof entry.meaning !== "string") continue;
    const identity = JSON.stringify([entry.verb, entry.meaning]);
    if (unique.has(identity)) continue;
    const example = FORM_KEYS
      .map((key) => entry.forms?.[key])
      .find((form) => form && typeof form.sv === "string" && form.sv.trim() &&
        typeof form.en === "string" && form.en.trim());
    if (!example) continue;
    unique.add(identity);
    eligible.push({ entry, example: { word: example.word, sv: example.sv!, en: example.en! } });
  }
  if (eligible.length === 0) return [];
  const wanted = Math.min(Math.max(0, Math.floor(count)), eligible.length);
  const first = (((day * 3 + LEVEL_OFFSETS[level]) % eligible.length) + eligible.length) % eligible.length;
  return Array.from({ length: wanted }, (_, i) => eligible[(first + i) % eligible.length]);
}
