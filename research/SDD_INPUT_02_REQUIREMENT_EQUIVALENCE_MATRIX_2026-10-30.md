# Nordljud Round 2 — Requirement Equivalence and Experiment Leakage Matrix
**Date:** 2026-10-30 Europe/Helsinki  
**Status:** OPTION C SCOPE POLICY **STUDENT APPROVED** 2026-10-30; revised Master MBR-B-002 and EP-B-001 exact texts remain **AI_DRAFT / STUDENT APPROVAL PENDING**  
**Source precedence:** 2026-10-28 original PC-001, shared `PRODUCT_BRIEF`, immutable `SOURCE_MANIFEST`, pre-implementation `ACCEPTANCE_MATRIX` F01–F15. Then *later* Vibe user-approved increments **only as evidence of scope change**, not as automatically symmetric requirements. The Vibe frozen snapshot remains untouched.

## Classification key
- **CORE:** explicit original common product goal or pre-registered independent F01–F15, MUST be in SDD baseline; correct behavior specified, not Vibe's exact solution.
- **CORE-QUALITY:** fair implied quality/security/handling of source gaps of a CORE obligation; describe outcome/acceptance, not copied algorithm.
- **LATE-PRODUCT:** Vibe-added user feature absent from original common brief/test matrix; candidate for controlled amendment and secondary comparison ONLY after student approval.
- **LATE-PRESENTATION:** non-essential Vibe-specific UI/navigation/photography/design decisions; do not prescribe them to SDD.
- **PROCESS/EVIDENCE:** test/release/approval methodology; apply equivalent outcome controls to both, not Vibe's scripts or migration.
- **EXCLUDED:** unsupported/never-approved scope; do not insert into SDD.

## 1. Feature-to-source mapping (pre-registered PRIMARY comparison)
| ID | Product / measurable outcome | Prior neutral source | Vibe evidence progression | SDD scope / non-contamination rule |
|---|---|---|---|---|
| F01 | Four independently selectable CEFR levels A2/B1/B2/C1; one distinct source-backed mission each | Brief + F01 | V001 | **CORE**; no Vibe component or copy |
| F02 | Preserve authentic Swedish mission examples with English assistance; reveal/hide translation | Brief + F02 | V001, V002 | **CORE**, never generate unseen Swedish sentences |
| F03 | Browser Swedish pronunciation with graceful unavailable status | Brief + F03 | V001/V002-F01 feedback | **CORE**, not prescribe the Vibe speech hook or audio UI |
| F04 | Two independent comprehension and verb-form correctness checks, proper wrong-answer feedback/scoring | Brief + F04 | V001/V004 + correction | **CORE**, any interface satisfying same black-box case |
| F05 | Complete per-level lexicon of **456 semantic senses**, 455 written spellings, search/select, five verb form slots when present | Brief + F05 + SOURCE_MANIFEST | V002 | **CORE**; preserve exactly 1,824 level-sense records |
| F06 | Two `sticka` meanings represented separately, do not lose semantic identity | Brief + F06 | V002, V004/F02, V007 | **CORE**; unique identity includes sense meaning |
| F07 | Switch level and retain selected semantic verb when available, show level-specific examples | Brief + F07 | V003, V007 | **CORE**, no Vibe UI pattern mandated |
| F08 | Guest access without login, bounded appropriate browser-local learning state across reload | Brief + F08 | V001, V006/F03, V008 | **CORE**, exact persistence boundary and cross-account privacy must be clarified pre-implementation |
| F09 | Email/password registration, invalid credentials, sign-in/out, safe recovery where required | Brief + F09 | V005, V008/R02 | **CORE**, real provider/config test required; recovery is an additional UX/security refinement, should not silently change F09 baseline |
| F10 | Google OAuth hosted sign-in and correct hosted return (never localhost) | Brief + F10 | V005, R02, V009 | **CORE**; require legitimate callback/origin and no wildcard, but do not paste Vibe allowlist code |
| F11 | Favorites and studied/progress saved owner-privately, after refresh/re-login; practice activity/history as in brief | Brief + F11 | V006 | **CORE**, restore across sessions; backend schema choice belongs Plan |
| F12 | Two users cannot read/modify each other's records; server-enforced authorization | Brief + F12 | V006 and R02 migration | **CORE/SECURITY**; real negative two-user test; do not copy Vibe SQL |
| F13 | Keyboard-accessible and responsive narrow-view navigation/login | Brief + F13 | V006/F02, V008 | **CORE/NFR**; specific accordion/tab behavior not predetermined |
| F14 | No privileged browser-exposed secrets; meaningful failures; source accuracy/privacy | Brief + F14 | V005, V007, R02 | **CORE/NFR**, sensitive invalid provider conditions must have graceful UX |
| F15 | Exact-SHA reproducible install/tests/build and record version/commit; independent acceptance outcomes | Baseline + F15 | Every stage, R01/R03/V009 | **PROCESS/EVIDENCE**, not mandate Vibe's workflow file |

Note F05: “456 entries” is **456 senses per level, not 456 unique written verbs**. The 2 `sticka` entries are distinct meanings. The four shared dataset blob SHAs and original mission seeds must be reused byte-for-byte under original `SOURCE_MANIFEST` provenance.

## 2. Vibe-derived refinements and feature expansion (SECONDARY comparison only unless explicitly amended)
| Item | Origin and classification | Evidence-based observed requirement, **not Vibe implementation recipe** | Proposed disposition |
|---|---|---|---|
| Five verb forms and missing-data treatment | Shared brief + V002/V007. **CORE-QUALITY** | Show available five form slots; do not hallucinate missing forms, `—` and empty placeholders are unavailable, never correct-answer text. Preserve real source limitations. | Include in SDD spec as data-integrity criteria |
| Contextual homographs and distractors | Shared F04/F06/F07 + V007. **CORE-QUALITY** | Questions must disambiguate context/sense; scoring must never reward a reveal or missing placeholder. | Include as objective acceptance, not Vibe practice engine |
| Favorites remove, studied toggle, history removal | V006 user requirement layered atop original progress. **CORE refinement** | Allow user to manage owner records, not just create; avoid accidental cross-user data contamination. | Include under F11/F12, document granularity |
| Password reset with protected callback and PKCE | V008-R02 late hardening of F09/F10. **CORE-QUALITY / security** | Auth must have safe redirect/session handling and appropriate recovery support without exposure. | Include outcome; provider details / implementation technique in Plan |
| Text-to-speech for forms/sentences | V002-F01 refinement of F03. **CORE-QUALITY** | Pronounce authentic Swedish text when available, show unavailability when not. | Include outcome, do not require Vibe control placement |
| Cross-level comparison cards UI | V003 feature refinement of F07. **PRESENTATION** | Student should be able to compare current sense examples by level, but not copy exact split-pane UI. | Core behavior; UI free |
| Visual photos (26 photographed action/sense records) | V004-F02/F03 **LATE-PRODUCT/PRESENTATION** | Optional photo illustrating a specific meaning; rights/provenance and misleading depiction must be evaluated. | **OPTIONAL SECONDARY**, not part of primary benchmark |
| Exact accordion→tabs layout, nested navigation | V006-F01/F02/F03 **LATE-PRESENTATION** | Navigation must remain legible and not push essential content out of reach; user path efficient. | Specify usability outcome only, not Vibe layout |
| Three deterministic daily micro-lessons | V006-F04 **LATE-PRODUCT** | A small day-based set of source-backed learning items distinct from permanent fixed missions. | **OPTIONAL SECONDARY** only if both conditions get the same amended brief |
| Placement of Today's Lesson in Your Learning | V006-F04-F01 **LATE-PRESENTATION** | Daily learning should be findable, selected content recoverable after navigation. | UI freedom; avoid prescribing exact Vibe tabs |
| Daily Archive reconstructed from historical dates | V008 **LATE-PRODUCT** | Past deterministic daily lesson lookup; do not invent historical attendance. | **OPTIONAL SECONDARY**, versioned amendment required |
| Explicit `Mark completed` / Undo | V008 **LATE-PRODUCT** | Completion is a self-report, not automatic proof of mastery; reversible. | **OPTIONAL SECONDARY**, separate from core progress |
| Remind Me Later and snooze | V008 **LATE-PRODUCT** | Explicit user-managed review intent per exact sense; no unsolicited push. | **OPTIONAL SECONDARY** |
| Seven-/fourteen-day recall quizzes | V008 **LATE-PRODUCT** | Source-grounded spaced review with transparent eligibility, real questions and correct score. | **OPTIONAL SECONDARY** |
| Cloud persistence for daily/archive/review | V008 + R02 **LATE-PRODUCT** | If late extensions approved, signed-in data must obey the same F12 owner isolation and not leak to Guest. | Secondary extension, no copied Vibe schema |
| Controlled CI/preview/production routing | R01/R03/V009 **PROCESS/EVIDENCE** | Independent code SHA, safe preview and no automatic premature public release. | Apply outcome symmetrically; no copied GH workflow |
| Android app / PWA push / scheduled notifications | Student future idea during F04, **EXCLUDED** | Not implemented in Vibe frozen research snapshot. | Keep out of initial SDD |
| Large generative AI chat tutor, social features, payments, speech recognition | Explicit shared product exclusion, **EXCLUDED** | Not pre-approved classroom MVP. | Keep out |

## 3. Decision options for fair Vibe vs SDD comparison
- **Option A — Strict baseline only:** SDD implements only original **CORE F01–F15** and source-necessary quality criteria. The final Vibe has extra features, so compare F01–F15 as PRIMARY and report extras as Vibe scope drift. Scientifically cleanest primary comparison, but not identical full delivered scope.
- **Option B — Full feature parity:** Approve an explicit **dated late-scope amendment** adding visual photos and all Daily/Archive/Review features to SDD. This can compare whole-product feature coverage, but the SDD method receives an advantage of knowing the future feature set; disclose **informed-order effect** and don't claim equal initial information.
- **Option C — Two-layer comparator (RECOMMENDED):** SDD receives a **primary immutable CORE F01–F15 specification** before any coding, plus a **separate, versioned, explicitly student-approved SECONDARY parity extension** (e.g. daily/archive/review/photos) with its own acceptance cases and denominator. Track CORE-only and EXTENDED-PARITY results distinctly; don't quietly add feature requirements during implementation. The secondary specification is approved before the SDD agent implements that extension; never supply Vibe's technical solutions.

**Student decision: Option C APPROVED.** Verbatim exact approval recorded at `research/SDD_INPUT_04_OPTION_C_STUDENT_APPROVAL_2026-10-30.md` **before** the Master revision. The original benchmark F01–F15 remains immutable. Draft Master is `research/SDD_INPUT_03_MASTER_REQUIREMENTS_BRIEF_AI_DRAFT_2026-10-30.md` (MBR-B-002); separate secondary amendment `research/SDD_INPUT_05_EXTENDED_PARITY_AMENDMENT_AI_DRAFT_2026-10-30.md` (EP-B-001), with EXT-AC01–EXT-AC07. **Neither document's exact text is yet approved or executed.**

## 4. Independence guard and implementation handoff
- Human researcher may review Vibe prompts, bugs and source-quality flags for audit and bias disclosure. **The independent coding agent must NOT receive `evidence/PROMPT_LEDGER.md`, Vibe code, Vibe migration SQL, screenshots, Vibe test implementations or this comparison audit as its implementation reference.**
- Give SDD agent only: original neutral charter/brief/source manifest and actual data, original F01–F15 criteria, student-approved objective CORE and optionally SECONDARY requirements, and explicit tech/budget/deployment boundaries.
- Official GitHub Spec Kit `specify` develops *what/why* and deliberately postpones *how* to `plan`. Core requirements, security constraints and measurable acceptance must be reviewed before implementation.
- Run the SAME independent black-box F01–F15 scenarios for both frozen snapshots; honest statuses per case. External provider credentials and multi-account RLS test access must be documented for each condition. No unverified PASS for either one.
- For any new scope amendment, log who requested it, when, before/after SDD implementation, and which results are unaffected. Do not overwrite the preregistered matrix.

## 5. Remaining decision before real SDD execution
**Completed:** student expressly chose **Option C** on 2026-10-30; preserve their exact message and original artifacts. **Still required:** student reviews/approves exact English Master MBR-B-002 and separately the E01–E07 extension text EP-B-001 before either becomes an agent execution input. Constitution/Specify and all official Spec Kit commands remain NOT RUN; `condition/spec-driven` branch and frozen Vibe remain unchanged. Any subsequent Clarify decisions must be dated, logged and applied symmetrically where relevant.
