import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FORM_KEYS, LEVELS } from "../domain/contracts";
import type { Level, LexiconCollection, RawSense, SenseRecord, SourceForm } from "../domain/contracts";
import { formAvailability } from "../domain/availability";
import { SOURCE_BLOBS, SOURCE_MANIFEST_ID } from "./source-manifest";

const collections = new Map<Level, LexiconCollection>();

export function parseLevel(value: unknown): Level | null {
  return typeof value === "string" && LEVELS.includes(value as Level) ? value as Level : null;
}

/** Node/server boundary. Only approved whitelist paths can be read. */
export function readFrozenJson<T>(relativePath: string): T {
  const expected = SOURCE_BLOBS[relativePath];
  if (!expected) throw new RangeError("Unapproved source path");
  const raw = readFileSync(resolve(process.cwd(), "shared-content", relativePath.slice("shared-content/".length)));
  // Checkout CRLF is qualified only in memory; no working file is normalized.
  const bytes = Buffer.from(raw.toString("utf8").replace(/\r\n/g, "\n"));
  const blob = createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
  if (blob !== expected) throw new Error(`Frozen source identity mismatch: ${relativePath}`);
  return JSON.parse(raw.toString("utf8")) as T;
}

export function adaptLexicon(level: Level, raw: RawSense[]): LexiconCollection {
  if (!parseLevel(level)) throw new RangeError("Unsupported learning level");
  if (!Array.isArray(raw) || raw.length !== 456) throw new Error("Expected exactly 456 frozen source senses");
  const records = raw.map((record, ordinal): SenseRecord => {
    if (!record || typeof record.v !== "string" || typeof record.meaning !== "string" || typeof record.frequency !== "string" || typeof record.page !== "number") throw new Error("Unexpected frozen sense shape");
    const forms = Object.fromEntries(FORM_KEYS.map(key => {
      const form = record.forms?.[key];
      if (!form || typeof form.word !== "string" || typeof form.sv !== "string" || typeof form.en !== "string") throw new Error("Unexpected frozen form shape");
      return [key, Object.freeze({ ...form })];
    })) as Record<(typeof FORM_KEYS)[number], SourceForm>;
    const availability = Object.fromEntries(FORM_KEYS.map(key => [key, Object.freeze(formAvailability(forms[key]))])) as SenseRecord["availability"];
    const id = `${level}:${String(ordinal).padStart(4, "0")}`;
    return Object.freeze({ ...record, forms: Object.freeze(forms), id, senseId: id, level, ordinal, availability: Object.freeze(availability) });
  });
  if (new Set(records.map(r => r.v)).size !== 455 || new Set(records.map(r => JSON.stringify([r.v,r.meaning]))).size !== 456) throw new Error("Unexpected frozen spelling or sense identities");
  Object.freeze(records);
  return Object.freeze({ level, sourceManifestId: SOURCE_MANIFEST_ID, sourceBlob: SOURCE_BLOBS[`shared-content/verb-library/${level}.json`], records });
}

export function loadLexicon(level: Level): LexiconCollection {
  if (!parseLevel(level)) throw new RangeError("Unsupported learning level");
  let collection = collections.get(level);
  if (!collection) {
    collection = adaptLexicon(level, readFrozenJson<RawSense[]>(`shared-content/verb-library/${level}.json`));
    collections.set(level, collection);
  }
  return collection;
}
export const getLexicon = loadLexicon;
