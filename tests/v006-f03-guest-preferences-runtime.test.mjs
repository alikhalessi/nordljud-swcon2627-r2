import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Functional smoke tests: transpile the real TypeScript helper and run it
// against a controlled browser-localStorage stub (no account or network).
const src = readFileSync(new URL("../lib/guest-preferences.ts", import.meta.url), "utf8");
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
const key = "nordljud-r2-guest-selection-v1";

function harness() {
  const saved = new Map();
  const localStorage = {
    getItem(k) { return saved.get(k) ?? null; },
    setItem(k, v) { saved.set(k, v); }
  };
  const runtime = { exports: {}, window: { localStorage } };
  runInNewContext(js, runtime);
  return { ...runtime.exports, saved, localStorage };
}

test("F03 browser-only prefs store and restore exact level + homograph sense + mode", () => {
  const h = harness();
  assert.equal(h.readGuestPreferences(), null);
  h.updateGuestPreferences({ level: "B2", verb: "sticka", meaning: "knit", mode: "practice" });
  assert.deepEqual(JSON.parse(JSON.stringify(h.readGuestPreferences())), {
    level: "B2", verb: "sticka", meaning: "knit", mode: "practice"
  });
  h.updateGuestPreferences({ verb: "sticka", meaning: "sting, prick; to leave (colloquial)" });
  assert.equal(h.readGuestPreferences().meaning, "sting, prick; to leave (colloquial)");
  assert.equal(h.readGuestPreferences().mode, "practice");
  assert.deepEqual(Object.keys(JSON.parse(h.saved.get(key))).sort(), ["level", "meaning", "mode", "verb"]);
});

test("F03 browser-only prefs reject invalid stored data without breaking guest learning", () => {
  const h = harness();
  h.saved.set(key, "{not-json");
  assert.equal(h.readGuestPreferences(), null);
  h.updateGuestPreferences({ level: "C1" });
  assert.equal(h.readGuestPreferences().level, "C1");
  h.saved.set(key, JSON.stringify({ level: "X", verb: "a", meaning: "b", mode: "learn" }));
  assert.equal(h.readGuestPreferences(), null);
  h.saved.set(key, JSON.stringify({ level: "B1", verb: "a", meaning: "b", mode: "wrong" }));
  assert.equal(h.readGuestPreferences(), null);
});

test("F03 disabled localStorage fails closed without stopping the study journey", () => {
  const h = harness();
  h.localStorage.getItem = () => { throw new Error("storage unavailable"); };
  h.localStorage.setItem = () => { throw new Error("storage unavailable"); };
  assert.equal(h.readGuestPreferences(), null);
  assert.doesNotThrow(() => h.updateGuestPreferences({ level: "B1" }));
});
