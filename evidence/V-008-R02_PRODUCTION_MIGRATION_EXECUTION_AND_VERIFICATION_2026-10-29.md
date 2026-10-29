# V-008-R02 Production migration — exact-SHA execution and independent verification
Date (Europe/Helsinki): 2026-10-29
Production project: `rhtrzuoqycdnwcbgctpe` (`nordljud-v2-auth`), PostgreSQL 17, active/healthy.
Source: `database/proposed-migrations/V008_R02_SECURE_CLOUD_SCHEMA_NOT_APPLIED.sql` at `hardening/v008-r02`.
**Source GitHub blob SHA**: `d4940119f84f8b3a4510e032335ae8df7fe1b1f0`.
Explicit student authorization (verbatim): `evidence/V-008-R02_FINAL_PRODUCTION_SQL_APPROVAL_2026-10-29.md`; includes acknowledged limitations of role recovery and no independent encrypted archive.
Backup evidence: `evidence/V-008-R02_LOCAL_BACKUP_RESTORE_EVIDENCE_2026-10-29.md`.

## Execution
- Preflight: 3 target tables absent; pre-existing Favorites=5, Studied=2, Practice History=1, Auth users=1; one prior migration.
- Re-fetched GitHub SQL immediately before execution; exact blob SHA matched user-approved SHA.
- Applied exact fetched SQL **once** using Supabase `apply_migration`, name `v008_r02_secure_cloud_schema` to project `rhtrzuoqycdnwcbgctpe`.
- Supabase provider returned `{"success":true}`.
- Verified database migration entry **`20261029192724 v008_r02_secure_cloud_schema`** exists alongside earlier **`20261029101938 nordljud_v006_private_learning_state`**.

## Independent postflight
- Three new public tables exist: `nordljud_daily_completions`, `nordljud_review_items`, `nordljud_review_sessions`; each 0 rows.
- `pg_class.relrowsecurity=true` on all three.
- A correct explicit `pg_policy` join confirms **4 policies per table, 12 policies total**: owner select/insert/update/delete.
- Privilege matrix: PostgreSQL role `anon` has no SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES or TRIGGER on any of 3 tables. `authenticated` has SELECT, INSERT, UPDATE, DELETE only; none of TRUNCATE, REFERENCES or TRIGGER.
- Existing public row counts **unchanged** at 5/2/1 and Auth user count remains 1.
- First policy-count inspection used a SQL subquery `polrelid=oid` with ambiguous `oid` resolution, incorrectly reporting 0 policies. **This was a verification-query error, NOT a production schema failure.** Corrected `LEFT JOIN pg_policy pol ON pol.polrelid=c.oid`, yielding 4 per table (12 total); no additional DDL applied.

## Outstanding gates
- Actual live two-account owner isolation, unauthenticated Data API negative tests, Google/email confirmation/reset end-to-end, and candidate release routing are **not yet proven**.
- No PR #1/#2 merge, Vercel public promotion, Auth provider/SMTP change, destructive rollback, or additional database migration was performed.
- R02 Production **schema** migration is complete; R02 **full acceptance** is not certified on the basis of this alone. Do not declare Vibe freeze or production readiness without required E2E/security/release evidence.
