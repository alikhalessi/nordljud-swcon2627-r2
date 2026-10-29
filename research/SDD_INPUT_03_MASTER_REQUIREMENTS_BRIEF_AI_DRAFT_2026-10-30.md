# Nordljud Condition B — Master Requirements Brief for Official GitHub Spec Kit
**Version:** MBR-B-001, draft dated 2026-10-30 (Europe/Helsinki)  
**Status:** **AI_DRAFT / HUMAN SCOPE APPROVAL PENDING / NOT AN EXECUTED SPEC KIT PROMPT OR COMPLETED `spec.md`**  
**Proposed methodology:** Option C, CORE + separately approved SECONDARY parity amendment.  
**Agent input safety:** This file contains product outcomes only and the neutral original baseline. It **must be reviewed and scoped** by the student before being supplied to the independent SDD coding agent. The retrospective audit and Vibe source are **researcher-only**, not agent context.

## A. Why and for whom
Build an accessible, responsive web application called **Nordljud** that helps Swedish-language learners study authentic source-linked Swedish verbs and examples through English explanations, study and practice, track their own progress, and optionally authenticate to persist private account data. Users can begin as guests. The course also evaluates *how* the application was developed using genuine official GitHub Spec Kit Specification-Driven Development, versus a separately frozen Vibe Coding implementation.

Primary stakeholder: Swedish learner / course student. Secondary stakeholders: developer/researcher and software-construction assessor. No teacher-validated grading or clinical/educational efficacy claim.

The desired learning experience is clear, forgiving when source data are incomplete, understandable when a word has multiple meanings, secure for account-specific data, and usable with a keyboard and small screen.

## B. Product input constraints (shared and immutable)
- Four CEFR levels: **A2, B1, B2, C1**.
- Use exact **frozen shared source inputs**, including `shared-content/verb-library/{A2,B1,B2,C1}.json` and `mission-seeds.json` from the original neutral branch. Each level has **456 sense records but 455 unique written verb spellings**. The two entries of `sticka` represent independent meanings and must not collapse.
- Record and verify original data provenance using `shared-content/SOURCE_MANIFEST.md`; don't rewrite source translations, generate missing Swedish examples or invent unsupported verb forms.
- Original shared evaluation contract: `evaluation/ACCEPTANCE_MATRIX.md` F01–F15, unchanged. All original F cases are PRIMARY comparison criteria.
- The original shared tech-family constraints are Next.js, React, TypeScript, Supabase, Vercel and GitHub (and browser speech synthesis). Exact versions, deployment routing, security patterns, schema and frontend design are determined later during Spec Kit **Plan**, with independent reasoning. This brief must not prescribe or copy Vibe code or database migrations.

## C. Product requirements — CORE (product's WHAT and WHY, not implementation HOW)
**C-FR-01 Levels and missions (F01–F02):** The learner can select A2, B1, B2 or C1 and study at least one appropriate original source-seeded mission per level with Swedish example, English meaning/assistance, and show/hide translation.

**C-FR-02 Spoken Swedish (F03):** For supported devices, the learner can request Swedish pronunciation for legitimate source-backed text. If unavailable, the interface communicates this without preventing reading/practice.

**C-FR-03 Practice and feedback (F04):** Learner answers at least one comprehension and one verb-form question using authentic source text. Incorrect answers are identified; no score or mastery is awarded for an incorrect choice or reveal of the answer.

**C-FR-04 Complete lexicon, verb forms and search (F05):** Learner can browse/search/select every one of the 456 semantic records for each level and see available verb forms/translated source examples. Missing/empty/editorial placeholder fields are explicitly unavailable and never silently fabricated.

**C-FR-05 Meaning-sense identity (F06):** Two identically spelled `sticka` entries with different meanings can be discovered, independently selected and favorited, without mixing their meaning or examples.

**C-FR-06 Cross-level semantic comparison (F07):** When moving between CEFR levels, the application preserves the selected meaningful verb/sense where there is a valid cross-level match and makes level-specific differences intelligible; if no valid match exists, clearly explain that rather than silently changing the word.

**C-FR-07 Genuine Guest Mode (F08):** A user can explore, study and practice without authentication. Appropriate guest-scoped local state survives a same-browser refresh, with a clear explanation that it does not imply cross-device account backup. Guest data must not be exposed as signed-in data for an unrelated account.

**C-FR-08 Email/password and Google identity (F09–F10):** Provide sign-up/sign-in/out flows, invalid-credential feedback and hosted Google OAuth when the authorized provider is available. The user's browser returns to an approved application origin (not localhost). Display current session status clearly; unavailable external provider must not disable Guest learning. Account recovery behavior, if implemented, must resist unsafe session redirects.

**C-FR-09 Owner-private learning persistence (F11):** Signed-in learners can add/remove per-sense favorites, mark/unmark studied items, record supported practice completion/results and review their own progress/history. Required account data survives refresh, sign-out/re-login, and cross-device sessions where backend access is available; destructive user actions require proper authorization.

**C-FR-10 Multi-user privacy (F12):** Two independent authenticated users cannot read, overwrite or delete the other user's private records. Enforcement is server-side and demonstrated with legitimate negative tests, not just hidden UI elements.

**C-FR-11 Accessible and resilient UI (F13–F14):** Essential learning and authentication flows work on narrow screens and with keyboard navigation; accessible labels/focus state and useful errors are provided; no service-role/elevated database secrets are present in public client assets. Failure/retry should not silently destroy the learner's state.

**C-FR-12 Reproducible evidence (F15):** Record dependency versions, exact code SHA, installation, typecheck/test/build evidence, deployment/runtime status and reproducible acceptance steps. A green build, SSO-protected Preview or Google redirect request is not by itself a live F09–F12 PASS.

## D. Nonfunctional and evidence obligations
- **Privacy:** Principle of least privilege; no shared database records across unrelated users; only publishable browser keys where required, never elevated role secrets.
- **Data integrity:** The frozen Swedish corpus is source of truth. Data gaps, ambiguous meanings and uncertain language-quality remain visible, not “fixed” via generated text; a qualified native-language review is outside current scope.
- **Access:** Keyboard and mobile-friendly primary interaction; clear errors; Guest remains usable if login/cloud fails.
- **Determinism:** Dataset order and any generated practice choices should be reproducible under documented test inputs; exact behavior is specified in the eventual verified spec/plan.
- **Security acceptance:** At least two real permitted test identities are needed for F12; masked evidence only; no false claim of a penetration test.
- **Comparative provenance:** Preserve every genuine Spec Kit step input/output, time **only if measured**, human clarification, red/green checks, failure mode, exact commit and independent F01–F15 PASS/FAIL/BLOCKED/NOT TESTED.
- **Environmental safety:** Isolate SDD infrastructure and data from Vibe, avoid altering Vibe's Supabase Production records or deployment. Credentials and paid services require explicit authorization. Do not invent a new backend project or infer it exists.
- **Academic integrity:** This is informed sequential development with order effects; official approval/command evidence must not be reconstructed after execution.

## E. Candidate SECONDARY feature parity — excluded from primary F01–F15 unless separately approved
**Status: DECISION_PENDING (do not hand to SDD implementation agent as mandatory work until amended).**

- **E01 — Illustrative verb-sense photos:** optional photos linked to the correct source meaning with genuine permissions/provenance; 26 photographed senses occurred in Vibe but numeric coverage should not be silently imposed as baseline.
- **E02 — Daily micro-lessons:** a predictable small daily set from existing source-backed learning records; do not claim it is a new authored curriculum.
- **E03 — Daily Archive:** browse prior day-based sets without falsely asserting personal completion.
- **E04 — Completion/undo:** user explicitly marks a daily activity completed or reverses it; viewing is not completion or verified language mastery.
- **E05 — Remind Me Later:** user-chosen per-sense review intent with clear due/snooze status, separate from favorites/studied.
- **E06 — 7-/14-day review:** optional source-grounded recall questions with honest scoring, due/eligibility conditions and accessible explanations.
- **E07 — Optional secondary cloud/guest persistence:** extension-related personal records follow same owner/privacy requirements and clear Guest boundaries.
- **Not included:** Android native app, PWA push/notifications, AI tutoring, speech recognition, social features, payment or admin portal.

If the student chooses Option C, define a separate *versioned scope amendment* with `E01–E07` and separate, independent `EXT-AC` acceptance cases. The amendment must be approved and dated **before** those SDD features are specified/implemented, not retroactively imported into CORE. Report primary and secondary results separately.

## F. Open questions to be settled by Spec Kit Clarify (not presumed answers)
1. If a semantic sense exists in one level but does not have a reliable matching example at another, does cross-level view retain the lexical choice and display missing status, or explicitly reset with explanation?
2. What exact non-sensitive Guest state must survive reload under F08: selection, studied intent, local practice result, or all? The original F08 is broad and the source-level Vibe solution must not be assumed.
3. Is password recovery a required CORE F09 acceptance item or a tracked security/product refinement beyond F09? Decide once, with an acceptance scenario.
4. What data must persist across account sign-out and re-login, and should Guest entries be intentionally importable? Default privacy posture: **no implicit cross-account merge**.
5. What authorized SDD Supabase project/Google provider test configuration, two-user test identities, HTTPS origin and delivery permissions will exist? Do not create or use Vibe identities without approval.
6. Which exact outcomes do we require for accessibility checks, and what test environments are available (mobile, keyboard, Swedish voice availability)? Do not invent WCAG conformance proof.
7. **Research scope policy (A/B/C)** — human decision must occur before implementation. This is not a clarifying question for the coding agent to answer on its own.

## G. Official Spec Kit execution contract and review gates
1. **Set up official GitHub Spec Kit** in the independent `condition/spec-driven` work environment, with version/integration logged. This document is currently research-only: **no genuine Spec Kit agent command is marked completed**.
2. **Constitution:** establish explicit rules for independent code, source fidelity, privacy, accessibility, test provenance and student oversight. This is stable project governance.
3. **Specify:** give the final approved relevant sections A–D (plus E only after approved amendment) as the user's natural-language **what/why**. Agent creates authentic `spec.md`, not a copy of this research draft.
4. **Clarify:** ask targeted questions and commit student answers to genuine versioned `spec.md`; eliminate ambiguity before plan.
5. **Plan:** decide exact technologies/architecture, schema, browser UI and deployment in `plan.md`; respect neutral technology-family constraint, don't copy Vibe source/SQL/workflows.
6. **Checklist → Tasks → Analyze:** validate requirements and cross-artifact consistency; produce actionable tasks; correct source specification if analysis finds gaps.
7. **Implement → Converge:** execute actual tasks, record real red/green outputs, repeat only when verified convergence identifies gaps. All code stays in independent SDD branch, not frozen Vibe.
8. **Independent comparison:** run original F01–F15 black-box cases on exact frozen Vibe and SDD snapshots, plus separate EXT-AC cases if approved. Report results and missing evidence honestly; obtain student acceptance of SDD output before claiming final completion.

Official procedure: https://github.github.com/spec-kit/quickstart.html (invocation syntax depends on integration; full path includes constitution, specify, clarify, plan, checklist, tasks, analyze, implement, converge).

## H. Explicit stop and confidentiality boundaries
- **Do not** execute this AI_DRAFT, create SDD implementation code, claim a Spec Kit Constitution/Specify step ran, change SDD auth/provider settings, or silently copy Vibe code based on this research draft alone.
- The independent SDD coding agent **must not read** `research/SDD_INPUT_01_VIBE_RETROSPECTIVE_AUDIT_2026-10-30.md`, the Vibe evidence ledger or implementation source. The researcher/assistant can use those for study and analysis, but must gate the final coding-agent input.
- Before execution: student confirms scope A/B/C, reviews final edited Master Brief and exact agent-facing instructions (English, with full Persian translation in chat). Capture approval verbatim before real Spec Kit actions.
- Original pre-registered acceptance matrix remains unmodified throughout; late additions are tracked distinctly.
