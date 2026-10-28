# Comparison protocol — approved baseline, before implementation

## Research question
In a second, informed iteration of Nordljud, how do **iterative Vibe Coding** and **GitHub Spec Kit-supported Specification-Driven Development** differ in the clarity of requirements, development evidence, observed defects, quality-gate outcomes, and delivered user experience?

## Conditions and scope
A = natural student-approved prompts and feedback-driven increments; B = actual official Spec Kit agent workflow (constitution → specify/clarify → plan → tasks → implement → converge) with review checkpoints. No God Mode. Both start from the same shared baseline, frozen teaching data and common product goal. Different codebases. The historical prototype and pilot may inform the **student's understanding**; previous app code/tests must not be used as implementation templates for either method.

## Controls
- Same approved classroom scope and datasets; maintain a common requirements-change log for any late changes.
- Same target technology families and security boundaries; document exact dependency versions and where unavoidable differences occur.
- Same external independent acceptance matrix recorded **before** either method's first implementation commit.
- Keep automated test harness separate from the prompt inputs; do not bias Vibe by injecting a finished SDD specification.
- Preserve Git commit provenance, prompt timestamps (when available), red runs, false test assumptions, screenshots, review decisions, and deployment blockers.
- Use separate environment configuration and namespaced/isolated state; never commit credentials.

## Student oversight and prompt provenance
Each **Vibe** prompt is drafted for review in ordinary English close to the student's own voice. Only the actual student's confirmed final text is sent to an agent, and only that exact executed text receives an execution record. Assistant-authored drafts are labelled as such. SDD AI inputs and outputs are recorded with the real agent identity; never claim interactive Copilot commands were executed unless their logs show that.

## Assessment and limitations
PASS/FAIL/BLOCKED/NOT TESTED per test per condition, based on actual evidence; a successful build is not acceptance or security proof. Test suites differ only where a method-specific requirement is explicitly noted. Do not add code to frozen versions after comparative testing without recording a new snapshot. Report informed-design bias, order effects, missing active-time measurements, and unverified external OAuth or privacy claims. No causal generalization or guaranteed grade.

## Workflow order
1. Preserve the approved charter, baseline data and test matrix; freeze a single baseline commit SHA.
2. Create both condition branches **at precisely the same SHA**.
3. Obtain student approval for V-001 before any Vibe coding or execution.
4. Run Vibe prompt-by-prompt, recording prompts, results, corrections and defects.
5. Run official Spec Kit with a supported coding agent on the independent SDD branch, recording actual commands, stages and approvals.
6. Run common black-box tests against frozen snapshots; retain failing outcomes.
7. Assemble the seven-section Moodle experience report from artifacts, noting every missing source.
