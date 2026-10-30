<!--
Sync Impact Report
Version: unversioned stock template -> 0.1.0 (initial, unratified Constitution draft).
Principles: five unnamed sample slots replaced by I-VIII below; no adopted policy removed.
Added: source fidelity; source limitations; account ownership; Guest/accessibility;
real verification; independent research; separate evaluation; human oversight;
scope constraints; review gates; adoption and amendment rules.
Removed: illustrative stock text and unexplained template placeholders only.
Updated: .specify/templates/plan-template.md (project branch and Constitution gates).
Updated: .specify/templates/spec-template.md (scope, traceability and observable checks).
Updated: .specify/templates/tasks-template.md (required verification and genuine failures).
Updated: .specify/templates/checklist-template.md (requirements review vs runtime evidence).
Updated: README.md (current Condition B draft/review pointer; historical label retained).
Reviewed unchanged: .specify/templates/constitution-template.md (generic initializer).
Not present: .specify/templates/commands/ and docs/quickstart.md.
Reviewed unchanged: AGENTS.md and approved neutral inputs; historical labels retained.
Hooks: .specify/extensions.yml absent at pre-execution check; no hook executed.
Deferred: TODO(RATIFICATION_DATE) requires explicit student approval of the reviewed draft.
Evidence: evidence/sdd-constitution-2026-10-30/README.md.
This report records this Constitution skill execution, not later stage or runtime results.
-->
# Nordljud Condition B Constitution

**Status:** DRAFT — generated for student review; NOT RATIFIED.
**Drafted:** 2026-10-30 (Europe/Helsinki).

## Core Principles

### I. Exact Source and Sense Fidelity

Nordljud MUST retain A2, B1, B2 and C1, exactly 456 sense records and 455 distinct written
verb spellings per level: 1,824 level-specific sense records in total. The two `sticka`
meanings MUST remain separately identifiable in selection, favorites, practice and any
extension state. Level changes MUST preserve a legitimate sense match or explain its absence.

The frozen teaching inputs identified in `shared-content/SOURCE_MANIFEST.md` MUST remain
unchanged. The application MUST use supplied Swedish/English examples and five verb forms
where present. Missing, blank, placeholder or editorial em-dash fields MUST NOT become
invented forms, translations, example sentences or usable answer keys. Future verification
MUST check counts, sense identity, source linkage and missing-field behavior against exact
source blob IDs. This rule is a requirement; this draft does not claim those tests ran.

### II. Honest Educational and Source Claims

Documents and product behavior MUST disclose material source gaps. The historical teaching
inputs are not Swedish-teacher-certified; original PDFs, licenses and educational accuracy
have not been independently revalidated by this stage. No artifact may claim certification,
measured learning effectiveness or verified publication rights without corresponding evidence.
Publication of teaching data MUST wait for authorized rights and accuracy review. Optional
illustrations MUST have sense-specific relevance and documented usage rights; unavailable
media MUST have a usable fallback and actual coverage MUST be reported.

### III. Server-Enforced Ownership and Minimal Exposure

Every supported account-owned record MUST be protected on the server for read, create,
update and delete using the authenticated owner's verified identity. UI hiding is insufficient.
The later Plan MUST identify the enforcement mechanism and negative cross-account cases;
authorized tests MUST demonstrate that one legitimate user cannot access another user's data.
Unauthorized or expired sessions MUST fail safely without disclosing another account's state.

Service-role credentials, elevated keys and authentication secrets MUST NOT appear in browser
code, public bundles, Git or evidence. Tests MUST use authorized identities and minimal
synthetic records, with secrets and personal data redacted. Guest and account state MUST NOT
be silently mixed. This principle does not authorize provider setup or database operations.

### IV. Usable Guest Learning and Accessible Essential Flows

The essential learning path MUST work without sign-in. A feature specification MUST define
which Guest records survive same-browser refresh, their clearing boundaries and any deliberate
sign-in transfer before implementation; unresolved details MUST be clarified with the student.
Unavailable authentication, cloud persistence or speech MUST produce truthful, actionable
feedback while preserving the supported Guest reading/practice path.

Essential study, navigation and login controls MUST work with keyboard alone and a narrow
mobile viewport, with visible focus, meaningful labels and readable feedback. Specifications
MUST define observable checks and test environments. Swedish speech MUST request `sv-SE`
when supported and disclose unavailability otherwise. Comprehension and verb-form practice
MUST distinguish correct, incorrect and revealed answers; incorrect/revealed answers earn
no correctness credit. Self-reported completion MUST NOT imply verified language mastery.
Accessibility or device support MUST NOT be claimed beyond the environments actually tested.

### V. Reproducible Verification and Genuine Failure Evidence

Behavior-changing implementation MUST start from reviewed acceptance cases and appropriate
tests. For behavior that can be automated, record a real failing run before implementing the
behavior, then retain the passing run and relevant regression results. Source fidelity,
missing fields, wrong answers, unavailable dependencies, persistence and ownership boundaries
MUST have suitable positive and negative checks. Manual-only behavior MUST have a reproducible
procedure and an explicit limitation; automation MUST NOT be claimed where none ran.

Evidence MUST retain exact commands, outputs/exit codes, environment, versions, expected and
actual outcomes, source/tested commit SHAs, failures and corrections. A setup error or faulty
test assumption MUST be labeled as such, not presented as a product defect or a completed
test-first RED cycle. Typecheck/build/CI success, an OAuth redirect, source inspection or a
deployment READY indicator alone MUST NOT establish runtime, authentication or security PASS.
Unavailable tests MUST remain BLOCKED or NOT TESTED, with their reason.

### VI. Independent Construction and Research Honesty

Work MUST remain on `condition/spec-driven`. Only neutral shared inputs and current SDD
documents may inform construction. Agents MUST NOT inspect or copy Vibe application code,
tests, SQL, design, screenshots, fixes, release scripts, ledgers or retrospective evidence,
including through another branch or Git history. Hash-only ref checks do not authorize
opening that branch's content. Main, Vibe, research and freeze refs MUST NOT be modified.
The Vibe freeze anchor MUST remain `0b5a4a58631503c3a454ecc36d62b892c569ef14`.

Research records MUST disclose this informed second iteration, prior learning, sequential
order, SDD's advance knowledge of late extension outcomes and actual coding-agent differences.
Unknown agent/model identities, timing, costs or measurements MUST be labeled UNKNOWN or
unmeasured. These observations MUST NOT be used to assert a causal superiority conclusion.
Historical labels, prompts, approvals and failures MUST remain intact; add dated evidence
instead of rewriting them to imply an earlier approval or execution.

### VII. Separate Primary and Secondary Evaluation

The unchanged `evaluation/ACCEPTANCE_MATRIX.md` F01-F15 contract is CORE/PRIMARY with N=15.
EP-B-001 E01-E07 map one-to-one to EXT-AC01-EXT-AC07, EXTENDED/SECONDARY with N=7.
These suites MUST keep separate specifications, acceptance mappings, counts and denominators;
no blending, renumbering, reweighting or retrospective expansion of the primary benchmark is
permitted. Partial coverage MUST NOT be reported as a full-case PASS.

Each case MUST have exactly one reported status: PASS (all stated observations evidenced),
FAIL (executed with a contradictory observation), BLOCKED (a named prerequisite prevents
execution/completion), or NOT TESTED (no sufficient execution evidence). Every status MUST
identify its exact tested SHA, environment and evidence or missing prerequisite. Summaries
MUST report all four status counts against the suite's fixed denominator. Unit-test totals
MUST NOT substitute for acceptance-case results. Unavailable external services do not remove
cases from either denominator. Frozen application evaluation is not performed by this draft.

### VIII. Genuine Stages, Explicit Authorization and Human Oversight

The installed official GitHub Spec Kit 0.12.11 Codex skills MUST be followed for the authorized
stage, with actual inputs, outputs and session provenance retained. Installation, login,
initialization and preflight MUST NOT be labeled completed agent stages. Skill execution is
performed by the agent following its instructions, not by inventing a shell Constitution
command or a transcript. Never run the bundled multi-stage workflow.

Each authorized stage MUST stop at its human review checkpoint. This session authorizes only
the Constitution, necessary template/guidance synchronization and new evidence. It MUST stop
after presenting the draft and diff. Specify, Clarify, Plan, Checklist, Tasks, Analyze,
Implement and Converge require their relevant later authorization; none is executed here.
Hooks MUST be inspected before use; a hook or required action outside authorized scope MUST
be reported and not run. No payment, API billing, cloud migration, provider configuration,
Supabase operation, deployment, publication, merge or ref update is authorized by this stage.

## Scope and Research Constraints

The approved charter, shared product brief, source manifest, acceptance matrix and experiment
protocol govern the common outcome scope. MBR-B-002 and EP-B-001 provide reviewed WHAT/WHY
inputs, not an imported implementation or a substitute for genuine Spec Kit artifacts.
`docs/sdd-input/SDD_002_VERBATIM_APPROVAL_BEFORE_SPECKIT_2026-10-30.md` records the later exact
approval; older AI_DRAFT/not-yet-approved labels in the immutable documents remain historical.

Protected Git blob identities MUST remain:

| Approved input | Git blob SHA-1 |
| --- | --- |
| MBR-B-002 | `61e4f31ea150c827c92ecf785677c56af45ce04f` |
| EP-B-001 | `8e45c7d20a8039491dcc91afc9e6c5cc0f270394` |
| Verbatim SDD_002 approval | `d00a5bac308b182dcd5fc99f290089a9d15d26e5` |

Working-copy bytes MUST be preserved during this stage. When Git checkout converts LF to
CRLF, raw file hashes and normalized Git blob hashes MUST be distinguished explicitly;
normalization for verification MUST occur in memory without rewriting approved inputs.

Technology families remain Next.js, React, TypeScript, Supabase, GitHub, Vercel and browser
speech synthesis. Exact versions, schema, architecture, storage mechanisms and layout belong
to the independently reviewed Plan. Paid features, AI chat tutor, speech recognition/scoring,
admin/social features, large new curricula, production localization, Android/native work,
PWA/push notifications and scheduled notification delivery are outside this authorized scope.
No service access, subscription or provider setup may be inferred from a technology name.

## Development Workflow and Quality Gates

1. Before each stage, record branch, clean/known working-copy status, exact HEAD, agent/skill
   identity, available model/session reference and input blob checks. Stop on wrong branch,
   unavailable access/skill or incorrect approved inputs; never discard existing work.
2. Present this Constitution and diff for explicit student approval. Pending ratification is
   a gate: no Specify or later stage may begin on the strength of this draft alone.
3. When separately authorized, follow Constitution -> Specify -> Clarify -> Plan -> Checklist
   -> Tasks -> Analyze -> Implement -> Converge. Retain genuine stage records and review
   decisions. CORE specification, plan and acceptance cases MUST be approved before CORE
   implementation. The approved extension input does not waive review of its later artifacts.
4. Resolve MBR-B-002's open Guest, sense-match, completion, recovery, provider/test-environment
   and extension questions in the relevant later clarification. Do not silently choose them
   during Constitution. EXTENDED scope follows CORE through its own versioned feature path.
5. Every later plan MUST explicitly check Principles I-VIII before research and after design.
   Specs and tasks MUST map acceptance IDs to observable cases, tests/evidence, authorization
   dependencies and honest limitations. Complexity notes cannot waive immutable inputs,
   truthfulness, ownership, research isolation or the fixed primary benchmark.
6. Freeze a reviewed SDD snapshot only with separate authorization. Evaluate exact frozen SHAs
   against unchanged primary cases and the separately reported secondary suite. Preserve raw
   failures and missing evidence; do not repair a frozen build without recording a new snapshot.

## Governance

This is the initial Constitution draft, version 0.1.0, not evidence of student ratification.
TODO(RATIFICATION_DATE): record the real ISO approval date only after explicit student review
of this document and its diff. No adoption date is invented from the earlier product approval.
The first ratified release is 1.0.0; record the reviewed content hash, exact approval wording,
approver, date and commit provenance, without implying this uncommitted draft has a commit.

Once ratified, this Constitution governs SDD artifacts alongside current user authorization
and `AGENTS.md`. Conflicts MUST be reported before affected work proceeds; a plan's exception
table or checklist tick cannot amend governance. Every substantive stage review MUST check
compliance and identify unresolved violations rather than asserting an unsupported pass.

Amendments MUST state their reason, affected principles/acceptance IDs, version change,
compatibility or migration consequences and template synchronization. Preserve the old
version and approval chronology in Git/new evidence, present the diff, and obtain explicit
student approval before adoption. MAJOR changes remove/redefine obligations incompatibly;
MINOR changes add or materially expand compatible obligations; PATCH changes clarify without
changing obligations. Ambiguous changes require a stated rationale at review. Amendments
MUST NOT rewrite the pre-registered primary benchmark or erase historical evidence.

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE): pending student approval | **Last Amended**: 2026-10-30
