import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { FORM_KEYS, LEVELS } from "../../src/domain/contracts";
import { loadLexicon, parseLevel } from "../../src/data/lexicon";
import { SOURCE_BLOBS, SOURCE_MANIFEST_ID } from "../../src/data/source-manifest";

describe("frozen source adapter contract", () => {
  for (const level of LEVELS) it(`retains exact ${level} data and all distinct sense identities`, () => {
    const path = `shared-content/verb-library/${level}.json`;
    const rawBytes = readFileSync(resolve(process.cwd(), path));
    const normalized = Buffer.from(rawBytes.toString("utf8").replace(/\r\n/g, "\n"));
    const blob = createHash("sha1").update(`blob ${normalized.length}\0`).update(normalized).digest("hex");
    expect(blob).toBe(SOURCE_BLOBS[path]);
    const original = JSON.parse(rawBytes.toString("utf8"));
    const collection = loadLexicon(level);
    expect(collection.level).toBe(level);
    expect(collection.sourceManifestId).toBe(SOURCE_MANIFEST_ID);
    expect(collection.sourceBlob).toBe(blob);
    expect(collection.records).toHaveLength(456);
    expect(new Set(collection.records.map(r => r.v)).size).toBe(455);
    expect(new Set(collection.records.map(r => r.id)).size).toBe(456);
    collection.records.forEach((record, ordinal) => {
      expect(record.id).toBe(`${level}:${String(ordinal).padStart(4, "0")}`);
      expect(record.senseId).toBe(record.id);
      for (const key of ["v", "meaning", "frequency", "page"] as const) expect(record[key]).toBe(original[ordinal][key]);
      for (const key of FORM_KEYS) expect(record.forms[key]).toEqual(original[ordinal].forms[key]);
    });
    expect(collection.records.filter(r => r.v === "sticka").map(r => r.meaning)).toEqual(["knit", "sting, prick; to leave (colloquial)"]);
    expect(loadLexicon(level)).toBe(collection);
  });
  it("accepts only exact approved level values", () => {
    for (const level of LEVELS) expect(parseLevel(level)).toBe(level);
    for (const value of [null, undefined, "A1", "a2", "A2 ", ["A2"], 2]) expect(parseLevel(value)).toBeNull();
  });
});
