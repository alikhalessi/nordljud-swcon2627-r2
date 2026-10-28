# Nordljud V3 — Isolated Replication Plan (preliminary; not started)

**Decision date:** 2026-10-28. **Status:** Strategy agreed by student; detailed experimental protocol, input pack, tools and executions are not yet frozen.  
**Location:** Coordination document in V2 repository main branch. This is **not** an input to be supplied to either isolated V3 implementation.

## Generations and evaluation roles

- **V1** — Earlier historical Nordljud prototype and experimentation. Evidence only, with incomplete prompt provenance where unavailable.
- **V2-A (Vibe)** — Assisted pilot in `condition/vibe`, using student-approved prompts V-001 onward, with explicit prior-project knowledge and assistant collaboration.
- **V2-B (SDD)** — Assisted pilot in `condition/spec-driven`, same shared initial product/data baseline, actually execute official GitHub Spec Kit workflow; knowledge carryover from V1/V2-A is a disclosed limitation.
- **V3-A (Vibe)** — Fresh private GitHub repo, separate new ChatGPT Project configured with Project-only memory; separate coding agent environment and deployment; replay the frozen, student-confirmed Vibe prompt pack in order. Record every subsequent corrective prompt actually used.
- **V3-B (SDD)** — Another fresh private GitHub repo, a *different* ChatGPT Project with Project-only memory; separate coding environment and deployment. Use equivalent product scope, dataset and independent test expectations, but use the authentic specification-first Spec Kit process, not Vibe prompts disguised as SDD.

V2-A and V2-B must BOTH be completed and honestly evaluated before freezing the inputs for V3. V3 is a more controlled **informed replication**, not a blind, independent first exposure or proof of causal superiority.

## ChatGPT Project setup for V3 (to perform only when V2 closes)

1. Create one project **Nordljud V3 — Vibe** and one **Nordljud V3 — SDD**.
2. In each, choose **Project-only memory** in Project settings; check both settings. Per OpenAI Projects documentation, chats in one project cannot reference chat history or memories outside that project, but can reference conversations within their own project. Changes may take hours to apply.
3. Do not move this V2 discussion, any V1/V2 conversation, prompt-development chat or historical coding logs into either V3 project.
4. **Project-only memory does NOT isolate GitHub, cloud apps, files or external tool scopes.** Configure each agent with access only to its designated new code repository and the common data/brief package. If per-repository restriction cannot be verified, avoid using broad connector lookups in the implementation conversations; supply only their own checked-out repo or approved starter files. Keep unrelated repos private and unlinked.
5. Create each V3 repo from a common **data-only starter**, not by forking/copying a previous full application. Verify common input hashes. Do not include previous code, other method's logs, assistant analyses, or historical solution notes in those starter workspaces.
6. Separate Vercel projects and authentication/database environments. Never share live accounts, keys or saved state between runs; secrets stored in platform settings, not commits.
7. Use the same AI model/version and comparable available coding tools within both methods if feasible; record unavoidable differences. Running Gemini for only one method makes tool/model effects inseparable from method effects.

## Freeze gate / pre-registration before V3

- [ ] V2 Vibe V-001 onward completed; final student-approved prompts exported **verbatim**, including actual fixes.
- [ ] V2 SDD run with actual Spec Kit command/skill evidence, not template-only documents.
- [ ] Define a common classroom product scope, constraints, canonical data input and independent black-box acceptance test matrix.
- [ ] Preserve a neutral, complete **V3-Vibe prompt pack** and an equivalent **V3-SDD product brief**; review and approve both *before* either V3 run.
- [ ] Pin or record model, agent/tool versions, npm/Node/Next versions and reproducibility deviations.
- [ ] Define start/end timestamps for active time, code commits, prompts, real tests, manual observations and predeclared defect categories.
- [ ] Freeze starter snapshots and method-specific permissions. Publish only teacher-safe screenshots/logs; redact tokens/user data.
- [ ] Log trial order and human experience carryover; report limited generalizability.

## Input equality vs method integrity

Common across V3: user-visible features, dataset, technology constraints, evaluation/test procedure, budget limits and human role.  
Different by design: Vibe uses sequential natural-language instructions and observed corrections; SDD uses genuine Spec Kit specification, planning, tasks, implementation and review. Do not force both through the same implementation instructions, or deliver the finished SDD SRS to the Vibe agent.

## Evidence and academic integrity

For each run preserve (1) original prompt/input text and assistant-edit provenance, (2) tool and model identity, (3) timestamp where available, (4) modified files and commit SHAs, (5) actual test outcome incl. failures, (6) deployments/URLs with status, (7) direct student observations, and (8) limitations. No invented screenshots, time measurements, app functionality or absolute independence claims.

**Final presentation:** V1 historical repo plus V2 two-method repo plus **two isolated V3 repos** (four GitHub repos total, organized as three development generations); method-specific Vercel apps; one final SWCON2627 experience report with links, findings and the official 35-mark rubric. Provide instructor read access to private repos; verify deploy visibility separately.

**OpenAI reference:** https://help.openai.com/en/articles/10169521-projects-in-chatgpt
