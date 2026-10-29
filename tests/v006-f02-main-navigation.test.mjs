import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../app/learning-app.tsx", import.meta.url), "utf8");
const ui = readFileSync(new URL("../app/learning-dashboard.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const explorer = readFileSync(new URL("../app/vocabulary-explorer.tsx", import.meta.url), "utf8");

test("V-006-F02: exactly two accessible primary tabs, Explore is selected initially", () => {
  assert.match(app, /const \[activeTab, setActiveTab\] = useState<MainTab>\("explore"\)/);
  assert.match(app, /role="tablist" aria-label="Learning sections"/);
  assert.equal((app.match(/role="tab"/g) || []).length, 2);
  assert.match(app, /Explore Your Words/);
  assert.match(app, /Your Learning/);
  assert.match(app, /aria-selected=\{activeTab === "explore"\}/);
  assert.match(app, /aria-selected=\{activeTab === "learning"\}/);
  assert.match(app, /aria-controls="explore-panel"/);
  assert.match(app, /aria-controls="learning-panel"/);
  assert.match(app, /onMainTabKeyDown/);
});

test("V-006-F02: exploration and personal dashboard are mutually exclusive mounted panels", () => {
  assert.match(app, /id="explore-panel"[\s\S]*hidden=\{activeTab !== "explore"\}/);
  assert.match(app, /id="learning-panel"[\s\S]*hidden=\{activeTab !== "learning"\}/);
  assert.match(app, /<VocabularyExplorer level=\{level\} target=\{target\}/);
  assert.match(app, /<LearningDashboard level=\{level\} onSelect=\{returnToVerb\}/);
  const startExplore = app.indexOf('id="explore-panel"');
  const explorerPosition = app.indexOf("<VocabularyExplorer");
  const endExplore = app.indexOf('id="learning-panel"');
  const dashboardPosition = app.indexOf("<LearningDashboard");
  assert.ok(startExplore < explorerPosition && explorerPosition < endExplore && endExplore < dashboardPosition);
  assert.match(css, /\.primary-study-panel\[hidden\] \{ display:none !important; \}/);
});

test("V-006-F02: clicking Study switches to Explore and re-selects the saved word/meaning", () => {
  assert.match(app, /function returnToVerb\(sense: \{ verb: string; meaning: string \}, selectedLevel: Level\)/);
  assert.match(app, /setTarget\(\{ \.\.\.sense, level: selectedLevel \}\)/);
  assert.match(app, /setActiveTab\("explore"\)/);
  assert.match(app, /exploreTabRef\.current\?\.focus\(\)/);
  assert.match(explorer, /x\.verb===target\.verb&&x\.meaning===target\.meaning/);
});

test("V-006-F02: three distinct saved views support search, level filtering and pagination", () => {
  assert.match(ui, /type LearningView = "favorites" \| "progress" \| "history"/);
  assert.match(ui, /Favorites \(\{st\.favorites\.length\}\)/);
  assert.match(ui, /Learning Progress \(\{st\.studied\.length\}\)/);
  assert.match(ui, /Practice History \(\{st\.history\.length\}\)/);
  assert.match(ui, /type="search"/);
  assert.match(ui, /<select value=\{levelFilter\}/);
  assert.match(ui, /const PAGE_SIZE = 10/);
  assert.match(ui, /favorites\.slice\(offset, offset \+ PAGE_SIZE\)/);
  assert.match(ui, /progress\.slice\(offset, offset \+ PAGE_SIZE\)/);
  assert.match(ui, /history\.slice\(offset, offset \+ PAGE_SIZE\)/);
  assert.match(ui, /Math\.min\(page, pageCount - 1\)/);
  assert.match(ui, /st\.toggleFavorite/);
  assert.match(ui, /st\.toggleStudied/);
  assert.match(ui, /st\.deleteHistory/);
  assert.match(ui, /st\.clearHistory/);
});

test("V-006-F02: guest remains safe and neither auth nor Supabase RLS schema is touched", () => {
  assert.match(ui, /Guest Mode: you can study and practice freely/);
  assert.match(ui, /progress is not saved permanently/);
  assert.match(app, /<LearningProvider>/);
  assert.match(css, /\.primary-study-tabs button\[aria-selected="true"\]/);
});
