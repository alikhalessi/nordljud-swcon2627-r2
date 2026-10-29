# V-007 — Language and Exercise Quality — exact AI-drafted prompt awaiting student approval

**Date:** 2026-10-29 (Europe/Helsinki; no invented precise timestamp)
**Condition:** Nordljud SWCON2627 Round 2 / Vibe Coding / `condition/vibe`
**Status:** `AI_DRAFT — STUDENT APPROVAL PENDING — V-007 NOT EXECUTED`
**Author/provenance:** ChatGPT drafted the English wording in response to the user's request to prepare V-007, **after** the user explicitly accepted V-006-F04-F01. This English wording is not an original student English coding prompt and is not approved merely because the student requested a proposal.
**Original current-turn student message (verbatim):**

> I have reviewed the V-006-F04-F01 app and accept the new navigation. Record my user acceptance in GitHub and prepare the V-007 proposal for my review; do not start V-007 coding before my approval.

**Student acceptance recorded FIRST:** [V-006-F04-F01 exact acceptance](V-006-F04-F01_STUDENT_ACCEPTANCE_2026-10-29.md), commit `84e0b2f3daaadbc8f528c1611934cd289e1d6574`.
**Pre-V-007 latest tested application code:** `f5e7bf653f966c6b8a53537b55740b7ef026beaf`, [CI 40890668799](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40890668799): 51/51 tests, typecheck/build pass. All subsequent commits through the acceptance commit were evidence-only; no V-007 source changes were made at drafting.
**Source findings:** [UX-REVIEW-01 audit](UX-REVIEW-01_BASELINE_AUDIT_2026-10-29.md) and [finding CSV](UX-REVIEW-01_FINDINGS.csv), UX06 (polysemy context) and UX07 (unavailable-form speech affordances).
**Current code reviewed:** `lib/practice-engine.mjs`, `app/practice-panel.tsx`, `app/vocabulary-explorer.tsx`, `app/level-comparison.tsx`, `app/page.tsx`, `tests/practice-mode.test.mjs`, `tests/vocabulary-explorer.test.mjs`, and real A2/B1 source samples. `sticka` occurs twice at each level, with separate source English meanings (one is a multi-usage gloss). `—` explicitly appears in original `Imp.word` fields. These are source observations, not manual linguistic certification.
**Protocol:** [Prompt approval protocol](../docs/PROMPT_APPROVAL_PROTOCOL.md): exact student approval must be committed before running any coding instruction.

## Exact proposed prompt — for the student's review and explicit approval

Please carry out V-007 — Language and Exercise Quality — on our current Nordljud Round 2 Vibe Coding app, after the accepted V-006-F04-F01 navigation update.

I want the Swedish learning experience to be reliable, especially when a verb has more than one meaning or a conjugation form is missing. Please correct the exercise and display logic without redesigning the app or changing our original Swedish dataset.

First, fix the confusing meaning questions. The same Swedish spelling can refer to different meanings, as with the two entries for "sticka". A question that only asks which English meaning matches "sticka" is unfair without context. Use an authentic Swedish example from the selected verb-and-meaning entry to make the question specific, without giving away the English answer before the learner chooses. If an example still does not support one defensible answer, skip that meaning question and keep any other reliable practice questions. Keep the two senses and their learning history separate. Be careful when one source entry itself lists multiple English uses, such as "sting, prick; to leave (colloquial)": do not pretend every example expresses all those meanings at once.

Second, treat missing or placeholder conjugations, including the literal em dash "—", as unavailable—not as a real Swedish word. Do not offer Listen buttons for such placeholders, speak them, or use them as correct answers or distractors in practice. Show a clear unavailable-form label while preserving the original five-form layout. Apply the same principle to level comparison and exercise generation where relevant.

Third, review the generated meaning, verb-form and fill-in-the-blank exercises for source consistency across A2, B1, B2 and C1. Questions must have one defensible correct answer, use only actual source examples and forms, give clear feedback, and not award points when the learner reveals an answer after a mistake. Where reliable content is unavailable, explain that a question cannot be offered rather than inventing a Swedish sentence, translation or grammatical claim. Keep the original fixed Mini Lessons and their quizzes functional.

Run a reproducible source-quality inventory across the four levels. Record missing forms, missing bilingual examples, repeated spellings with different senses, and any suspected grammar or translation problems with exact source references. Flag uncertain linguistic issues for a qualified Swedish-language reviewer; do not claim that automated checks or AI judgments certify Swedish correctness.

Preserve all 456 distinct verb-sense entries at each level, both meanings of "sticka", Today's three daily verbs, existing pronunciation, Favorites, Guest Mode, personal progress and current navigation. Do not rewrite the frozen shared-content files or the common acceptance matrix. Do not add Daily Archive, Remind Me Later, seven-day or fourteen-day review exams, Android notifications, database changes, or anything from V-008 or V-009. Do not touch the independent SDD implementation.

Before changing any application code, save my exact approval of this prompt and the baseline commit in GitHub. Add focused regression tests for ambiguous meanings, unavailable forms, source-grounded questions, answer reveal/scoring, all four levels and existing navigation. Preserve genuine RED and GREEN CI outcomes, TypeScript and build results, changed commits and research notes. Only report browser, mobile, keyboard or speech checks as passed if they were actually tested.

At the end, show me the issues fixed, the cases deferred for expert review, the verified results and any blockers. Record everything in GitHub and ask for my acceptance before proceeding to V-008.

## Planning rationale and guardrails (not part of the proposed coding prompt)

1. **UX06 source-confirmed:** The current question template in `lib/practice-engine.mjs` literally asks `Which English meaning matches "sticka"?` while both `knit` and `sting, prick; to leave (colloquial)` exist as independent senses. Context from an exact Swedish source example is the first recommended remedy; *when context still cannot disambiguate a polysemous gloss, skip or reframe the question rather than rewarding a misleading one*. Do not reveal English answer in the question body. The verb spelling itself is not enough to identify sense.
2. **UX07 source-confirmed:** Original data contains missing-form sentinels such as literal `—` and empty bilingual text. `app/vocabulary-explorer.tsx` tests `form?.word?.trim()`, allowing `—` into speech; `lib/practice-engine.mjs` also trims placeholder `word` without a missing-value guard. Applies to related comparison displays and exercises. Keep legitimate five-slot layout and accurate source data.
3. **Scope of quality review:** Automated inventory of all four 456-sense levels can identify structurally suspicious cases; it cannot prove grammar, CEFR alignment, regional usage or idiomatic accuracy. Record unresolved examples with source keys for expert review; never invent updated Swedish or edit the frozen content.
4. **Original tests:** Existing `tests/practice-mode.test.mjs` asserts 2+ questions/entry and checks the two `sticka` meanings; changes to question generation must preserve meaningful coverage or explicitly justify any source-dependent skips and adjust tests **without concealing a regression**. Preserve correct/incorrect and reveal-no-credit semantics.
5. **Future roadmap:** V-008 includes user-requested Daily Archive, Remind Me Later, durable review list and optional 7-/14-day checks; V-009 includes broader UX/mobile/accessibility. Neither is pre-authorized for implementation by this draft.
6. **Fair methods:** The historical original experiment had three approaches (Vibe, God Mode, SDD), current Round 2 has two independent implementations (Vibe, Spec Kit SDD). This is a user-visible, late clarification of exercises in Vibe; preserve authentic history and do not propagate Vibe source code to SDD. Shared outcome expectations may be documented neutrally with transparent chronology; do not rewrite the frozen F01–F15 matrix.
7. **No coding authorization from acceptance of F04-F01:** The user approved only preparing V-007 for review. There is **NO** approved V-007 implementation prompt, no V-007 app edit and no execution. Wait for exact student approval, record it before code, then execute the approved prompt and collect real CI evidence.
