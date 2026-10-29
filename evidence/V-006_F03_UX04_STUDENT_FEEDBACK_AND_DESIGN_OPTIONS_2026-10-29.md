# V-006-F03 UX04 — student feedback on misplaced Mini Lesson; possible focused follow-up

**Date:** 2026-10-29 (Helsinki; no exact time asserted)
**Project/method:** Nordljud Round 2, A — Vibe Coding
**Branch:** `condition/vibe`
**Status:** `USER_ORIGINAL FEEDBACK RECORDED / AI UX RECOMMENDATION / DESIGN AND CODE NOT APPROVED OR IMPLEMENTED`
**Current code snapshot of F03:** `473c7c60ed468c3634acb886b3b275dbc1b93d5a`, CI 41/41 pass ([run 40883820378](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883820378)). Browser acceptance of F03 remains pending.

## Student's exact Persian feedback (verbatim, not translated)

> ببین این مینی لسنی که در پایان صفحه اومده، به نظرت آیا نباید انتقال پیدا بکنه به همین پوشه‌های Explorer، Your Words و ساب‌پوشهی Your Learning؟ می‌تونه یک ساب‌پوشه باشه کنار Your Learning یا یک قسمت اضافه باشه تو خود Your Learning؟ نمی‌دونم. چون اونجا به نظر من خیلی بی‌معنی است. نظر تو چیه؟ شاید تو نظر حتی بهتری داشته باشی، می‌تونی کریتیو باشی در این مورد.

## Why this matters

The student reports an information-architecture problem with the independent fixed mini-lesson appearing after the entire vocabulary explorer. F03's previously approved solution only **labeled** the lesson as separate; this live-user feedback indicates that labeling may not address the placement problem. **Do not claim this is browser-reproduced by the assistant**; it is an authentic student-reported UX concern and a reason to review UX04.

## Existing structure, according to reviewed source

- Primary tabs: `Explore Your Words` and `Your Learning` (V-006-F02).
- Explore panel contains CEFR level choice, `VocabularyExplorer` (selected verb's Learning and Practice Modes, comparison), and after it a **fixed mini-lesson** based on one seed per CEFR level.
- `Your Learning` is an account-oriented saved-learning dashboard: Favorites, Learning Progress, Practice History, with Guest Mode limitation.
- A mini-lesson is **new learning content**, not personal saved progress, so moving it *inside Your Learning* would mix distinct concepts and likely confront guest users with an account-oriented destination.

## Design options considered (assistant-generated, not student-approved)

**A — RECOMMENDED, bounded:** Retain exactly the two top-level tabs. Inside `Explore Your Words`, add two clearly labeled secondary destinations such as **Verb Explorer** and **Quick Lesson**. The current fixed mini-lesson, quiz and selected CEFR level move into `Quick Lesson`; the 456-sense list, selected-verb Learning/Practice Mode and level comparison remain in `Verb Explorer`. Both use the same CEFR level selector. Existing `Your Learning` remains reserved for personal saved records. Clarify "Quick Lesson" is one curated/fixed example per level, not the currently selected verb. The UI should preserve its existing selected verb, level, quiz state where reasonable, main-tab accessibility and keyboard focus. Move rather than duplicate/expand. Default to Verb Explorer to maintain the current workflow. No third primary navigation tab or data modification.

**B — alternate:** Add a third top-level `Quick Lesson` tab alongside Explore and Your Learning. Semantically clear and easy to discover, but currently over-promotes a small one-sentence/one-question fixed seed to the same navigation weight as the main library/dashboard; it changes the approved two-tab UX and requires broader regression testing. Consider only if guided lessons grow into a substantial learning module.

**C — not recommended:** Insert Mini Lesson as a fourth subview inside `Your Learning`. Mixes guest-accessible instructional content with account-specific personal saved-state dashboard and makes discovery dependent on the wrong category.

## Why A is favored

- Clear information architecture: **Explore = learn new things (guided or self-directed)**; **Your Learning = retain and review personal history**.
- Addresses student-reported misplaced content, not just labels it.
- Keeps the approved two primary destinations and minimizes redesign; reuses existing fixed lesson instead of inventing additional curriculum.
- Preserves independent Round 2 Vibe and SDD implementations and existing accepted data/requirement constraints.
- No claim that moving the content alone guarantees better UX; user/browser acceptance still required.

## Scope and approval gate

**This is feedback and a recommendation, not approval to implement.** The student asked for the assistant's opinion/creativity, not an immediate code change. A relocation with nested navigation is broader than F03's exact previously approved wording (which authorized labeling or deferral), so implementation requires **new exact student-reviewed and approved corrective prompt**, recorded before code. Possible label: `V-006-F03-F01` (small acceptance-feedback correction), with clear provenance and its own RED/GREEN results. Do not retroactively claim the original F03 prompt covered this change or say F03 was fully user-accepted.

When approved: constrain implementation to placement and accessible nested tab interaction; keep existing learning logic, selected word/sense, fixed seed, saved records, SDD branch, shared frozen corpus and cloud backend unchanged. Test main tabs, nested tabs, four levels, original fixed quiz, focus/keyboard, guest access and mobile behavior where accessible.

## Research interpretation (assistant-authored, not an empirical final conclusion)

This is an authentic additional human-evaluation checkpoint: after constructing a guided lesson, F03 clarified its independent meaning, but the student continued to question whether its **placement** matched the learner's mental model. It exemplifies the student's proposed *Construct → Evaluate → Fixation → Revalidate* cycle and cautions against treating a green CI build as evidence of satisfactory information architecture. Log the correction as `USER_FEEDBACK / UX_NAVIGATION`, not a language-quality defect or already-tested browser failure.

**Next state:** Await the student's selection and exact approval of a new prompt before any implementation. F03 remains in an acceptance-feedback state; V-007 not started.
