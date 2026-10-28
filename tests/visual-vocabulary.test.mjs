import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync(
  new URL("../visual-content/pilot-action-photos.json", import.meta.url), "utf8"
));
const levels = ["A2", "B1", "B2", "C1"];

test("V-004-F03: 26 individually sourced photo-to-sense mappings remain unique", () => {
  assert.equal(catalog.entries.length, 26);
  const identities = catalog.entries.map((p) => p.verb + "\0" + p.meaning);
  assert.equal(new Set(identities).size, identities.length);
  const ids = catalog.entries.map((p) => new URL(p.imageUrl).pathname);
  assert.equal(new Set(ids).size, ids.length, "No photo is duplicated for an unrelated verb.");
  assert.ok(catalog.entries.every((p) => p.verb.trim() && p.meaning.trim()));
  assert.ok(catalog.entries.every((p) => p.imageUrl.startsWith("https://images.unsplash.com/photo-")));
  assert.ok(catalog.entries.every((p) => p.sourceUrl.startsWith("https://unsplash.com/photos/")));
  assert.ok(catalog.entries.every((p) => p.photographer.trim() && p.alt.trim() && p.description.trim()));
  assert.ok(catalog.entries.every((p) => p.photographerUrl.startsWith("https://unsplash.com/")));
  assert.ok(catalog.entries.every((p) => p.license === "Unsplash License" &&
    p.licenseUrl === "https://unsplash.com/license"));
});

test("V-004-F03: original five pilot senses remain available", () => {
  const initial = ["springa\0run", "äta\0eat", "skriva\0write",
    "läsa\0read; to study", "sticka\0knit"];
  const identities = new Set(catalog.entries.map((p) => p.verb + "\0" + p.meaning));
  for (const id of initial) assert.ok(identities.has(id), "Lost original pilot sense: " + id);
});

test("V-004-F03: match photos by verb and meaning; leave other sticka sense without a photo", () => {
  const knit = catalog.entries.find((p) => p.verb === "sticka" && p.meaning === "knit");
  const other = catalog.entries.find((p) => p.verb === "sticka" && p.meaning !== "knit");
  assert.ok(knit);
  assert.equal(other, undefined);
  assert.equal(catalog.entries.find((p) => p.verb === "kasta")?.meaning, "throw; to throw away");
});

test("V-004-F03: every curated identity is recorded exactly once at every CEFR level", () => {
  for (const level of levels) {
    const rows = JSON.parse(readFileSync(
      new URL("../shared-content/verb-library/" + level + ".json", import.meta.url), "utf8"
    ));
    assert.equal(rows.length, 456);
    for (const p of catalog.entries) {
      const matches = rows.filter((r) => r.v === p.verb && r.meaning === p.meaning);
      assert.equal(matches.length, 1, level + ": " + p.verb + " / " + p.meaning);
    }
  }
});
