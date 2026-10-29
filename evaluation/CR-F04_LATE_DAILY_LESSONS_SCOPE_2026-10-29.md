# CR-F04 — later-approved daily micro-lessons and mobile-notification backlog

**Date:** 2026-10-29 (Europe/Helsinki)
**Classification:** LATE STUDENT-APPROVED PRODUCT SCOPE EXPANSION / navigation correction
**Study:** Nordljud Round 2 (Condition A Vibe, Condition B independent Spec Kit SDD)
**Original benchmark:** [Original independent F01–F15 matrix](ACCEPTANCE_MATRIX.md) was fixed before the Vibe implementation.
**Approval:** [Exact student approval committed before F04 coding](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/V-006-F04_STUDENT_APPROVAL_2026-10-29.md)
**Actual assistant-drafted and student-approved wording:** [V-006-F04 prompt](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/V-006-F04_AI_DRAFT_DAILY_MICROLESSONS_2026-10-29.md)
**Authentic student Persian feedback, not originally an English specification:** Recorded verbatim in the F04 prompt provenance file; earlier Mini Lesson UX dissatisfaction in [UX04 feedback](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/V-006_F03_UX04_STUDENT_FEEDBACK_AND_DESIGN_OPTIONS_2026-10-29.md).

## Why this log was added without rewriting baseline acceptance

The user identified that the original static Mini Lesson was stranded beneath the long verb Explorer, then suggested a daily return experience with two or three Swedish verbs and later daily reminders on Android. The assistant recommended maintaining the two top-level learning/history destinations while adding a self-directed Verb Explorer and a guided Today's Lesson within Explore. The student **explicitly approved** the exact V-006-F04 prompt for Vibe Coding after the independent matrix was frozen.

This is a **mixed** correction-plus-addition iteration, *not* merely defect repair and *not* an originally fixed condition-neutral pre-implementation requirement. It must be disclosed as a late change in comparative research, including effects on attention, number of prompts, rework and SDD requirements.

## Neutral expected experience, if future common assessment includes the late feature

The following **outcomes** can be evaluated for both conditions independently; they are not instructions to reuse Vibe code:

1. A learner can reach self-directed word exploration and a guided Today's Lesson without an account.
2. The current A2/B1/B2/C1 selection applies consistently to both, and the original fixed mission/quiz remains accessible for all levels.
3. The daily area presents up to three distinct verb+sense entries with authentic Swedish examples and English translations from the unchanged frozen library; for the full provided library, the expected count is three.
4. The selection is deterministic for a local calendar date and level across refresh/reopen; a different local date rotates the set without immediate repeated senses when sufficient entries exist.
5. Each daily entry opens its exact meaning in the full explorer for existing study/practice. Two separate `sticka` meanings cannot be conflated.
6. Daily cards do not claim individualized novelty, mastery or teacher-certified quality.
7. No notification permission, scheduled pushes, PWA/native packaging, extra cloud data or new scoring is required for this iteration.
8. Mobile and keyboard behavior must be assessed using real interaction evidence when possible.

**Scope/fairness caution:** Do not append these to the pre-registered acceptance score as though they existed from day zero. Report baseline F01–F15 separately; if assessing F04 features, use a transparent post-registration supplemental comparison, explicitly noting informed design, order and intervention bias.

## Deferred Android/PWA reminders — roadmap only

The student also proposed daily reminders on Android at a chosen time suggesting the day's two to three verbs. Future options may include an installable PWA with opt-in Web Push, or a native Android wrapper/application. Both require separate planning and approval; exact-time notification delivery is not guaranteed, and user consent, time zones, unsubscribe, delivery service and privacy/storage must be designed and tested.

**NOT AUTHORIZED FOR F04:** PWA, Push API, permission popups, server scheduler, Firebase Cloud Messaging, native packaging, Android application, notifications or background jobs. No related code or app settings were changed by this shared note.

## Preserve study separation

- Historical pilot compares three development methods (Vibe, God Mode, SDD) in `alikhalessi/nordljud-software-construction`.
- Current Round 2 compares exactly two independent methods (Vibe and Spec Kit-based SDD) with separate code.
- This main-branch note serves research provenance and neutrally expresses outcomes; SDD must not be handed the Vibe JSX/TS helpers, test implementation or code structure as templates.
- Original frozen teaching dataset and benchmark remain unchanged. Student must later accept the actual F04 experience; CI alone is not browser or usability validation.
