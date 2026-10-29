import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const app = readFileSync(new URL("../app/learning-app.tsx", import.meta.url), "utf8");
const ui = readFileSync(new URL("../app/learning-dashboard.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

// V-006-F01 accordion was superseded by the student-approved V-006-F02 two-tab redesign.
// These historical regression checks now focus on the original page-push defect.
test("V-006-F01 superseded: Your Learning no longer opens an accordion above the explorer", () => {
  assert.doesNotMatch(ui, /Show your learning|Hide your learning/);
  assert.match(app, /hidden=\{activeTab !== "learning"\}/);
  assert.match(app, /hidden=\{activeTab !== "explore"\}/);
});
test("V-006-F01 preserved: Saved verbs and history still have delete actions", () => {
  assert.match(ui, /st\.toggleFavorite/);
  assert.match(ui, /st\.toggleStudied/);
  assert.match(ui, /st\.deleteHistory/);
  assert.match(ui, /st\.clearHistory/);
  assert.match(ui, /progress is not saved permanently/);
});
test("V-006-F01 long-list regression: bounded client-side pages instead of unbounded content", () => {
  assert.match(ui, /const PAGE_SIZE = 10/);
  assert.match(ui, /\.slice\(offset, offset \+ PAGE_SIZE\)/);
  assert.match(css, /\.primary-study-panel\[hidden\] \{ display:none !important; \}/);
});
