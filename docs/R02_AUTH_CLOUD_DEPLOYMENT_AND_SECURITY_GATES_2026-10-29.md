# V-008-R02 — Authentication, migration, and live RLS verification gates

**Status:** SOURCE-ONLY R02 WORK IN PROGRESS. No Auth/Google/SMTP provider setting, Production schema, GitHub release PR or public deployment has been changed.
**Date:** 2026-10-29 (Europe/Helsinki).
**Target:** `nordljud-v2-auth`, Supabase project `rhtrzuoqycdnwcbgctpe` in `eu-central-2`, Vercel `nordljud-r2-vibe`. **Do not treat this as a green-light to modify Production.**
**Parent provenance:** [exact prior R02 approval](../evidence/V-008-R02_STUDENT_APPROVAL_2026-10-29.md) committed on `hardening/v008-r01` as `24e75a1b...` BEFORE any R02 code change. Isolated R02 code branch `hardening/v008-r02` derives from this commit.

## 1. Observed read-only production baseline

- Supabase project status: `ACTIVE_HEALTHY`; migration history has only `20261029101938 nordljud_v006_private_learning_state`.
- Existing `public.nordljud_favorites` (5 rows), `public.nordljud_studied` (2), and `public.nordljud_practice_history` (1) all have RLS enabled.
- New R02 review/completion/session tables **do not exist**; no R02 schema change has been applied. Data volume is an aggregate count; no user-identifying data copied.
- Supabase security advisor flags `auth_leaked_password_protection` **WARN / disabled**, which deserves administrator review but is not proof of a breach.
- Earlier redacted Auth logs showed `validation_failed` / `provider is not enabled`. The exact disabled provider is unverified.
- Vercel `release/vibe` branch tracking was saved by the student in the project UI, but `condition/vibe`→Preview routing has **not passed** because the evidence-only probe hit Vercel's deployment-rate limit. Branch protection for private repository on current GitHub Free remains unenforced.

## 2. Separate future permission: live Auth settings

R02 code approval **DOES NOT** authorize changing Google/Auth/SMTP/redirect settings.

Before requesting a separate permission, record in a redacted checklist (no secrets/PII):
1. Exact enabled/disabled state of **Google** and **Email** providers in Supabase Auth → Providers. If the provider disabled in the logs is not Google, do not assert otherwise.
2. Supabase Auth → URL Configuration Site URL and allowlisted redirect URLs. Proposed **app** callback URLs: `https://nordljud-r2-vibe-sepia.vercel.app/auth/callback` and `https://nordljud-r2-vibe-sepia.vercel.app/auth/reset`; keep other legitimate live origins only if individually verified. Do not blindly allow all Vercel Preview domains.
3. For Google OAuth, verify that the Google Cloud OAuth client is configured with the **Supabase** provider callback URI appropriate to the actual project (as documented by Supabase), not the app callback directly; check client ID and secret exist **without reading/printing their values**.
4. Email/confirmation delivery and necessary SMTP configuration and rate limits; no sending to real user addresses during diagnosis without authorization.
5. Produce an exact before/after setting proposal and recovery steps. Receive separate user approval before any actual live change.

After authorization, verify sign-up, confirmation, sign-in, Google OAuth/PKCE, password recovery, sign-out, session expiry and return origin in a real browser using explicitly authorized test identities. False-positive browser/Provider PASS is prohibited.

## 3. Separately gated review schema candidate — SQL NOT APPLIED

[Version-controlled reviewed SQL candidate](../database/proposed-migrations/V008_R02_SECURE_CLOUD_SCHEMA_NOT_APPLIED.sql) defines:
- `nordljud_daily_completions` (user_id, exact level/day/algorithm version)
- `nordljud_review_items` (user_id, exact level/verb/meaning and due/review data)
- `nordljud_review_sessions` (user_id, session IDs, 7/14-day scores, JSON question results length equal to `total`).

The candidate has three `auth.users` foreign keys, unique owned keys, constraints, `anon` revocation, `authenticated` CRUD grants and **explicit owner RLS** for SELECT/INSERT/UPDATE/DELETE. UPDATE includes both `USING` and `WITH CHECK`; no `service_role` credential goes to browser code. Source tests are **not proof** that Postgres policies work in a deployed environment.

**Specific required approval before Production:** the user must explicitly approve executing the **exact reviewed SQL file**, against the **named Supabase Production project ref**, with a stated backup/rollback approach and a chosen supported migration workflow. Merely approving R02 source changes did not authorize the database action. Do not invent a timestamped Supabase migration file or claim it was applied in migration history without using the supported CLI/MCP migration process in a separately authorized environment.

**Staging when available:** prefer an authorized local database or pre-existing isolated test environment. Never create paid Supabase branch/infrastructure unilaterally. Do not run migration SQL against `rhtrzuoqycdnwcbgctpe` during this R02 branch implementation.

## 4. Concrete mandatory two-account RLS test protocol (NOT EXECUTED)

Provision **two separately authorized test users**, A and B, in a sanctioned test environment with realistic `authenticated` Supabase JWTs. Do not reuse one test session or a service-role role for cross-user checks.

| Test | A's authenticated client | B's authenticated client | Anonymous client |
|---|---|---|---|
| Insert own completion, reminder, review session | succeeds and re-fetches | not applicable | forbidden |
| SELECT A's record by known ID/unique key | succeeds | returns zero rows or appropriate access denied | forbidden |
| UPDATE A's own reminder | exactly one affected row | zero affected or denied | forbidden |
| DELETE A's own session or reminder | exactly one affected row | zero affected or denied | forbidden |
| INSERT with `user_id=A` from B | not applicable | denied by RLS `WITH CHECK` | denied |
| UPDATE B's record by reassigning `user_id=A` | not applicable | denied by `WITH CHECK` | denied |
| Sign out A; sign in B on same browser | no stale A data leaks | only B's state loads | no private records |
| Existing favorites/studied/history before/after | original data preserved | user-scoped | private |

Capture **real redacted REST/SQL results and time, source SHA, deployment identity**, with no tokens, email addresses, or sensitive account data in GitHub. Verify Data API grants *and* RLS, not only SQL text. Test exact two senses of `sticka` separately. Confirm zero-row PostgREST UPDATE/DELETE is reported as failure rather than "Saved". If two accounts or test environment cannot be used, retain **BLOCKED / NOT TESTED**.

## 5. Recovery and rollback

- **Code rollback** means restoring a previously accepted READY Vercel deployment SHA under a separate user-authorized release action. It **does not** revert database schema or already-written data.
- Use additive schemas where possible so previously released V-008 code stays functional. Take an approved backup/snapshot before Production migration. Identify the rollback behavior of old/new app code against existing and new tables before deciding whether a rollback is safe.
- Never run `DROP TABLE` or delete any user records automatically as rollback. A destructive schema rollback requires separate user approval and a tested backup/restore plan.
- A live OAuth/redirect rollback restores the exact previous provider/URL settings, previously recorded without secrets; avoid losing legitimate redirect allowlists.

## 6. R02 stop and research criteria

R02 source/CI completion is separate from live deployment completion. Keep these statuses individually:
- `PASS`: source unit tests with authentic RED/GREEN, TypeScript, build, optional static SQL checks;
- `PENDING APPROVAL`: live Auth/provider changes and Production SQL migration;
- `BLOCKED`: two-user live RLS, real OAuth/email paths, signed-in cloud storage prior to deploying schema;
- `PENDING`: student human acceptance of R02, future branch-routing verification before Vibe Freeze.

Do not merge R01 PR #1, publish R02 code, start R03/V009, alter independent SDD or frozen learning content. Always include the user's exact permission boundary.
