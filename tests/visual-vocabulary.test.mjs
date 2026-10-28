import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync(
  new URL("../visual-content/pilot-action-photos.json", import.meta.url), "utf8"
));
const levels = ["A2", "B1", "B2", "C1"];

test("V-004-F02: precisely five manually curated photo-to-sense mappings", () => {
  assert.equal(catalog.entries.length, 5);
  const identities = catalog.entries.map((photo) => photo.verb + "\0" + photo.meaning);
  assert.equal(new Set(identities).size, identities.length);
  assert.deepEqual(new Set(catalog.entries.map((p) => p.verb)),
    new Set(["springa", "äta", "skriva", "läsa", "sticka"]));
  assert.ok(catalog.entries.every((p) => p.imageUrl.startsWith("https://images.unsplash.com/photo-")));
  assert.ok(catalog.entries.every((p) => p.sourceUrl.startsWith("https://unsplash.com/photos/")));
  assert.ok(catalog.entries.every((p) => p.photographer.trim() && p.alt.trim()));
  assert.ok(catalog.entries.every((p) => p.license === "Unsplash License" && p.licenseUrl === "https://unsplash.com/license"));
});

test("V-004-F02: matching is by verb plus meaning, not identical Swedish spelling", () => {
  const knit = catalog.entries.find((p) => p.verb === "sticka" && p.meaning === "knit");
  const leave = catalog.entries.find((p) => p.verb === "sticka" && p.meaning !== "knit");
  assert.ok(knit);
  assert.equal(leave, undefined, "the ambiguous other sticka meaning must NOT inherit knitting image");
});

test("V-004-F02: every curated sense exists exactly once across the four frozen level datasets", () => {
  for (const level of levels) {
    const rows = JSON.parse(readFileSync(
      new URL("../shared-content/verb-library/" + level + ".json", import.meta.url), "utf8"
    ));
    for (const photo of catalog.entries) {
      const found = rows.filter((r) => r.v === photo.verb && r.meaning === photo.meaning);
      assert.equal(found.length, 1, level + ": " + photo.verb + " / " + photo.meaning);
    }
  }
});
