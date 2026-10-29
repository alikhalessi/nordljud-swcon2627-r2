# V-006-F04-F01 — move Today's Lesson into Your Learning

**Recorded date:** 2026-10-29 (Europe/Helsinki, precise timestamp not claimed)
**Project:** Nordljud Round 2, SWCON2627
**Condition / branch:** Vibe Coding / `condition/vibe`
**Status:** `AI_DRAFT — NOT STUDENT-APPROVED — NO CODE EXECUTED`
**Document authored by:** ChatGPT using the student's original Persian feedback, previously selected phased plan, and repository code review. The English prompt is AI-authored, **not verbatim student English**.
**Before-draft branch HEAD observed:** `31ed1430bf4eb38d243313840eb9f2fd8c4e1b6e`
**Prior code baseline:** `aa86cb6d69e9a52a4668863132f7e93996491811` (F04: 46/46 CI, TypeScript/build PASS; live browser / student UX acceptance not established).
**Prior authentic user-origin feedback:** [Full verbatim Persian feedback, scope analysis and staged proposal](V-006_F04_POST_IMPLEMENTATION_STUDENT_FEEDBACK_LEARNING_HUB_2026-10-29.md).
**Earlier user-prompt/approval protocol:** `docs/PROMPT_APPROVAL_PROTOCOL.md`.

## The student's latest agreement — exactly as written

> موافقم لطفاً ادامه بده.

**Scope of this agreement:** Proceed with **preparing the exact F04-F01 prompt for review**, consistent with the prior assistant offer. This message **does not** approve the specific coding prompt written below, which the student has not yet seen.

## Exact proposed prompt — to be approved unchanged or revised first

Please implement one small, focused follow-up correction, V-006-F04-F01, on our Nordljud Round 2 Vibe Coding branch before we move to V-007.

After reviewing V-006-F04, I want Today's Lesson to belong in Your Learning rather than Explore Your Words. This is a user-feedback-driven navigation correction, not permission to build the larger Learning Hub yet.

Keep the two existing main sections: Explore Your Words and Your Learning. Make Explore Your Words the direct home of our existing Verb Explorer; remove the now-unnecessary Explore sub-tabs. Inside Your Learning, provide two clear, accessible secondary views: Today's Lesson (the default) and My Progress. Move the existing three daily Swedish verb cards and the original fixed Mini Lesson with its complete quiz into Today's Lesson. Do not duplicate the lesson or change the approved deterministic daily selection, source examples, meaning identity, speech or quiz behavior.

Today's Lesson must be available to Guest Mode users without sign-in. Do not place it behind the authenticated-only dashboard. My Progress must preserve the existing Favorites, Learning Progress and Practice History features and their current account security and Guest Mode behavior. Keep the selected A2/B1/B2/C1 level shared across Explore and Your Learning. Since the original level selector is inside Explore, provide a small, clearly labeled level selector in Your Learning that controls the same level state, with no conflicting independent selections.

When someone clicks Explore this verb from a daily card, take them to Explore Your Words and select the exact level, Swedish verb and English meaning, including the two distinct sticka senses. Preserve the user's study context when switching main or secondary views. The original fixed Mini Lesson must remain discoverable below the daily cards, with its existing translation reveal, Swedish audio, answers, feedback and retry.

Keep the interface consistent with our current design. Make secondary navigation accessible with appropriate names, selected states, keyboard focus and arrow/Home/End keys where using tabs, and make it usable on a narrow mobile screen.

Do not implement Daily Archive, Remind Me Later, user-specific review storage, 7-day or 14-day tests, or any new mastery/progress model in this correction. Those belong to the separately approved future V-008 planning stage, after V-007 language and exercise quality. Do not implement Android/PWA notifications. Do not modify the frozen Swedish datasets, shared acceptance matrix, Supabase tables, RLS, authentication configuration, unrelated features or independent SDD code.

Before any code changes, save my exact approval of this prompt in GitHub and identify the current baseline commit. Add or adjust focused regression tests for two main sections, secondary navigation, Guest Mode access, the shared level, all four original fixed lessons, exact-sense handoff and existing saved-learning views. Preserve genuine RED and GREEN CI runs, typecheck/build results, changes, limitations and any authentic browser screenshots. Do not mark mobile or keyboard flows PASS unless they were actually tested in a browser.

Finish with a concise before/after record in GitHub showing that this was a student-requested correction after F04's initial 46/46 green CI run. Clearly distinguish this correction from the proposed new Archive, Reminder and periodic-test features. Ask for my acceptance before proceeding to V-007.

## Why this design was chosen (assistant's analysis; not an approved change)

The original Explore tab has a full word-searching experience, while the desired daily lesson is now viewed by the student as part of a personal learning journey. F04 introduced nested Verb Explorer / Today's Lesson tabs inside Explore, but after F04's successful automated CI, the student requested moving the daily lesson to Your Learning and proposed an archive, reminder queue and weekly/fortnightly tests.

A conservative correction separates **today's learning activity** from **private saved data**: Today's Lesson under Your Learning is accessible to guests; My Progress retains the existing authenticated dashboard, without modifying its permissions. The proposed linked level selectors use one shared state, since the current A2–C1 controls only exist inside Explore. The existing separate fixed Mini Lesson and quiz must move *with* Today's Lesson; nothing is cloned or reauthored.

It is **not** appropriate to implement the archive or periodic tests as a 'minor F04 bug fix': they add requirements and user-specific storage design. These remain for V-008, after V-007 language quality checks. Android notifications are still deferred.

## Research-method classification

- **Trigger:** Direct student follow-up UX evaluation after F04 implementation and successful 46-test CI.
- **Proposed event:** `FIXATION / NAVIGATION_INFORMATION_ARCHITECTURE`; no new Daily Archive, Remind Me Later or review engine.
- **Important observed fact:** Passing automated tests did not settle the student's preferred content organization.
- **Negative/limiting evidence:** F04 live browser acceptance was not independently verified in the assistant environment. Avoid claiming this change fixes an observed browser failure; it addresses the student's reported mental-model concern.
- **Experiment integrity:** Historical original pilot has three development approaches (Vibe, God Mode, SDD). Round 2 has two independent conditions (Vibe, Spec Kit SDD). This new user-driven correction belongs to Vibe's revision history; it must be recorded as an intervention and not silently applied as SDD code or treated as a preregistered acceptance criterion.

## Approval boundary and next action

**The document and proposed prompt alone authorize no application work.** After the student reviews the complete exact wording, require explicit approval of this version. Commit exact original approval separately **before** implementation, keep RED/GREEN CI and evidence; then return the final result for student acceptance. No files outside evidence were changed by creating this draft.
