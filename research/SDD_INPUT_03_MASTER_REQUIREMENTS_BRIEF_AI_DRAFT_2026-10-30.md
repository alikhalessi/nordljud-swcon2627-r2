# Nordljud SDD — Master Requirements Brief (MBR-B-002)
**Research condition:** B — Independent Specification-Driven Development with official GitHub Spec Kit  
**Date:** 2026-10-30 (Europe/Helsinki)  
**Status:** **AI_DRAFT — OPTION C POLICY APPROVED; EXACT MASTER TEXT AND EXTENSION NOT YET APPROVED**  
**Student's verbatim policy approval:** `research/SDD_INPUT_04_OPTION_C_STUDENT_APPROVAL_2026-10-30.md`  
**Implementation:** **NOT STARTED**. No official Spec Kit stage executed. This file is a human-review brief, not a generated `spec.md` or coding instruction.

## A. Purpose, actors and research boundary
Build **Nordljud**, a responsive Swedish-through-English learning web application that lets learners study reliable source-linked Swedish vocabulary, see translations and verb forms, practise, use Guest Mode, and optionally authenticate for private progress. Primary actors: Swedish learner/Guest and authenticated learner. Secondary actors: student-researcher, course assessor and authorized test operators. Do not claim linguist certification or measured learning effectiveness.

**Research comparison:** Condition A is an already frozen, informed, feedback-driven Vibe Coding implementation; Condition B creates an **independent** implementation via the official Spec Kit stages. Compare identical pre-registered CORE F01–F15 outcomes as the **primary** result. Evaluate any later user-requested features as **separately versioned EXTENDED PARITY**, never rewrite the original benchmark or present later features as initial requirements. Report knowledge transfer, chronology, scope asymmetry and missing test evidence as limitations.

## B. Shared inputs, fixed scope and technology constraints
- Start only from original approved `docs/PROJECT_CHARTER_PC-001.md`, `shared-content/PRODUCT_BRIEF.md`, `shared-content/SOURCE_MANIFEST.md`, the original shared datasets and `evaluation/ACCEPTANCE_MATRIX.md`.
- CEFR levels: **A2, B1, B2, C1**. Each level has **456 semantic/sense records** and **455 distinct written verb spellings**; four levels total **1,824 sense records**. There are **two separate meanings of `sticka`** per level. Maintain distinct sense identity.
- Use the identical, unchanged original `shared-content/verb-library/A2.json`, `B1.json`, `B2.json`, `C1.json` and `mission-seeds.json` identified by `SOURCE_MANIFEST.md`. Preserve stored Swedish/English examples; do not invent missing forms, examples, translations or linguistic certification.
- Original common technology **families**: Next.js, React, TypeScript, Supabase, GitHub, Vercel and browser Swedish speech when supported. Exact dependency versions, interfaces, storage schema, privacy mechanism and layout are choices for **Spec Kit Plan**, subject to these constraints; this brief does not supply Vibe code or architecture.
- Shared explicit exclusions: payment, generative chat tutor, speech-recognition/scoring, admin/social features, large newly authored curriculum and production-grade localization. Android app, PWA push notifications and scheduled push delivery are also excluded from this comparison.
- **Method isolation:** SDD codebase, tests, deployments, Auth and private data must be separate from Vibe. No copying Vibe source, SQL, CSS, tests, screenshots or release-workflow templates; the SDD agent must not inspect the Vibe retrospective and prompt ledger.

## C. CORE requirements — primary, unchanged F01–F15 acceptance contract
Each ID below states an observable **what/why**; implementation choices belong in the later Plan. The authoritative original F01–F15 wording and its pre-registration date remain unchanged.

**C01 / F01 — Levels and missions.** Learners can choose each of the four CEFR levels and receive a distinct level-appropriate mission from the frozen source inputs.

**C02 / F02 — Source-backed examples.** Swedish examples and English translations agree with the frozen source; users can reveal/hide English assistance without changing the underlying meaning.

**C03 / F03 — Swedish speech.** When the browser/device supports it, the user can request Swedish pronunciation of authentic stored text. When unavailable, an understandable fallback leaves reading and practice usable.

**C04 / F04 — Two practice checks.** One comprehension and one verb-form check have testable correct/incorrect feedback. Incorrect answers or revealing the answer do not earn credit.

**C05 / F05 — Complete searchable lexicon.** A level's full 456-sense collection is accessible and searchable; selecting a sense shows its English meaning and the supplied five verb forms/source examples where present. Blank, placeholder or editorial em dash fields are not invented or treated as usable answers.

**C06 / F06 — Meaning identity.** The two distinct `sticka` senses are individually selectable and retain independent meaning, examples and favorite status; same spelling must not merge them.

**C07 / F07 — Level switching.** Switching among A2/B1/B2/C1 keeps the current verb/sense when a legitimate match exists and shows level-appropriate examples. Missing counterparts are clearly explained, not silently replaced by an unrelated verb.

**C08 / F08 — Guest learning.** A learner can complete the basic learning path without signing in; appropriate browser-scoped Guest state survives refresh in the same browser. The exact Guest persistence boundary is resolved in Spec Kit Clarify; Guest state must not leak into an unrelated authenticated account.

**C09 / F09 — Email authentication.** Supported email signup, invalid-credential feedback, login, sign-out and clear session indication work where the authorized external provider is configured. If the provider is unavailable, report that honestly while preserving Guest access. Account recovery is a separately documented quality/security refinement unless specifically accepted into F09.

**C10 / F10 — Google OAuth.** Supported Google sign-in opens the provider and returns to an authorized hosted application origin, not localhost, with a valid session where provider setup is available. No unsafe wildcards or elevated browser credentials.

**C11 / F11 — Account-owned persistence.** Authenticated users can maintain favorites, studied status, supported lesson/mission completion and practice results/history. Their own supported records persist through refresh and logout/re-login (and device changes where service access permits), without accidental loss or unauthorized modification.

**C12 / F12 — Cross-user isolation.** Two separate authenticated users cannot read, alter or delete each other's saved records. Enforcement must occur server-side and be checked with real negative cross-account tests; UI concealment alone is insufficient.

**C13 / F13 — Mobile and keyboard.** The essential study, navigation and login flows work on a narrow viewport and keyboard alone, including visible focus and clear controls. Do not prescribe Vibe's specific tabs or accordion.

**C14 / F14 — Sensitive data and failures.** No privileged secret appears in client code or public bundles; real errors produce actionable, non-disclosing feedback and safe retry or Guest fallback where applicable.

**C15 / F15 — Reproducibility.** Record exact source SHA, dependencies/versions, install, TypeScript/typecheck, tests, build, provider deployment and actual browser acceptance cases. Passing CI, a READY Preview or an OAuth redirect alone is not a live authentication/security PASS.

## D. Cross-cutting quality and validation rules
- **Data fidelity:** preserve exact immutable teaching data, including incomplete forms and semantic ambiguities; never fill gaps with unsupported AI-generated Swedish.
- **Privacy and security:** least privilege, owner-based backend access checks, no service-role key in client, protected OAuth redirects, minimal synthetic data and redacted evidence. Separate legitimate authorization is required for external provider setup, real test identities and database modifications.
- **Usability:** practical error feedback, readable responsive interaction and accessible essential controls; the later specification and checklist must define measurable scenarios rather than assert untested accessibility certification.
- **Reliability:** tests must include both expected and failure paths, including absent/partial source fields and unavailable cloud/audio/provider functionality; do not mark unavailable live services as PASS.
- **Test fairness:** independently reproduce the original F01–F15 tests for both frozen implementations. Each result is PASS, FAIL, BLOCKED or NOT TESTED with environment, steps, expected/actual, tested SHA and source/screenshot evidence. Do not artificially inflate score based on unit-test counts.
- **Research integrity:** retain actual human/AI roles, approvals, stage artifacts, failures, code changes and timestamps where recorded. Do not invent elapsed development times, cost, security proof or a comparative causal conclusion.

## E. Option C — separate EXTENDED PARITY scope, secondary evaluation only
**Student APPROVED Option C's methodology, not yet the exact E01–E07 feature contract.** This section is a **distinct, pending versioned amendment**: `research/SDD_INPUT_05_EXTENDED_PARITY_AMENDMENT_AI_DRAFT_2026-10-30.md`. If explicitly approved, define a second feature specification and independent EXT-AC acceptance suite. Do **not** change, renumber or enlarge primary F01–F15.

**E01 — Sense-relevant illustrations:** where included, display an appropriately licensed and accurately meaning-matched verb illustration/photo; report actual coverage separately.

**E02 — Daily micro-lessons:** expose a small, predictable selection of authentic source-backed lessons for a local day without falsely claiming newly authored Swedish materials.

**E03 — Daily Archive:** permit viewing eligible historical daily selections; never conflate reconstructed past lessons with the user's attendance.

**E04 — Completion and Undo:** user explicitly marks or reverses a completion; viewing alone is not completion or language mastery.

**E05 — Remind Me Later:** a deliberate per-sense review reminder with due/snooze and user removal, distinguishable from favorites and studied flags; no unsolicited push.

**E06 — 7-/14-day recall:** optional eligible source-grounded review checks with honest scoring, appropriate timing and correct/incorrect feedback.

**E07 — Extension persistence and privacy:** Guest records follow explicitly disclosed browser boundaries; authenticated extension records are owner-isolated and survive appropriate refresh/re-login.

**Secondary acceptance:** EXT-AC01–EXT-AC07 track the above one-to-one and are reported **in a separate denominator** from F01–F15. Even a completed extension does not alter the pre-registered primary score. Record the informed, sequential order effect: SDD received a structured extension set after the Vibe condition discovered these features incrementally.

## F. Matters for genuine Spec Kit Clarify (do not silently decide implementation here)
1. How should level switching behave if a source sense has no reliable counterpart in another level?
2. Exactly which Guest preferences/practice records must persist across a same-browser refresh, and how does a guest become a signed-in user without accidental data mixing?
3. Is email password recovery in CORE acceptance or in a separately tracked refinement? What are supported provider test conditions?
4. Which mission/practice records count as completion and are required to persist for F11?
5. Which independent SDD backend and authorized test identities can safely demonstrate F09–F12 without altering Vibe data?
6. Which real device/browser/audio environments are available for F03/F13, and what accessibility behavior can actually be evidenced?
7. For E01–E07, what feature coverage, retention limits, date/time behavior and test identities are approved? These questions belong to the **secondary amendment** and must not delay an otherwise clarified CORE spec.

## G. Official Spec Kit process and human checkpoints
- Work only from the original neutral `condition/spec-driven` branch/source baseline. The researcher-only audit and Vibe frozen source are NOT inputs to the coding agent.
- On exact student approval of this English Master, initialize official Spec Kit with a supported coding agent and record **genuine** integration/version and command outputs. Do not pretend Spec Kit has been run just because this brief exists.
- Apply the documented full sequence: **Constitution → Specify → Clarify → Plan → Checklist → Tasks → Analyze → Implement → Converge**, with real review at significant decision points. Constitution is project governance; Specify captures WHAT/WHY; Plan makes independent HOW choices; task implementation requires checked and reviewed quality gates. The exact agent skill syntax depends on its integration.
- **Primary first:** generate and approve CORE specification, plan and acceptance cases before CORE implementation.
- **Secondary separately:** only after a versioned human approval of the E amendment, specify/clarify/plan/tasks/implement its independent additional scope and evaluate EXT-AC without rewriting CORE.
- Do not paste a completed SRS or Vibe solution into a single coding prompt; use genuine Spec Kit artifacts and approvals. Distinguish reviewer-approved quality checklist from tests run against software.
- Record full stage inputs/outputs, exact SHAs and human decisions. Finish with one fixed-SHA SDD research snapshot, comparable primary black-box results, separate secondary comparison if executed, and an evidence-based university report.

## H. Pending final student approval / hard stop
**THIS IS AI_DRAFT.** The student's Option C approval authorized drafting this revision, **not its execution**. Do not run official Spec Kit commands, create SDD app/test code, copy Vibe artifacts or change cloud provider configuration until the student reviews and explicitly approves (a) exact English Master **MBR-B-002** and (b) separately versioned extension amendment **EP-B-001** if secondary scope is to be implemented. Preserve original user wording and approved artifact commit SHAs before real agent execution.
