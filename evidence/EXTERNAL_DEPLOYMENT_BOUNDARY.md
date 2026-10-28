# External deployment dependency and human verification — decision record

**Date:** 2026-10-28 (Europe/Helsinki).  
**Provenance:** Assistant-proposed research-operational guidance in response to student question before execution of V-003; not an SDD implementation or a Spec Kit command execution.

## Issue
A coding agent may have no authorized Vercel access or may be unable to automate deployment. External account control must not be silently bypassed or mistaken for app-development failure.

## Neutral operations protocol proposed for both methods
1. **Common target:** a runnable and demonstrable Nordljud app, reproducible deployment target, same feature and acceptance scope in each method.
2. **Access boundary:** no agent should access Vercel, secrets, Supabase or unrelated repositories without explicit scope and permission. Where absent, label the operation `HUMAN_REQUIRED`, never invent access or action completion.
3. **Deployment plan:** record Git source/branch/commit, project name, environment-variable names **without values**, approved actor, success criterion and how deployment result will be checked.
4. **Implementation:** agent may prepare deployable Next.js code and verify CI; the student may operate Vercel Dashboard (including manual Git-reference deployment) or configure Git integration under their own account. No credentials should be committed.
5. **Evidence gate:** capture actual commit SHA, actual Vercel build status, actual deployment alias/domain, errors, who clicked/approved and time if measured. `READY` is not browser/audio acceptance. If external access is blocked, report `BLOCKED` rather than success.
6. **Method comparison:** apply equivalent Vercel permission conditions in V3 Vibe and V3 SDD. Differences in when each process discovers dependency/branch requirements are observable outcomes, not preordained successes.

## Proposed SDD treatment (not yet executed)
- `specify`: include externally deployed working app and observable acceptance constraints.
- `plan`: define boundary/ownership, branch configuration, environmental dependencies, secrets handling and manual fallback.
- `tasks`: create explicit dependency/approval task and deploy verification task with acceptance conditions.
- `implement`: prepare application and run available checks without impersonating a privileged Vercel actor.
- `converge`: assess deployed/tested evidence; report blocked gates honestly.

These are planning recommendations, **not evidence of invoking official Spec Kit**. The real V2 SDD attempt must record actual agent, tool and stage outputs later.

Official references: https://github.com/github/spec-kit ; https://vercel.com/docs/git ; https://vercel.com/docs/deployments

## Reuse in V3
Share only this neutral deployment *constraint* and the same manual-operator/evidence policy where relevant. Do not copy V2's specific wrong-branch diagnosis, code, corrections or Vercel identities into isolated V3 agents. The student knows the historical problems, an acknowledged experiment limitation.
