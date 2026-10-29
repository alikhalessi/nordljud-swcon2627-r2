# Post-V-006-F04 user feedback — proposed Your Learning Hub, daily archive and repeated retrieval

**Date:** 2026-10-29 (Europe/Helsinki; exact current timestamp not claimed)
**Method:** Nordljud Round 2 / Condition A Vibe Coding
**Branch:** `condition/vibe`
**Status:** `USER_ORIGINAL FEEDBACK + AI_ANALYSIS / RECOMMENDATION ONLY / NO IMPLEMENTATION APPROVED`
**Coded event type:** `USER_FEEDBACK / MIXED_INFORMATION_ARCHITECTURE_CORRECTION_AND_FEATURE_REQUEST`
**Actual application baseline:** `aa86cb6d69e9a52a4668863132f7e93996491811`, F04 CI [40887257970](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887257970) 46/46 tests, typecheck/build pass. F04 student live-UX acceptance remains pending.
**F04 prior student-approved exact scope:** [F04 prompt](V-006-F04_AI_DRAFT_DAILY_MICROLESSONS_2026-10-29.md) and [student approval](V-006-F04_STUDENT_APPROVAL_2026-10-29.md).
**Provenance note:** This analysis and planning language was composed by ChatGPT. The quoted original below is the **actual student wording**, with informal language and potential voice-transcription artifacts preserved.

## A. Verbatim original student message

> ببین من فکر می‌کنم خوبه این Two Days Lesson Three Days Verb انتقال پیدا بکنه به Your Learning. به این خاطر که اینم جزو مجموعه‌ی Learningها هستش. به اضافه این‌که دوست دارم ما یک ریکورد هم برای Daily Verbsمون داشته باشیم، Three Daily Verbs. یعنی این‌که یک آرشیو اونها هم باشه که بعد بشه بهش مراجعه کرد. به اضافه این‌که شاید خوب باشه ما آخر هر هفته و آخر هر دو هفته یه امتحان از اون verbهایی که یادگرفته نشده یا گفته هنوز من می‌خوام یاد بگیرم داشته باشیم. ما غیر از Favorite، یک دکمه‌ی دیگه به نام Remind Me Later هم تو این قسمت باید داشته باشیم که به ما یادآوری بکنه، تو قسمت Your Learning، که به ما یادآوری بکنه یک verb رو ما ترجیح می‌دیم دو مرتبه تکرار کنیم. نظرت چه در این رابطه؟

**Assistant translation/interpretation (not an original user quote):** The student proposes moving Today's Lesson with three daily verbs into Your Learning instead of Explore, preserving accessible past daily verb sets in an archive, adding optional 7-day and 14-day recall/review quizzes for verbs the user has not learned or explicitly wants to revisit, and adding a separate "Remind Me Later" action beyond Favorites to create a learner-controlled review queue.

## B. Observed source baseline vs user desire — do not invent functionality

Current `app/learning-app.tsx` contains two primary areas, Explore Your Words and Your Learning. F04 added nested Verb Explorer / Today's Lesson inside Explore. The original fixed Mini Lesson and quiz were moved into Today's Lesson, not Your Learning.

Current `app/daily-lesson.tsx` and `lib/daily-lessons.ts` generate a deterministic three-sense daily set from frozen source by local date+CEFR level. **There is no per-user archive record of viewed or completed lessons**. Past deterministic sets could be recomputed from unchanged source, but that is a **calendar catalog** and must never be falsely presented as "lessons this user completed." A personal encounter/learning record requires user-scoped persistence or an explicitly constrained local design.

Current `app/learning-dashboard.tsx` has Favorites, Learning Progress (manually marked studied) and the latest 100 Practice History records. Its guest branch currently shows only a guest information notice, and its saved-data subviews are for signed-in users. Moving Today's Lesson inside this branch without moving it outside the signed-in gate would accidentally prevent guest access; this must be explicitly protected.

Current `app/learning-state.tsx` accesses three user-scoped Supabase tables for favorites, studied and practice history. It has **no separate reminder queue**, due dates, review outcome or mastered semantic state. "Studied" should not be equated with "learned/remembered".

## C. Assistant architectural recommendation, NOT approved

**Concept:** Two main destinations: Explore Your Words = self-directed discovery; Your Learning = the learner's daily/home/review experience. Proposed *four grouped destinations* inside Your Learning:
1. **Today**: three daily verb-sense cards and the original fixed Mini Lesson/quiz. Must work as Guest and authenticated user.
2. **My Review**: explicit Remind Me Later queue; due reviews; optional weekly (7-day) and fortnightly (14-day) recall quizzes. Empty/unavailable cases are transparent.
3. **Daily Archive**: by date and CEFR level, previous daily sets; distinguish deterministic daily calendar catalog from truly studied/completed personal records.
4. **My Progress**: reuse existing Favorites, Studied and Practice History rather than rewriting or removing account data.

**Information architecture caution:** Avoid seven top-level tabs or confusing nesting; keep the two original main areas and use a compact overview/home with grouped subviews.

**Favorite ≠ Remind Me Later:** Favorites indicate interest or importance; reminder marks an intention to review later. The same entry may appear in both, neither, or one. Review list uses stable `user_id + level + verb + exact meaning` (no collision for both `sticka` senses). User can remove/snooze review; no implicit tagging of every viewed word.

**Learning state nuance:** Unseen, Seen, Studied, Needs Review and Demonstrated Recall are different states. Self-reported "I know it" and quiz-correct results should not be silently collapsed into a scientifically validated "Mastered" label. Wrong quiz responses are natural candidates for optional repeat; no automatic punitive score.

**Archive nuances:** Compute previous date/level sets from unchanged content (cheap neutral catalog) and optionally separately log "actually opened/studied" authenticated events. Never label a generated day as a completed day. Changes to frozen data/algorithm would invalidate historical regeneration unless versioned; preserve source and algorithm version, local date/timezone and exact sense IDs.

**Review timing:** Choose rolling seven-/fourteen-day windows based on recorded user encounters/due state rather than mandatory Sunday and month midpoint; make practice on-demand to avoid coercive push/notifications. Suggest short 5–10-question reviews with feedback and action to study the exact sense in Explorer. No assumption that three daily words are new for every learner. Learning research supports spaced practice and active retrieval (Dunlosky et al., 2013; retrieval practice review https://doi.org/10.1146/annurev-psych-010419-051019; Anki docs https://docs.ankiweb.net/deck-options.html), but this particular Nordljud scheduling system's efficacy is not yet experimentally established.

**Safety and access:** Existing F08 Guest Mode must remain functional. Daily lessons and date-based public archive should be available to guests; saved multi-device review queues and personal encounter records may require authenticated user + new per-user tables with verified RLS, or an explicitly approved browser-only fallback. Guest queues are **not currently implemented**. Avoid silently adding authentication requirements. Never write secret keys or cross-user data. Local date/timezone changes and repeated level-specific senses need explicit tests.

**Swedish question validity:** Before relying on new 7/14-day quizzes for consequential labeling, address original V-007 ambiguity for homographic polysemy `sticka` and missing-form placeholders; keep quiz generation source-grounded, with context that identifies one meaning.

## D. Recommended small staged plan (assistant opinion, not permission)

**Stage 1, small UI placement correction:** If student wishes immediate corrected F04 acceptance, draft **V-006-F04-F01**: move Today's Lesson and its fixed Mini Lesson under Your Learning with all users (including Guest) permitted, preserve existing saved data and original Explore; no archive/review database in this corrective prompt. Requires exact student approval before implementation.

**Stage 2, linguistic validity:** Continue **V-007** (sense-specific exercise questions, missing form playback and other scoped content-quality issues), so new weekly and 14-day recall is not based on known ambiguous prompts.

**Stage 3, real expanded Learning Hub:** Reuse **V-008** as planned for the **Daily Archive, explicit Remind Me Later review queue, account-scoped saved encounter/review records, and optional 7-day/14-day review quiz**; treat those as new late scope, with updated planned acceptance/requirements and separate student approval. Avoid adding another ad hoc version/iteration if possible. Create accountable saved-state and RLS design only when approved. Preserve user choice (reminder buttons are in-app, no push required).

**Android/PWA push:** Remains a separate future opt-in stage. The "Remind Me Later" action is in-app queue, not a promise of a timed phone notification.

**Alternative:** If the student explicitly prefers a full unified Learning Hub now, a new approved scope and iteration could be planned, but this is wider than F04 and may delay V-007. Do not silently implement all of this as a patch to the previously approved F04 prompt.

## E. Experimental and reporting significance

- The student has provided new authentic usability feedback **after** a passing F04 CI run (46/46). CI success does not demonstrate user satisfaction with information architecture.
- New archive and reminder/retrieval features are **user-generated scope expansions**; categorize separately from the **placement correction** and from ordinary bugs.
- Log this as another "construct → evaluate → corrective idea → proposed new construction" event, but **no subsequent code fix or browser verification has yet been observed**.
- The pre-registered F01–F15 common benchmark remains untouched. Any late accepted cross-method feature criteria must be separately documented, with ordering/learning bias disclosed. Round 2 is Vibe vs SDD; historical pilot three methods Vibe / God Mode / SDD is separate.
- The student's exact words are preserved; this note is a human-in-the-loop decision-support proposal. **It is not an approved implementation prompt.**

## F. Current authorization

The user asked for an assessment/opinion, not to run the code. No part of this document authorizes source/database/deployment changes, or a change to independent SDD. Await an explicit new student-approved exact prompt before any implementation.
