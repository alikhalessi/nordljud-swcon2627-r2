# V-007 — Language and Exercise Quality: Implementation, CI and source-quality evidence

**Recorded date:** 2026-10-29 (Europe/Helsinki; exact GitHub commit timestamps are authoritative)
**Course/project:** Åbo Akademi SWCON2627 / Nordljud Round 2
**Condition:** A / Vibe Coding, branch `condition/vibe`
**Status:** `IMPLEMENTED / AUTOMATED CHECKS PASSED / STUDENT ACCEPTANCE PENDING`
**Original accepted predecessor:** [Exact student acceptance of V-006-F04-F01](V-006-F04-F01_STUDENT_ACCEPTANCE_2026-10-29.md) commit `84e0b2f3daaadbc8f528c1611934cd289e1d6574`.
**Original exact AI-written V-007 prompt:** [AI_DRAFT](V-007_AI_DRAFT_LANGUAGE_AND_EXERCISE_QUALITY_2026-10-29.md) commit `172510c74f8e1f6541ea4a47702e00a2e1267485`.
**Explicit student approval committed BEFORE code:** [Verbatim V-007 approval](V-007_STUDENT_APPROVAL_2026-10-29.md) commit `7e1eed57fb32eb3168d1e507779d2921ce5465be`. The student read the Persian translation in ChatGPT; only the exact English approved prompt is stored as the official implementation instruction in GitHub.
**Pre-V-007 tested application baseline:** `f5e7bf653f966c6b8a53537b55740b7ef026beaf` — [51/51 green](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40890668799).
**Last focused code and test commits:** `29d4cef847458cfc9e7b960edf4c45ac92d226dc` (56/56 green CI), `c9bebb048fffef1464049b7636cb2eda2e05d11d` (inventory CLI bug fix), `7e71f78a1e1d299e1a3718d00b76612c2d2c79c8` (adds two inventory tests; latest targeted run [40894383384](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894383384)). Actual workflow outcome for last run should be checked before citing it as complete.

## 1. Why this iteration was necessary

The earlier [UX-REVIEW-01 findings](UX-REVIEW-01_FINDINGS.csv) distinguished two deferred content/usability issues:

- **UX06, P1:** `lib/practice-engine.mjs` asked “Which English meaning matches sticka?” without context, despite two different verb-and-meaning entries with exactly the same Swedish spelling. Merely labeling one answer as correct is not a defensible sense-specific question.
- **UX07, P2:** `app/vocabulary-explorer.tsx` interpreted source literal em dash `—` as a nonempty form and offered “Listen to form”; `lib/practice-engine.mjs` likewise considered such placeholders available answer/distractor tokens.

The student **explicitly approved** exactly the V-007 English draft *before coding*. The source JSON data itself and prior Guest/Today's Lesson/Progress flows were frozen/protected. The task was to correct the *presentation and question generation*, not to manufacture alternative Swedish conjugations, change CEFR labels, or certify translations.

## 2. Actual implementation with bounded file changes

| Changed file | Actual work |
|---|---|
| `tests/v007-language-quality.test.mjs` (new, first) | Source-bound regression tests committed **before** fixes: unavailable sentinels, direct pronunciation UI guards, separate authentic Swedish contexts for both `sticka` senses, one correct option, all 4×456 level records, source-reconstructible cloze and no-credit answer reveal, unchanged navigation. |
| `lib/practice-engine.mjs` | Exported `isAvailableFormWord` (rejects blanks, `—`, `–`, `−`, bare dashes and editorial N/A-type labels); uses it to filter unique conjugations and cloze/form quiz options. A meaning question now requires a bilingual **source-authored Swedish sentence from the selected exact entry** containing a corresponding complete verb form. The matching English source translation appears **only in post-answer explanation**, not in the question. Without suitable context, omit rather than fabricate. For multi-use English glosses, explanation transparently states the example illustrates **one use**, not every use. Same-lemma alternative senses are prioritized into the distractors, so the other `sticka` meaning is actually visible. |
| `lib/practice-engine.d.mts` | Declared common word-validity helper for TypeScript consumer code. |
| `app/vocabulary-explorer.tsx` | Shows “Form not available” for missing source forms; uses shared helper to suppress form playback controls. Preserves all five form slots and the independent example sentence audio when a real Swedish sentence is present. |
| `app/level-comparison.tsx` | Shows “Form not available” instead of raw `—` or blank in the four-level comparison. Source sentences remain unchanged; no placeholder word audio is added. |
| `tests/practice-mode.test.mjs` | Corrected an **invalid historical two-questions-per-verb assumption**. E.g. `A2/böra` has only `bör` and `borde` as valid conjugations; the old quiz had treated `—` as a third form. Now require a contextual source-backed meaning question, plus an additional reliable exercise when there are at least three distinct available forms. No test deletion or false claim of unchanged question quantity. |
| `scripts/v007-source-quality-inventory.mjs` (new) | Reproducible read-only all-level source inventory: missing form slots, missing Swedish/English examples, mismatched empty examples, unavailable form with a populated bilingual example, repeated spelling/sense, multi-use English glosses needing caution. Emits exact `level / original zero-based array index / human one-based row / verb / meaning / form key / issue`; makes no source or DB writes. |
| `tests/v007-source-inventory.test.mjs` (new) | Two source-structured tests assert counts and locate exactly four source anomalies where a form word is empty but its bilingual sentence exists. |
| `evidence/V-007_SOURCE_QUALITY_FLAGS_2026-10-29.csv` | Machine-readable audit of **all 1,118 generated flags** with original row references (some rows have multiple flags; these are NOT 1,118 proven language errors). |

**Preserved unchanged:** all four `shared-content/verb-library/*.json` source files (456 entries each), `shared-content/mission-seeds.json`, `app/learning-app.tsx` navigation and fixed mini-lesson, `app/daily-lesson.tsx`, `app/learning-dashboard.tsx`, `app/learning-state.tsx`, Supabase tables/RLS/auth, the independent SDD branch and original `evaluation/ACCEPTANCE_MATRIX.md`. No Daily Archive, Remind Me Later, seven-/fourteen-day quizzes or Android push was implemented.

## 3. Source-quality inventory (structural counts, not Swedish linguistic certification)

| CEFR | Sense records | Unavailable form slots | Missing bilingual example pairs | One-sided translation | Unavailable form but existing bilingual sentence | Entries with comma/semicolon English gloss | Distinct repeated spellings |
|---|---:|---:|---:|---:|---:|---:|---:|
| A2 | 456 | 36 | 36 | 0 | 0 | 212 | 1 |
| B1 | 456 | 32 | 29 | 0 | 3 | 212 | 1 |
| B2 | 456 | 31 | 31 | 0 | 0 | 212 | 1 |
| C1 | 456 | 32 | 31 | 0 | 1 | 212 | 1 |
| **Total** | **1,824** | **131** | **127** | **0** | **4** | **848 flagged gloss occurrences** | **4 level-wise repeated-spelling categories** |

**Interpretation:**
- Most missing examples correspond to truly unavailable source conjugations. **Never fill them with AI-created guesses**.
- A comma/semicolon in a source English meaning is **NOT an error** by itself. The 848 occurrences are review prompts about context, polysemy and possible synonym labeling, not grammatical errors. The inventory flags repeated spellings to preserve different senses (the two `sticka` records, in each of four levels).
- Entries with an unavailable form field but a fully populated sentence **require qualified human review**, not a silent content edit. Exact source references (row numbers counted from 1, zero-based indices in CSV):
  - `B1.json` row **84**, `demonstrera` / “demonstrate, show; to protest” / `Pret.word=""`, Swedish example: “Tusentals människor demonstrerade för klimatet i helgen.”
  - `B1.json` row **87**, `dokumentera` / “document, record” / `Pret.word=""`, example: “Fotografen dokumenterade livet i förorten.”
  - `B1.json` row **230**, `koncentrera` / “concentrate” / `Pret.word=""`, example: “Vi koncentrerade oss på de viktigaste frågorna.”
  - `C1.json` row **87**, `dokumentera` / “document, record” / `Pret.word=""`, example begins: “Fotografen dokumenterade under fyra decennier livet i de nordliga glesbygderna...”
- Examples of conventional unavailable-form slots: `A2.json` row **6**, `ankomma` / Imperative `—`; `A2.json` row **74**, `böra` / multiple unavailable forms. The original word fields remain unchanged.
- **No expert Swedish review was conducted**, so this cannot establish which of the source sentences are idiomatic, accurate translations, grammatically correct or appropriately CEFR-aligned. Nor do multiple-choice uniqueness tests guarantee all distractors are semantically inequivalent. Any uncertain cases are REVIEW_PENDING and should be reviewed by a qualified Swedish-language expert. Source-quality output is a triage inventory, not a corrected dictionary.

**Reproducibility:** `scripts/v007-source-quality-inventory.mjs` computes the same structural flags directly from the frozen original four JSON arrays without writes. The generated `evidence/V-007_SOURCE_QUALITY_FLAGS_2026-10-29.csv` lists exact source references. `tests/v007-source-inventory.test.mjs` asserts aggregate counts and the four discrepant rows. Test output in GitHub Actions is additional evidence.

## 4. Full RED → GREEN chronology (real GitHub CI outcomes)

| Run | Status / interpretation |
|---|---|
| [40893483110](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40893483110) | APPROVAL-ONLY baseline CI SUCCESS; code not yet changed. |
| [40893657755](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40893657755) | RED after test-first commit `8a8dc5fde` before app/engine fixes; old source could not satisfy new conditions. |
| [40893774796](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40893774796) | RED after initial `93fb14216` implementation; **assistant-authored JavaScript regex escape syntax mistake** in N/A placeholder guard. This mistake is preserved, not hidden. |
| [40893841072](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40893841072) | RED after regex syntax repaired; test failures exposed valid `böra` has too few forms, a source-inspection UI guard was not yet added, and random option selection could omit other `sticka` meaning. |
| [40893913504](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40893913504) and [40894095747](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894095747) | Intermediate RED runs during UI changes and stabilization. Historic test incorrectly expected ≥2 practice questions even when third "word" was a literal em dash. |
| [40894130171](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894130171) | Intermediate RED while updating old exercise-count assumption. |
| [40894139234](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894139234) | First **GREEN: 56/56 tests, TypeScript PASS, production build PASS** after revised context/placeholder tests. |
| [40894208610](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894208610) and [40894351366](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894351366) | GREEN after reproducible inventory script and portable CLI fix (before two inventory tests). |
| [40894383384](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894383384) | Added **two inventory tests** to 56 previous checks. Check actual completed CI status before asserting a final 58/58 green run. |
| [40894542411](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894542411) | Latest evidence-only CSV commit; CI may be running and should be reported from the observed conclusion rather than inferred. |

**Method integrity:** Failed CI runs include both true pre-fix defects and a ChatGPT-authored regex error, plus regression-tests properly revised after removal of a formerly invalid question. Do not claim all RED events are intrinsic to Vibe Coding, or that failing tests are product defects without root-cause analysis.

## 5. External testing, deployment and known limitations

- Source/data test success is **not** browser E2E. The current tool's browser connector explicitly returned `Browser access requires the originating browser context`. Hence real desktop/mobile/screen-reader/keyboard/touch, Swedish text-to-speech, Google sign-in, private data isolation and cross-tab Guest refresh have **NOT** been independently tested this turn; no screenshot was obtained or fabricated.
- No expert bilingual/linguistic proof, school-grade language quality certification, or CEFR audit was performed.
- Potential residual ambiguity: the exact-source English meaning may combine several uses (e.g. `sticka` "sting, prick; to leave (colloquial)"). A contextual Swedish sentence supports one usage; source gloss may list multiple uses. Prompt/feedback now explicitly discloses this, and such records are flagged for qualified Swedish reviewer.
- New helper rejects unavailable placeholders but does not retroactively fill unavailable forms. A form field may be blank while a Swedish sentence example is present in original source (four cases): these source inconsistencies are retained and flagged.
- Current GitHub/Vercel deployment status must be checked against the **actual final code/test SHA** and cannot be inferred solely from GitHub Actions. Real on-page acceptance remains pending.
- No additional storage, new study state, Android reminders, archive/review features or SDD code touched.

## 6. Proposed student acceptance checklist (genuine browser check still required)

1. In Guest or signed-in Explore, choose A2 then `sticka — knit` and switch to Practice: verify the meaning question includes a Swedish knit-related example. Switch to the other `sticka` sense and verify a **different Swedish sentence** and the alternative sense as a selectable distractor.
2. At A2 `böra`, confirm unavailable forms display **Form not available**, with no "Listen to Form" for em dash. Still try valid-source meaning practice; only source-defensible exercises should appear.
3. Check A2, B1, B2, C1 across several verbs: fill-in-the-blank comes from original Swedish text and a correct answer restores the exact sentence, no placeholder choices, revealed answer after a mistake does not grant credit.
4. Compare levels for entries with unavailable conjugations: show meaningful missing label and original Swedish example where available; don't claim a missing conjugation exists.
5. Check `Your Learning → Today's Lesson`, including three daily picks and original fixed Mini Lesson/quiz; confirm saved Favorites and progress still work as before and Guest users are not blocked.
6. Note browser, device, version/commit, actual results and screenshots **only if really obtained**; report ambiguous language issues separately as needing fluent/qualified human review.

**Approval boundary:** Implementation and automated verification are complete once latest CI is independently confirmed. The student must explicitly accept V-007 before any V-008 design/code; the V-008 Daily Archive/Remind Me Later/weekly-fortnightly revision roadmap remains separate.
