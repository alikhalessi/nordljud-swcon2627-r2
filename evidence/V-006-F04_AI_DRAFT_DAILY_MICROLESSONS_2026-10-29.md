# V-006-F04 — Daily Micro-Lessons + Explorer Navigation — AI draft (NOT APPROVED)

**Date:** 2026-10-29 (Europe/Helsinki; exact time not asserted)
**Project:** Nordljud Round 2, Software Construction SWCON2627
**Condition:** A / Vibe Coding
**Branch:** `condition/vibe`
**Pre-draft branch HEAD inspected:** `fa07ba9a859a5528c6a4c99d69f5859fa8a7ffae`
**Status:** `AI_DRAFT — STUDENT APPROVAL PENDING — NOT EXECUTED`
**Provenance:** The following English development prompt and assessment are drafted by ChatGPT in response to the student's original Persian feature proposal. The user has **not** yet approved this prompt or authorized code.
**Current iteration:** V-006-F03 implemented with 41 tests passing but live browser and student acceptance still pending. [User-reported Mini Lesson placement issue](V-006_F03_UX04_STUDENT_FEEDBACK_AND_DESIGN_OPTIONS_2026-10-29.md) recorded before the new proposal.

## Student's exact original message (verbatim)

> ببین من فکر می‌کنم این فکر خوبیه. به اضافه این‌که ما باید یک سیستم بچه‌ها ایجاد بکنیم که روزانه در واقع این چیزهای کوچیک رو ارائه بده، این آموزش‌های کوچیک رو ارائه بده، که وقتی که یوزر برمی‌گرده و از این می‌خواد استفاده بکنه، این رو بتونه هر روز ببینه که یک فله جدید بهش یاد داده شده و بتونه اون رو انتقال بده. حتی می‌تونه دو تا یا سه تا فله جدید باشه. به اضافه این‌که چیز دیگه‌ای که به نظرم رسید، این رو می‌تونیم اگر به نسخه اندرویدی، به‌اصطلاح گوشی، این رو تبدیلش بکنیم، این رو به صورت نوتیفیکیشن هر روز توی ساعت مشخصی این دو تا سه تا چیز رو بهش آفر بدیم، این دو مورد رو بهش آفر بدیم. لطفاً خودت چک کن و نظر خودت رو بگو، بعد اگر نیاز داشتش اون iterationی که باید اجرا بشه رو بنویس که بعد من بخوام قبول کنم یا رد کنم. ممنونم.

The phrase(s) around daily lessons and verbs are preserved exactly as supplied, including potential voice transcription artifacts. **Do not silently rewrite this as a precise implementation specification authored by the student.** No claim is made the student specifically requested a fixed three-card limit or selected a particular technical architecture.

## Why this proposal is a distinct mixed iteration

- Previous student feedback: the original static Mini Lesson is misplaced at the bottom of a long verb explorer, even after F03 added explanatory labeling.
- New student idea: learner returns daily for 2–3 new small verb lessons; potential future Android daily scheduled notifications.
- The assistant proposes to combine navigation correction with **one bounded daily-lesson feature iteration**, `V-006-F04`, before V-007. This is **MIXED UX correction + FEATURE CONSTRUCTION**, not a pure defect fix or evidence the new feature was pre-approved in the charter.
- The proposed daily-lesson feature is additional scope after the original independent acceptance matrix was frozen. Record its provenance and do **not** silently revise the common baseline. An appropriately neutral common expected outcome, if the student later approves one, must be applicable to both Vibe and independent SDD; never feed the Vibe implementation code to SDD.
- Original two top-level tabs remain: Explore Your Words and Your Learning. Within Explore, two subviews: Verb Explorer and Today's Lesson. Preserve the original seeded fixed mission inside Today's Lesson to protect original F01–F04 behavior.
- Future Android/PWA and notification scheduling is a **roadmap concept**, not a feature approved for this iteration. Native Android is not a prerequisite for Web Push; opt-in, service workers, server-side delivery and time-zone issues would need separate explicit approval and testing.
- Evidence-based educational background: distributed practice and retrieval practice are useful learning strategies, but delivering three new words each day alone does not establish mastery improvements or a personalized spaced repetition system.

## Exact assistant-proposed prompt for student approval

Please implement one bounded Nordljud Round 2 Vibe Coding iteration, V-006-F04 — Daily Micro-Lessons and Explorer Navigation, before we return to V-007.

I want Nordljud to give learners a small reason to come back each day. Keep our two existing main sections, Explore Your Words and Your Learning. Inside Explore Your Words, add two accessible subviews: Verb Explorer and Today's Lesson. Keep the level selector shared between them. Move the existing fixed Mini Lesson and its original quiz out of the bottom of the Explorer into Today's Lesson; preserve all four original level-specific missions, translations, audio, feedback and quiz behavior. Label the fixed example clearly so it is not confused with the new daily words.

Today's Lesson should show three distinct Swedish verb-and-meaning entries per day for the selected A2, B1, B2 or C1 level, using only our existing frozen verb dataset. Use a transparent, reproducible selection rule based on the learner's local calendar date and level. Today's words should stay the same when the learner refreshes or reopens the app on the same day, rotate on the next local day, and avoid immediately repeating a daily set where enough eligible words exist. Handle missing source examples safely rather than inventing linguistic material.

For each daily verb, show the Swedish word, exact English meaning, an available Swedish example with translation, pronunciation where supported, and an action to open that exact verb and meaning in Verb Explorer. Keep the two meanings of sticka separate. Use the existing study and practice components instead of creating a second, competing learning engine. Make the subviews clear and usable on desktop, mobile and keyboard.

Do not introduce a new account requirement, automatic AI-generated lessons, new scoring or streak systems, database migrations, new cloud progress tables, or any change to the frozen Swedish dataset. Preserve the existing Guest Mode, Favorites, Learning Progress, Practice History and authentication boundaries. This daily selection is not yet a personalized mastery recommendation, so do not claim all three words are new to a particular learner.

Android packaging, PWA installation, push notifications and user-selected reminder times are a separate future feature. Do not implement any notification permission request, subscription or background scheduler in this iteration. Record that future idea clearly in the backlog.

Before coding, save my exact approval of this prompt and the current baseline in GitHub. Record my original feedback and distinguish the UX correction from the new daily-learning feature for the final research report. Add focused tests for stable same-day selection, next-day rotation, all four levels, distinct word senses, the original mini-lesson and quiz, navigation and guest behavior. Preserve RED and GREEN CI runs, TypeScript/build outcomes, actual commits, and any manual browser-test limitations. Do not touch the independent SDD implementation or silently change the shared acceptance matrix; document this late feature request so that the later comparison remains honest.

When finished, summarize what really changed and what has been verified, and ask for my acceptance before starting V-007.

## Proposed verification scenarios (interpretive planning, NOT part of approved prompt)

- A2/B1/B2/C1 and day 1 vs day 2 each produce valid, reproducible per-level daily sense selections from the existing dataset; refresh remains stable on one local day.
- Same written verb with different meanings remains distinguishable (e.g. sticka), without duplicate exact senses in one set.
- Missing examples are skipped or honestly displayed; no generated Swedish/English claims.
- Original four seed missions and quiz remain discoverable and functionally unchanged inside Today's Lesson.
- Navigation and Focus/keyboard support both top-level tabs and secondary views; guest sees the same daily set, with no cloud auth requirement.
- No scheduled notifications are sent, no permission prompts appear, and there are no migrations or changes to shared-content.
- Browser/mobile testing remains NOT TESTED or BLOCKED unless authentic screenshots and interactions exist.

## Technical feasibility checks consulted (not proof of product execution)

- MDN PWA/Push: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation
- MDN Notifications user permission: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
- Google Android Trusted Web Activities: https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities
- Chrome Notification Triggers (experimental/not broadly launched): https://developer.chrome.com/docs/web-platform/notification-triggers
- Dunlosky et al. 2013 educational practice review: https://doi.org/10.1177/1529100612453266

## Absolute approval boundary

**This document is ONLY an AI draft and an evidence record.** It is not student approval. No V-006-F04 code, runtime, testing, content, deployment, DB, SDD or notification action is claimed or authorized. Wait for the student's explicit review/approval of the exact English prompt and commit that approval **before** implementing. If student requests changes, replace draft only through a transparent versioned revision with original version retained. Keep this feature's late-addition provenance for final 3-method historical and Round-2 2-method reporting.
