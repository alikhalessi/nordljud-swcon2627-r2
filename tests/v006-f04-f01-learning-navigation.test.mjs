import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../app/learning-app.tsx", import.meta.url), "utf8");
const dashboard = readFileSync(new URL("../app/learning-dashboard.tsx", import.meta.url), "utf8");
const daily = readFileSync(new URL("../app/daily-lesson.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

test("F04-F01: exactly two primary areas; Explore directly contains word exploration", () => {
  const main = app.split('<div className="primary-study-tabs"')[1]?.split("</div>")[0] ?? "";
  assert.equal((main.match(/role="tab"/g) || []).length, 2);
  assert.match(app, /role="tablist" aria-label="Learning sections"/);
  assert.doesNotMatch(app, /role="tablist" aria-label="Explore modes"/);
  const explore = app.split('id="explore-panel"')[1]?.split('id="learning-panel"')[0] ?? "";
  assert.match(explore, /<VocabularyExplorer level=\{level\} target=\{target\}/);
  assert.doesNotMatch(explore, /<DailyLesson|className="lesson" aria-labelledby="lesson-heading"/);
});

test("F04-F01: Your Learning contains accessible default Today and My Progress subviews", () => {
  const learning = app.split('id="learning-panel"')[1] ?? "";
  assert.match(app, /type LearningAreaView = "daily" \| "progress"/);
  assert.match(app, /useState<LearningAreaView>\("daily"\)/);
  assert.match(learning, /role="tablist" aria-label="Your Learning views"/);
  assert.match(learning, /Today's Lesson/);
  assert.match(learning, /My Progress/);
  assert.match(learning, /id="learning-daily-panel"/);
  assert.match(learning, /id="learning-progress-panel"/);
  assert.match(learning, /hidden=\{learningView !== "daily"\}/);
  assert.match(learning, /hidden=\{learningView !== "progress"\}/);
  assert.match(app, /onLearningViewKeyDown/);
  assert.match(css, /\.learning-subpanel\[hidden\]/);
});

test("F04-F01: daily area is outside signed-in dashboard, with all original seeded lesson actions preserved", () => {
  const learning = app.split('id="learning-panel"')[1] ?? "";
  const todayPos = learning.indexOf("<DailyLesson");
  const originalPos = learning.indexOf('className="lesson" aria-labelledby="lesson-heading"');
  const dashboardPos = learning.indexOf("<LearningDashboard");
  assert.ok(todayPos >= 0 && originalPos > todayPos && dashboardPos > originalPos);
  assert.equal((app.match(/className="lesson" aria-labelledby="lesson-heading"/g) ?? []).length, 1);
  assert.match(learning, /<DailyLesson level=\{level\} onOpenVerb=\{returnToVerb\}/);
  assert.match(learning, /<LearningDashboard level=\{level\} onSelect=\{returnToVerb\}/);
  assert.match(app, /lesson\.choices\.map/);
  assert.match(app, /showTranslation/);
  assert.match(app, /playSwedish/);
  assert.match(app, /Try again/);
  assert.match(dashboard, /Guest Mode: you can study and practice freely/);
});

test("F04-F01: both level controls share state; exact sense handoff returns to Explore", () => {
  assert.match(app, /id="learning-level-select"/);
  assert.match(app, /value=\{level\}/);
  assert.match(app, /changeLevel\(event\.target\.value as Level\)/);
  assert.match(app, /updateGuestPreferences\(\{ level: next \}\)/);
  assert.match(app, /setTarget\(\{ \.\.\.sense, level: selectedLevel \}\)/);
  assert.match(app, /setActiveTab\("explore"\)/);
  assert.match(daily, /onOpenVerb\(\{/);
  assert.match(daily, /verb: entry\.verb, meaning: entry\.meaning/);
});

test("F04-F01: existing account features are preserved, no reminders/archive added", () => {
  for (const feature of ["Favorites", "Learning Progress", "Practice History"]) {
    assert.ok(dashboard.includes(feature));
  }
  assert.doesNotMatch(app, /Remind Me Later|Daily Archive|PushManager|requestPermission/);
});
