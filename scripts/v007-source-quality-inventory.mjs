/**
 * Reproducible V-007 *structural* source inventory, not linguistic certification.
 * No writes. Source reference = level + original JSON array index (0-based).
 * Run with Node 22: node scripts/v007-source-quality-inventory.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { isAvailableFormWord } from "../lib/practice-engine.mjs";

export const LEVELS = ["A2", "B1", "B2", "C1"];
export const FORM_KEYS = ["Inf", "Imp", "Pres", "Pret", "Sup"];

export function inspectLevel(level, rows) {
  const counters = {
    totalSenseRecords: rows.length,
    missingFormSlots: 0,
    missingBilingualExamples: 0,
    oneSidedBilingualExamples: 0,
    formUnavailableButExampleProvided: 0,
    repeatedSpellings: 0,
    multiUseEnglishGlosses: 0
  };
  const flags = [];
  const byLemma = new Map();
  const flag = (index, row, formKey, issue) => flags.push({
    source: `shared-content/verb-library/${level}.json`,
    indexZeroBased: index,
    rowOneBased: index + 1,
    verb: row.v,
    meaning: row.meaning,
    formKey,
    issue
  });
  rows.forEach((row, index) => {
    if (!byLemma.has(row.v)) byLemma.set(row.v, []);
    byLemma.get(row.v).push({ index, meaning: row.meaning });
    if (/[;,]/.test(row.meaning)) {
      counters.multiUseEnglishGlosses++;
      flag(index, row, "", "MULTI_USE_GLOSS_REVIEW_CONTEXT");
    }
    for (const key of FORM_KEYS) {
      const f = row.forms?.[key];
      const available = isAvailableFormWord(f?.word);
      const sv = Boolean(f?.sv?.trim());
      const en = Boolean(f?.en?.trim());
      if (!available) {
        counters.missingFormSlots++;
        flag(index, row, key, "MISSING_FORM_OR_PLACEHOLDER");
        if (sv || en) {
          counters.formUnavailableButExampleProvided++;
          flag(index, row, key, "MISSING_FORM_WITH_EXAMPLE_REVIEW");
        }
      }
      if (!sv || !en) {
        counters.missingBilingualExamples++;
        flag(index, row, key, "MISSING_BILINGUAL_EXAMPLE");
        if (sv !== en) counters.oneSidedBilingualExamples++;
      }
    }
  });
  for (const [verb, senses] of byLemma) {
    if (new Set(senses.map((s) => s.meaning)).size > 1) {
      counters.repeatedSpellings++;
      for (const { index } of senses) flag(index, rows[index], "", "REPEATED_SPELLING_DISTINCT_SENSE");
    }
  }
  return { level, counters, flags };
}

export function inspectAll() {
  return LEVELS.map((level) => {
    const rows = JSON.parse(readFileSync(
      new URL(`../shared-content/verb-library/${level}.json`, import.meta.url), "utf8"
    ));
    return inspectLevel(level, rows);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const inventory = inspectAll();
  // Machine-readable report includes exact source JSON index and level.
  process.stdout.write(JSON.stringify({
    generatedFrom: "original frozen library",
    verification: "structural only; requires expert Swedish review",
    inventory
  }, null, 2) + "\n");
}
