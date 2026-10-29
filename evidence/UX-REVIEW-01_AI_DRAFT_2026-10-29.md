# UX-REVIEW-01 — proposed student approval prompt (NOT EXECUTED)

**Date:** 2026-10-29 (Europe/Helsinki)  
**Project:** Nordljud Round 2 / SWCON2627  
**Condition:** A — Vibe Coding  
**Repository:** `alikhalessi/nordljud-swcon2627-r2`  
**Target branch:** `condition/vibe`  
**Status:** `AI_DRAFT — STUDENT APPROVAL PENDING — NOT EXECUTED`  
**Category:** read-only UX/UI baseline audit before V-007/V-008/V-009  
**Provenance:** text below drafted by ChatGPT from current student request; it has NOT yet been confirmed or edited by the student.

## Exact student request leading to this draft

> ok please continue and offer my prompt to approve. Do you remember to record our data and knowledge in the github since we must create the final report for all three versions

Earlier conversation established an initial UX/UI review before the remaining development increments. The above quoted request is the exact current-turn instruction; it is **not** approval of the following English text.

## Exact assistant-drafted prompt offered for student approval

Please review our current Nordljud Round 2 Vibe Coding app before we continue with V-007, V-008 and V-009.

I want a practical UX/UI baseline review first, not a redesign. Check how the app actually feels and works on desktop and mobile, especially Explore Your Words, Your Learning, level and word selection, Learning and Practice modes, feedback, favorites, progress, history, Guest Mode and login.

Look for confusing navigation, unnecessary scrolling, visual inconsistencies, accessibility and keyboard problems, poor mobile layouts, unclear error messages and anything that makes studying Swedish harder than it should be.

Test real interactions where access permits. For every confirmed problem, explain what happened, how to reproduce it, how serious it is, and the smallest sensible fix. Clearly separate confirmed defects, suggestions and anything you could not test.

Record the findings, screenshots where available, tested version, evidence and limitations in our GitHub project. Keep my original feedback separate from AI interpretations, preserve failed tests and earlier decisions, and do not claim something passed unless it was actually checked.

Do not change application code, the database or the design during this review. Finish by giving me a short prioritized fix list so we can approve the next development prompt. Keep Vibe and SDD independent and preserve the evidence needed for our final comparison report.

## Context and scope control (RESEARCH NOTE, NOT PART OF THE APPROVED PROMPT)

- Last recorded Vibe implementation: V-006-F02 (Explore Your Words / Your Learning top-level tabs), with 33 automated tests, TypeScript and build reported PASS; manual browser acceptance is still incomplete. Re-verify latest commit when executing.
- UX-REVIEW-01 is a **read-only audit**, not V-007 and not a coding change. Follow-up development stages: V-007 language/content quality; V-008 focused learning-dashboard completion; V-009 UX/UI fixes; V-010 final validation. No additional feature inflation.
- Original 2026 pilot repository `alikhalessi/nordljud-software-construction` compares **three historical conditions: Vibe, God Mode and SDD**. Round 2 repository `alikhalessi/nordljud-swcon2627-r2` compares **two independent conditions: Vibe and SDD**. Final report must distinguish rounds and **must not invent a Round 2 God Mode condition**.
- Common evaluation in Round 2 uses `evaluation/ACCEPTANCE_MATRIX.md` (F01–F15), not a method-specific solution masquerading as an independent benchmark.
- Separate student's original words, assistant draft, student edits, explicitly approved exact wording, agent-facing technical instructions if different, actual code/tool actions, observed behavior and tester verification.
- Retain version/branch/commit SHA, date, reproducible steps, expected/actual, severity, status PASS/FAIL/BLOCKED/NOT TESTED, screenshots or CI run links, interventions, regressions, negative runs and uncertainties.
- Never copy implementation code from Vibe to SDD or claim that a green CI build proves real browser/OAuth/security acceptance.
- Earlier preliminary linguistic static findings from the conversation are separate preliminary V-007 evidence, **not** verified UX audit outcomes. Do not conflate the tasks.
- This file documents the proposed prompt and reporting plan only. **No application audit, source edits, database changes, fixes or deployment are claimed by this entry.**

## Approval / execution gates

- [ ] Student reviewed and explicitly approved the exact prompt (or provided edited replacement)
- [ ] Final approved prompt saved verbatim with timestamp/provenance before execution
- [ ] Target commit SHA and deployment identified
- [ ] Audit executed and observed evidence linked
- [ ] Issues prioritized and student reviewed next corrective prompt
