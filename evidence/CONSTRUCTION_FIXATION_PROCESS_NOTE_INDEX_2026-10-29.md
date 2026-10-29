# Round 2 report-evidence index — Construction ↔ Fixation, UX audit and F03 decision

**Created:** 2026-10-29
**Status:** RESEARCH INDEX ONLY / NOT A CODING PROMPT / NO NEW COMMON REQUIREMENT
**Location:** shared Round 2 main branch, for discovery when writing the final comparative experience report.
**Origin:** the student's own explicitly stated observation that software work repeatedly alternates between "construct" and "fixation"; student chose Option A focused stabilization but postponed its implementation.
**Provenance:** this index was written by ChatGPT; authentic verbatim student wording is stored separately in the linked Condition A decision file.

## Canonical detailed source (Vibe condition branch)

[Full dated student decision history, original Persian quotes, options A/B/C, scope safeguards, and proposed report analysis](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/V-006-F03_FOCUSED_STABILIZATION_DECISION_AND_RESEARCH_RATIONALE_2026-10-29.md)

Other related Vibe primary-source records:
- [Read-only UX-REVIEW-01 assistant draft](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/UX-REVIEW-01_AI_DRAFT_2026-10-29.md)
- [Student's exact audit approval](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/UX-REVIEW-01_STUDENT_APPROVAL_2026-10-29.md)
- [Actual read-only UX source audit, including limits](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/UX-REVIEW-01_BASELINE_AUDIT_2026-10-29.md)
- [Seven categorized static/source findings](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/UX-REVIEW-01_FINDINGS.csv)
- [Dated Vibe decision log](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/DECISION_LOG.md)
- [Authentic prompt/approval ledger](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/PROMPT_LEDGER.md)

**Current decision:** Option A / proposed V-006-F03 focused stabilization is the selected route, **NOT student-authorized for execution**. No exact F03 coding prompt has been approved; the next permission must be explicit and prospective. V-007 language quality, V-008 focused saved-learning review, V-009 UX polish, V-010 final validation are later steps.

## Research question to carry into final report

The student observed a repeated alternation between building and correcting while developing with AI assistance. Rather than suppressing corrective work as noise or presenting only green CI runs, document (a) why each fix arose, (b) who noticed it and what was approved, (c) actual code/test/experience evidence, (d) whether an iteration corrected a defect or added scope, and (e) if/when the result was independently accepted.

Proposed coding of each event: CONSTRUCT / FIXATION / MIXED / VALIDATION / DECISION. Distinguish AI mistakes, user-requested design revisions, external configuration blocks and unverified assumptions. Build a chronological evidence table with commit SHAs and issue/CI links. Treat student oversight checkpoints as first-class events.

**Hypothesis only:** This alternation may be an important observable feature of conversational software development and may differ in visibility or sequencing when compared to SDD. No general claim about superior method quality or development speed is yet justified.

## Round distinction — do not misstate the number of conditions

- **Historical pilot:** alikhalessi/nordljud-software-construction compared **three** approaches: Vibe, God Mode, SDD. Relevant to the student's phrase "three versions" and a possible historical comparative appendix or contextual account.
- **Current Round 2:** this repository compares exactly **two** approaches: Vibe Coding (condition/vibe) and official Spec Kit-supported Specification-Driven Development (condition/spec-driven). **Do not** claim a third God Mode run in Round 2.

The central comparison must use the same independently documented acceptance outcomes from evaluation/ACCEPTANCE_MATRIX.md, with every change recorded in a shared change log. Keep separate application code and do not transfer the Condition A implementation or fixes into Condition B as source templates. Report order effects, different assistance levels, manual testing gaps and additional student-guided corrective iterations.

## Why this index is stored on main

The main branch is the shared evidence/research home. Its index links to the detailed Vibe-branch history for **final reporting**, without copying Vibe application implementation into the SDD branch or changing common product acceptance expectations. The eventual SDD developer must implement independently from shared neutral input/specifications. A report author may compare both after observing real runs.

## Draft report takeaway (assistant-authored; validate before using)

"Development involved repeated construction, user evaluation, corrective changes and re-verification. The student explicitly requested a stabilization iteration before continuing feature development after a read-only UX audit exposed risks and verification gaps. This decision was itself documented with approval boundaries and was not equivalent to executing fixes. Tracking these cycles prevents the final report from reducing AI-assisted construction to a sequence of final successful builds. The Round 2 Vibe/SDD comparison must assess real evidence from both approaches; the earlier three-method pilot remains a separate historical round."

**No code, DB, login, deployment or F03 implementation is authorized or changed by this research index.**
