# V-006-F03 — Focused Stabilization — exact AI-drafted prompt (approval pending)

**Date recorded:** 2026-10-29 (Europe/Helsinki; exact submission time not asserted)
**Experiment:** Nordljud Round 2 / Software Construction SWCON2627
**Branch:** `condition/vibe`
**Status:** `AI_DRAFT — STUDENT APPROVAL REQUIRED — NOT EXECUTED`
**Provenance:** ChatGPT generated the English prompt below based on the student's selected **Option A** and subsequent explicit request to offer the prompt for review. This is **NOT** an original student-authored English prompt or approval.
**Source rationale:** [Student's exact Persian input and full decision rationale](V-006-F03_FOCUSED_STABILIZATION_DECISION_AND_RESEARCH_RATIONALE_2026-10-29.md).
**Issue source:** [UX-REVIEW-01 audit](UX-REVIEW-01_BASELINE_AUDIT_2026-10-29.md), [findings CSV](UX-REVIEW-01_FINDINGS.csv).
**Protocol:** [Student approval protocol](../docs/PROMPT_APPROVAL_PROTOCOL.md).

## Exact proposed prompt — review and approve unchanged or request edits

Please carry out one focused corrective iteration, V-006-F03, on our current Nordljud Round 2 Vibe Coding app before we start V-007.

Use the documented UX-REVIEW-01 findings and keep the existing design and working features. I want to fix what is actually needed, not build new features or redesign the product.

Please focus on these corrections:

1. Make the vocabulary search results and selected verb detail consistent and understandable. If I filter the list, do not leave an unrelated verb displayed without a clear explanation. Preserve the exact verb and meaning when returning from Your Learning.
2. Correct the identified low-contrast small text so it meets WCAG AA normal-text contrast requirements, while keeping the same visual style.
3. Add a clear, accessible Retry option when the vocabulary cannot load, without forcing me to switch levels.
4. Clarify Guest Mode: after a page reload, remember the guest's selected level, exact verb and meaning, and Learning/Practice mode in that browser only. Do not create a guest cloud account or permanently save guest scores, favorites or study history. Record this as our proposed interpretation of shared acceptance criterion F08, and identify any requirement conflict openly rather than silently rewriting the common evaluation criteria.
5. Review whether the original fixed mini-lesson is clearly separate from the selected-verb learning experience. If a small wording or labeling fix is justified, make it; otherwise record it for V-009 instead of expanding this iteration.

Keep the language-quality and exercise-content issues, including ambiguous meanings of sticka and invalid audio for missing verb forms, for V-007. Leave V-008 learning enhancements, V-009 wider UX polish and V-010 final validation for their own stages.

Before changing code, record the baseline commit and the exact approved prompt in GitHub. Make only small, traceable changes in condition/vibe. Add or update focused regression tests, run the available test, type-check and build checks, and preserve failed runs as well as successful ones. Test the real app on desktop, mobile and keyboard where access permits; otherwise mark those checks BLOCKED or NOT TESTED, never PASS.

For every correction, record the original problem, what changed, relevant commit IDs, test results, remaining risks and my feedback in GitHub for the final report. Do not alter our frozen Swedish datasets, authentication database or security rules, independent SDD implementation, or unrelated product features.

Finish this one corrective iteration with a concise evidence-based summary and ask for my acceptance before moving to V-007.

## Approval and experiment integrity notes (not part of the prompt)

1. This commit only records a proposed prompt; **no V-006-F03 implementation, tests, app or database changes are authorized or claimed**.
2. Approval must quote/clearly identify this exact proposed version. Record the student's *exact approval* in a separate file, in the same designated branch, **before writing code**.
3. The proposed guest behavior is a specific *interpretation* of frozen common criterion F08; any subsequent change to shared acceptance requirements must be controlled for both Vibe and SDD, independently of the implementation.
4. The final report will distinguish the student-selected decision, AI-authored proposed wording, student approval, agent-facing instructions, implementation, fixes, RED/GREEN CI, browser acceptance and remaining gaps. This is a constructive/corrective-cycle marker.
5. Historical pilot: three approaches Vibe / God Mode / SDD in `alikhalessi/nordljud-software-construction`. Round 2: **two** independent approaches Vibe / Spec Kit SDD in this repo.
6. Do not begin V-007 until F03 is completed and the student accepts or explicitly decides to move on with documented blockers.
