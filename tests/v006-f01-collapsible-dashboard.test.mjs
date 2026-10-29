import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ui = readFileSync(new URL("../app/learning-dashboard.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

test("V-006-F01: Your Learning starts collapsed, with accessible click-to-toggle", () => {
  assert.match(ui, /const \[expanded, setExpanded\] = useState\(false\)/);
  assert.match(ui, /aria-expanded=\{expanded\}/);
  assert.match(ui, /aria-controls="saved-learning-panel"/);
  assert.match(ui, /onClick=\{\(\) => setExpanded\(\(value\) => !value\)\}/);
  assert.match(ui, /\{expanded \? "Hide your learning" : "Show your learning"\}/);
  assert.match(ui, /\{expanded && \(/);
});

test("V-006-F01: closed view still summarizes counts; open view retains saving, deletion and guest messaging", () => {
  assert.match(ui, /st\.favorites\.length/);
  assert.match(ui, /studiedTotal/);
  assert.match(ui, /st\.history\.length/);
  assert.match(ui, /progress is not saved permanently/);
  assert.match(ui, /Saved favorite verbs/);
  assert.match(ui, /Saved practice history/);
  assert.match(ui, /st\.toggleFavorite/);
  assert.match(ui, /st\.deleteHistory/);
  assert.match(ui, /st\.clearHistory/);
  assert.match(ui, /onSelect\(sense, level\)/);
});

test("V-006-F01: long lists scroll inside a bounded area on desktop and mobile", () => {
  assert.match(css, /\.saved-list\s*\{[^}]*max-height\s*:/s);
  assert.match(css, /\.saved-list\s*\{[^}]*overflow-y\s*:\s*auto/s);
  assert.match(css, /\.learning-dashboard-toggle/);
});
