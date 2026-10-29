import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../app/learning-app.tsx", import.meta.url), "utf8");
const explorer = readFileSync(new URL("../app/vocabulary-explorer.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const guest = readFileSync(new URL("../lib/guest-preferences.ts", import.meta.url), "utf8");

function contrast(a, b) {
  const lum = (hex) => {
    const c = hex.replace("#", "").match(/.{2}/g).map(v => parseInt(v, 16) / 255);
    const [r, g, bl] = c.map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
function cssRuleColor(selector) {
  const pattern = new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + String.raw`\s*\{[^}]*?color\s*:\s*(#[0-9a-fA-F]{6})`, "s");
  const found = css.match(pattern);
  assert.ok(found, `Missing color rule for ${selector}`);
  return found[1];
}

test("F03 UX01: selected word outside visible search results is clearly explained and recoverable", () => {
  assert.match(explorer, /selectionOutsideResults/);
  assert.match(explorer, /matching\.some\(\(item\) => item\.id === selectedId\)/);
  assert.match(explorer, /selected word is outside your current results/i);
  assert.match(explorer, /Clear filters/);
  assert.match(explorer, /setQuery\(""\)/);
  assert.match(explorer, /setPhotosOnly\(false\)/);
  assert.match(explorer, /setFavoritesOnly\(false\)/);
});

test("F03 UX05: vocabulary errors offer direct same-level retry, with abort-aware fetch", () => {
  assert.match(explorer, /const \[retryToken, setRetryToken\]/);
  assert.match(explorer, /setRetryToken\(\(value\) => value \+ 1\)/);
  assert.match(explorer, /Retry loading/);
  assert.match(explorer, /\[level, retryToken\]/);
  assert.match(explorer, /new AbortController\(\)/);
});

test("F03 F08: guest preferences persist only a constrained, browser-local selection", () => {
  assert.match(guest, /localStorage/);
  assert.match(guest, /readGuestPreferences/);
  assert.match(guest, /updateGuestPreferences/);
  assert.match(guest, /"A2"|"B1"|"B2"|"C1"/);
  assert.match(guest, /"learn"|"practice"/);
  assert.match(guest, /export type GuestPreferences = \{\s*level: GuestLevel;\s*verb: string;\s*meaning: string;\s*mode: GuestStudyMode;\s*\}/);
  assert.match(app, /readGuestPreferences\(\)/);
  assert.match(app, /updateGuestPreferences\(\{ level: next \}\)/);
  assert.match(explorer, /readGuestPreferences\(\)/);
  assert.match(explorer, /updateGuestPreferences\(/);
  assert.match(explorer, /verb: chosen\.verb/);
  assert.match(explorer, /meaning: chosen\.meaning/);
});

test("F03 UX04: independent fixed mini lesson is labeled rather than redesigned", () => {
  assert.match(app, /SEPARATE MINI LESSON/);
  assert.match(app, /separate from the three rotating daily verbs above/i);
  assert.match(app, /<VocabularyExplorer level=\{level\} target=\{target\}/);
});

test("F03 UX03: reviewed small-text color pairs reach WCAG normal-text AA ratio", () => {
  const pairs = [
    ["footer", "#f8faf8"],
    [".detail-footnote", "#ffffff"],
    [".vocabulary-explanation", "#ffffff"],
    [".visual-credits", "#ffffff"]
  ];
  for (const [selector, background] of pairs) {
    const fg = cssRuleColor(selector);
    assert.ok(contrast(fg, background) >= 4.5, `${selector} ratio is ${contrast(fg, background).toFixed(2)}; expected at least 4.5`);
  }
});
