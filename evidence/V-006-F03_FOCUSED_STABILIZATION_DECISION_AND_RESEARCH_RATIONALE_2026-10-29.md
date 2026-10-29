# V-006-F03 — Focused Stabilization Iteration: decision history, rationale and report evidence

**Date:** 2026-10-29 (Europe/Helsinki; no fabricated exact local timestamp)  
**Project:** Nordljud Round 2 — Åbo Akademi Software Construction SWCON2627  
**Method condition:** A — assisted Vibe Coding  
**Repository:** alikhalessi/nordljud-swcon2627-r2  
**Branch:** condition/vibe  
**Status:** **DIRECTION SELECTED / DOCUMENTATION AUTHORIZED; IMPLEMENTATION EXPRESSLY DEFERRED**  
**Type of this commit:** Research/decision evidence **only**. This is **not** an approved coding prompt and **not** an executed stabilization iteration.  
**Prepared by:** ChatGPT as an AI-assisted *retrospective, structured reconstruction* of the visible conversation and referenced repository evidence. Verbatim user statements are distinguished from assistant summaries/interpretations. This file is NOT a verbatim export of the entire conversation.

## 1. Why this document exists

The student explicitly requested detailed, durable GitHub evidence of **how and why** we decided to add one focused corrective iteration between the current V-006-F02 and the scheduled V-007/V-008/V-009 steps, and why that matters to the final university experience report.

This is an analytically useful decision point because the student independently recognized a recurring sequence in actual AI-assisted development:

> Construct → Fixation → Construct → Fixation …

The student wants that iterative alternation emphasized in the report conclusion, not merely the final deployed product or the count of generated features. This is the student's observation and hypothesis to investigate, **not** an already validated law of software construction or a result establishing one development method is superior.

**CRUCIAL APPROVAL BOUNDARY:** The student selected Option A but explicitly said they would later authorize proceeding with it. No code changes, database changes, data rewrites, full UX redesign, extra tests or deployments are authorized by this decision alone. A later *exact* V-006-F03 implementation prompt must be drafted, reviewed, approved and committed **before** any execution, following docs/PROMPT_APPROVAL_PROTOCOL.md.

## 2. Authentic student wording preserved from this conversation

### 2.1 Student's proposal to interleave an iteration

Verbatim student message:

> ببین، من کامل اینا رو گرفتم، خب الان به نظر تو آیا بهتر نیستش که وسط این ورژن‌ها یک ورژن جدید داشته باشیم برای فیکس مشکل و یک iteration این رو بریم، کامل جلو ببریمش، بعد از اون بریم سر مرحله بعد، ورژن ۷ و ۸ و ۹. نظر خودتو دقیق برام توضیح بده و بعد کار تصمیم رو بر من بذار.

English explanation (assistant translation, **NOT** an original English student quote): The student proposed placing a corrective iteration between the current increment and V-007/V-008/V-009, asked for a careful evaluation, and explicitly reserved the final decision for themself.

### 2.2 Student's selection, research emphasis and execution pause

Verbatim student message, 2026-10-29:

> ببین، من گزینه A رو انتخاب می‌کنم، اما یه چیز خیلی مهمی که وجود داره می‌خوام با دیتیلز این رو ثبت بکنی، تمام صحبتی که اینجا شده، که به خاطر چی این تصمیم‌گیری انجام شد، توی گیت‌هاب باشه، که برای در واقع ریپورت آخری که می‌خوایم به استاد بدیم، واسه سه تا ورژن مختلف، این رو هم مد نظر قرار بدیم. من فکر می‌کنم این خیلی نقطه کلیدیه که ما باید بهش تأکید بکنیم توی سامرایز کردن انتهای ریپورت. به نظرم میاد این خیلی نکته واجبیه که ما بگیم همونجور که داریم می‌سازیم، در واقع عملیات development رو انجام می‌دیم، یک قسمتش constructه، یک قسمت fixationه. یعنی هی ما construct می‌کنیم، fixation می‌کنیم، construct می‌کنیم، fixation می‌کنیم. آره دیگه. من بعداً بهت می‌گم که با همون گزینه iteration A، اصلاحی متمرکز که پیشنهاد خودت بود، جلو بریم.

English explanatory paraphrase (assistant-authored, **NOT** verbatim): The student chooses **Option A** (focused corrective iteration), emphasizes preserving the entire reasoning chain in GitHub for the professor's comparative final report, identifies an alternating construction–correction pattern in software development, and explicitly defers **permission to begin implementation** until a later instruction.

**Status interpretation:** Option A is **CHOSEN AS STRATEGY**. The exact future coding prompt is **NOT YET APPROVED**. V-006-F03 work is **NOT STARTED**.

### 2.3 Earlier authenticated permission relevant to the diagnosis

Verbatim student approval for the separate baseline audit:

> I approve UX-REVIEW-01 exactly as written. Record my approval in GitHub, then execute the read-only UX/UI baseline audit and preserve all evidence.

This approval applies **only** to the read-only UX audit; it cannot be reused as authorization to change the application. See evidence/UX-REVIEW-01_STUDENT_APPROVAL_2026-10-29.md.

## 3. Chronological reconstruction: how we got here

The following is **retrospective assistant synthesis**, not a verbatim chat transcript. The previous GitHub commits and records below are the primary execution evidence.

| Order | Event | Student input / observation | Agent response or actual outcome | Why it matters |
|---|---|---|---|---|
| 1 | Original Round 2 charter and baseline | University comparison of natural-language Vibe vs Spec Kit SDD; approve one prompt at a time | Both conditions share frozen educational inputs and acceptance matrix, separate code and branches | Requires authentic chronology and no cross-condition contamination |
| 2 | Initial construction V-001…V-006 | Student iteratively asks for actual learning, vocabulary, modes, login and private progress | Functionality implemented in condition/vibe; separate prompts, corrections and CI records already exist | Construction generates new feature surfaces and test obligations |
| 3 | Earlier smaller fixation cycles | Student reports errors or emerging needs: audio, reveal-on-error, photography, layout | Several V-002-F01 / V-004-F01…F03 corrections and expansions occurred | The project already shows construction followed by feedback-driven changes |
| 4 | V-006-F01 corrective layout | Student observed long Your Learning content pushing lessons down | First accordion/collapse approach implemented, with passing static CI; actual problem not satisfactorily resolved for student | A green CI run did not guarantee satisfactory UX |
| 5 | V-006-F02 second corrective layout | Student proposed independent side-by-side Explore Your Words / Your Learning destinations | Two mounted tab panels, dashboard views and pagination implemented; first new test had a syntax error (RED), then test fixed (GREEN) | Demonstrates design iteration, unanticipated rework and need to preserve failed runs |
| 6 | The discussion drifted over V-007 vs UX | Student noticed that the assistant alternately called V-007 language quality and UX/UI audit | Assistant acknowledged context/scope confusion: the originally planned V-007 is linguistic/content quality, UX/UI had been associated with V-009; UX audit separated as UX-REVIEW-01 | Human intervention corrected AI scope drift; important process evidence, not to be hidden |
| 7 | Student asks to consider V-007/V-008/V-009 and UX/UI together | Wanted a shorter structured completion path before SDD | Assistant suggested a preliminary UX audit, then V-007 language, V-008 Lite, V-009 UX and V-010 final gate | Created decision context, not a new final technical SRS |
| 8 | UX-REVIEW-01 approved and audited | Student explicitly approved exact read-only prompt | GitHub source audit completed and documented; 7 observations logged; actual live browser testing blocked | Revealed risks before new feature construction, with evidence limitations |
| 9 | Student proposes corrective iteration between stages | Explicitly asked whether one targeted iteration should precede V-007/8/9 | Assistant explained advantages and limitations, proposed Option A focused stabilization, Option B broad redesign, Option C defer fixes | A new scope/scheduling choice had to be made |
| 10 | Student chooses A, defers execution | See full verbatim quote above | This document records direction; no V-006-F03 code or exact approved implementation prompt yet | Demonstrates meaningful student control over the agent and evidence chain |

### Specific source trace for important episodes

- Round 2 charter: docs/PROJECT_CHARTER_PC-001.md and docs/EXPERIMENT_PROTOCOL.md.
- Feedback and resolution for the first dashboard attempt: evidence/V-006_F01_USER_FEEDBACK.md; evidence/V-006_F01_IMPLEMENTATION_LOG.md.
- Student-approved replacement navigation: evidence/V-006_F02_APPROVED_NAVIGATION.md.
- Successful two-tab implementation and true RED→GREEN run: evidence/V-006_F02_IMPLEMENTATION_LOG.md; [failed CI 40859654821](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40859654821); [successful CI 40859801729](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40859801729).
- Read-only audit AI draft then exact approval: evidence/UX-REVIEW-01_AI_DRAFT_2026-10-29.md and evidence/UX-REVIEW-01_STUDENT_APPROVAL_2026-10-29.md.
- Audit's full evidence and seven source observations: evidence/UX-REVIEW-01_BASELINE_AUDIT_2026-10-29.md and evidence/UX-REVIEW-01_FINDINGS.csv.
- Exact student prompts/inputs through V-006: evidence/PROMPT_LEDGER.md. These cross-references should be used in the final report rather than claiming that this retrospective account alone is primary execution evidence.

## 4. Why adding V-006-F03 was preferred — rationale, not guaranteed outcome

**Construction-first risk:** V-006 already has several interacting user journeys: four CEFR levels, full searchable lexical corpus, multiple verb senses, selected-verb lessons/practice, fixed representative lessons, speech synthesis, auth, cloud-saved favorites, studied verbs and history. Adding more without pausing could multiply the places where old UX faults appear.

**Current evidence gap:** The read-only audit found source-supported mismatches, color-contrast concerns and an unresolved guest-state acceptance conflict. Browser/mobile/account manual verification is still blocked or incomplete. This is a reason for a controlled stabilization stage, **not proof of every suspected user-facing failure**.

**Containment:** Group small, explicitly approved UX corrections into one bounded iteration and regression-test once before V-007/8/9, instead of mixing fixes silently into feature-building prompts or a broad UI overhaul.

**Scientific value:** Real process evidence must show decisions, failures, human feedback, fixes, regression tests and unmet test conditions. An idealized only-green history would erase important experiential findings about AI-assisted construction and oversight.

**Counterargument / cost:** Adding F03 increases the number of planned iterations and might increase short-term work. No measured delivery-time comparison exists to establish that it will be faster overall. Scope control and a stop condition are therefore essential.

**Human oversight:** The student noticed misalignment in assistant terminology, requested rationale, evaluated alternatives, selected A and withheld implementation permission. This illustrates one meaningful human oversight checkpoint, but is not a quantified UX/assurance study.

## 5. Options considered and actual disposition

| Option | Assistant's characterization in chat | Benefits | Trade-offs | Student choice |
|---|---|---|---|---|
| A — focused corrective iteration | V-006-F03, repair high-priority existing UX issues and clarify F08; do not absorb language review or new features | Bounded risk reduction, coherent provenance, lower potential rework | One extra stage; manual verification still depends on access | **SELECTED; NOT YET AUTHORIZED FOR EXECUTION** |
| B — broad UX/UI overhaul | Wide design/flow reassessment and cosmetic redesign | Could address larger usability issues | Scope creep, more uncontrolled work, unfairly changing comparison inputs | Not selected |
| C — no extra iteration | Backlog issues until V-009 and proceed directly to V-007 | Fewer immediate steps | May build on known deficiencies and spread correction work across later prompts | Not selected |

The assistant recommended A, but **the student made the final selection**. The selection was not a final exact coding instruction.

## 6. Tentative F03 scope, subject to a new approved prompt

**Candidate in scope; not yet authorized:**
- UX01: clarify relation between vocabulary search results and previously selected verb; small, reversible fix after review.
- UX03: adjust CSS small-text contrast where values were calculated below WCAG 2.2 AA normal-text threshold; verify actual rendered pairing.
- UX05: offer a direct Retry action for failed vocabulary fetch, preserving accessible states.
- UX02: reconcile independent F08 guest browser-retention requirement with the prior approved V-006 "guest progress not saved permanently" behavior; record student's substantive decision and use the same independent expected outcome for both conditions. **No unilateral change to frozen F08.**
- UX04: investigate the fixed mini-lesson's separateness and user confusion; modify only if validated and separately included in the approved scope.

**Explicitly deferred to V-007:**
- UX06: Swedish-learning context/sense ambiguity in generated questions (e.g., two senses of sticka).
- UX07: suppress audio for unavailable-form placeholders such as em dash.
- Remaining Swedish grammar, translation and CEFR review; do not rewrite the frozen source corpus in F03.

**Remaining stages:** V-007 language and question quality; V-008 limited dashboard completion and persistence acceptance; V-009 holistic mobile/accessibility UX polish; V-010 final quality/security/reproducibility gate; freeze evaluated Vibe snapshot; then independently implement SDD via actual Spec Kit. No premature 'V-007 executed' or 'SDD started' designation.

## 7. Definition of Done / stop conditions (proposal, NOT yet agreed implementation contract)

A future V-006-F03 can close when:
1. It has a *student-reviewed exact prompt*, saved before coding in the Vibe branch.
2. Every issue in its final agreed scope has a reproducible before state, change rationale, after state, test and owner/decision.
3. Automated unit/tests, typecheck and build results (including failures) are captured at specific SHAs; do not rewrite RED history.
4. Browser desktop, phone-sized, keyboard and core user journeys are tested where possible, otherwise explicitly BLOCKED/NOT TESTED with environment and reason. CI PASS alone cannot close browser acceptance.
5. Original educational data and independent SDD code remain unchanged; guest/F08 semantics are mutually documented.
6. Each issue has a terminal status (FIXED / VERIFIED, DEFERRED, or BLOCKED) rather than running a limitless polishing loop.
7. Student decides whether to accept the iteration and move to V-007; assistants do not self-certify user acceptance.

These are assistant-proposed criteria for later review, **not an implementation prompt or declaration of completion**.

## 8. Methodological insight for final report: Construction–Fixation alternation

### 8.1 Student's insight vs analytical framing

**Student-observed label:** "construct" followed by "fixation", repeated. Preserve this phrasing as the student's original qualitative insight.

**Assistant's suggested analytical labels** (not user quotations): 
- *Construction increment*: a prompt-driven addition of functionality, representation, data flow or interaction.
- *Fixation / correction increment*: follow-up activity needed to resolve observed defects, usability dissatisfaction, missing requirements, flaky tests, security/configuration problems or evidence gaps. Some follow-ups combine correction and requested scope expansion and should be tagged **MIXED** rather than forced into a false binary.
- *Validation checkpoint*: tests, user walkthroughs, CI or audit activity checking real behavior. It may reveal a new correction but is not itself a code fix.
- *Decision/approval checkpoint*: explicitly student-authorized scope choice and oversight that can block further execution.

**Illustrative chronological chain** (verify individually against Git commits, do not treat as complete quantitative dataset):

Construction V-001 / V-002 → user notices absent speech → V-002-F01 corrective speech; 
V-004 new Practice Mode → V-004-F01 correction adding optional answer reveal;
V-004-F02 pilot photos → V-004-F03 student-requested image expansion (**MIXED expansion**, not a confirmed fault repair);
V-006 saved progress/dashboard → V-006-F01 attempt to reduce page push-down → student observes unresolved problem → V-006-F02 replacement two-tab approach → static UX-REVIEW-01 → **proposed** V-006-F03 focused stabilization.

**Do NOT collapse these into identical 'bug fixes':** e.g., photos expansion is a new user request, whereas a test-file syntax error and a flawed layout have different origins. Record defect / misunderstanding / omitted feature / scope change / environment blocker distinctly.

### 8.2 Proposed evaluable research questions

1. In which phase did each requirement gap or defect first become visible (construction, validation or use)?
2. How many agent interactions and distinct correction cycles occurred after each initial feature increment?
3. How often did human feedback detect a problem despite green automated CI?
4. Which corrections required new requirements vs simpler local patches?
5. How often was initial AI interpretation inadequate and how was meaningful student oversight applied?
6. How did Vibe's iteration pattern compare with SDD's actual specification, implementation, clarification and correction stages **under the same fixed acceptance requirements**?
7. Which limitations prevent a fair causal claim (one student, informed second iteration, sequential method order, unequal live access, missing time measurements)?

These are **questions to examine**, not findings already established.

### 8.3 Reproducible evidence table to collect prospectively

For each increment and corrective cycle, log:
- Stage/condition/branch, prompt identifier, original user input and exact reviewed prompt, approval and date, model/agent actually used.
- Trigger classification: user feedback, code review, static scan, failed CI, live browser, requirement revision, dependency/provider blocker.
- Type: CONSTRUCT / FIXATION / MIXED / VALIDATION / DECISION.
- Expected/actual and severity, changed requirement, before/after code commit SHA, test case, failure run, recovery run, deployment URL and screenshot if authentic.
- Scope size or edit metric if actually measured; number of follow-up attempts; unresolved issues and whether blocked by external services.
- Student approval at start and acceptance at end; intervention by assistant vs student, preserved separately.
- Time/effort **only if measured at the time**; never infer active coding minutes retroactively from commit timestamps.

At final analysis: compute observed cycles and outcomes, show an illustrative timeline, describe asymmetries and avoid attributing difference solely to the development methodology.

### 8.4 Suggested concluding emphasis — draft text, NOT a concluded result

> During the observed AI-assisted development, software construction did not proceed as a single linear implementation. It moved through repeated construction, evaluation, correction and renewed validation. Several difficulties became visible only after the student examined the generated experience, and at least one passing static test suite did not settle the student's layout concern. The project therefore records corrective iterations and student approval checkpoints as first-class development evidence. Whether the Vibe and SDD conditions differ substantially in these cycles must be judged from each condition's real logs and common test outcomes, not assumed in advance.

This paragraph is **assistant-authored proposed prose**. It should only appear in the final report after confirming relevant evidence and adapting it to real SDD observations.

## 9. Protect the comparison from silent scope drift

**Historical pilot vs current Round 2 are separate:**
- Historical original pilot: alikhalessi/nordljud-software-construction — **three methods** (Vibe, God Mode, Spec Driven). The student's request to discuss "three versions" can reference this earlier history. Never rewrite its distinct outcomes as though they were fresh Round 2 runs.
- Current Round 2: alikhalessi/nordljud-swcon2627-r2 — **two methods only** (Vibe and SDD). This file documents a Vibe-branch intervention; no new Round 2 God Mode condition was authorized.

**Scientific honesty:** The focused stabilization iteration is an additional human-guided change in Condition A. Preserve that asymmetry when comparing to Condition B. If a new product requirement is accepted (especially F08), update the common shared requirement/change protocol and apply the *same outcome criterion* to both methods without supplying the Vibe code to SDD.

**Report authorship:** Student owns the selection and insight; ChatGPT prepared this structured research document and proposed academic framing. Do not imply the student manually wrote these English interpretations or that GitHub attribution proves manual coding.

## 10. Current disposition and next permissible action

**Decision:** Option A selected, proposed label V-006-F03, focused correction before V-007/8/9.

**Authorization status:** The student explicitly states they will say later when to proceed. Thus:
- No F03 detailed coding prompt has yet been approved.
- No F03 application implementation, fix, tests, database migration or UX visual redesign has occurred.
- Do not mark any issue fixed from this memo.
- At the next explicit student instruction, draft the exact F03 prompt in student's natural voice, record AI_DRAFT, collect explicit STUDENT_APPROVED for exact text, *then* execute and retain issue-by-issue proof.

**This file is the durable decision/interpretation record for the final experience report; it is not evidence that the deferred iteration was performed.**
