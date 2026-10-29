# V-008-R02 — Conditional Production Migration Authorization and Hard Backup Gate
Date: 2026-10-29 (Europe/Helsinki).
STATUS: **BLOCKED — BACKUP RECOVERY EVIDENCE NOW DOCUMENTED; ORIGINAL PRODUCTION AUTHORIZATION CONDITIONS STILL REQUIRE RESOLUTION.**
Repository: `alikhalessi/nordljud-swcon2627-r2`, isolated branch `hardening/v008-r02`, Draft PR #2.
Supabase Production project: `rhtrzuoqycdnwcbgctpe` (`nordljud-v2-auth`, Free tier).
Approved scope **conditional only**: 3 new tables and required indexes, constraints, least-privilege client grants, 12 owner-RLS policies, registered once via supported Supabase `apply_migration` when all gates are proven.

## Exact student message: authorization conditioned on both placeholders being resolved
> I authorize the execution of the **final reviewed V-008-R02 secure cloud schema migration** against Supabase Production project `rhtrzuoqycdnwcbgctpe`, subject to these conditions:
>
> - The revised SQL file and its exact GitHub blob SHA are identified and explicitly reviewed: `[FINAL_REVISED_SQL_SHA]`.
> - A complete recoverable pre-migration backup is verified: `[BACKUP_EVIDENCE]`.
> - The migration creates only `nordljud_daily_completions`, `nordljud_review_items`, and `nordljud_review_sessions`, with their necessary indexes, constraints, least-privilege grants, and 12 owner-based RLS policies.
> - The existing Favorites, Studied, and Practice History tables and user data remain unchanged.
> - Execute once using the supported Supabase migration mechanism, record the actual migration history, and independently verify the resulting schema, privileges, and RLS.
> - Stop and report any failure. Do not perform destructive rollback without separate authorization.
>
> This authorization does not permit GitHub PR merges, public deployment, live Authentication/Google/SMTP changes, or starting R03/V-009.

**Permission interpretation:** Conditional approval does NOT permit executing an unspecified SQL revision or without an independently verified recoverable backup. The current required conditions are not yet both satisfied. No execution is authorized by implication.

## Revised SQL identity and security corrections
- Exact path: `database/proposed-migrations/V008_R02_SECURE_CLOUD_SCHEMA_NOT_APPLIED.sql`.
- Exact **GitHub blob SHA**: `d4940119f84f8b3a4510e032335ae8df7fe1b1f0` (not commit SHA).
- Change commit: `cd7c777741f8e1b329ab39817ddbfcaa6fe32739`. Subsequent test correction commit: `357fa7239e3b9b4efb57a57fad6817d49762af90`.
- Removes `CREATE TABLE IF NOT EXISTS`, so unexpected objects fail closed; retains exactly 3 new `CREATE TABLE` statements.
- Revokes all table privileges from `public, anon, authenticated` on each new table before granting only SELECT/INSERT/UPDATE/DELETE to `authenticated`. Does not grant TRUNCATE, REFERENCES, TRIGGER or MAINTAIN to browser roles.
- Retains 12 owner-RLS policies with `auth.uid()`, including UPDATE `USING` and `WITH CHECK`.
- JSON review-session check enforces exactly `total` structured question items, four allowed levels, expected fields/types, `score` equal to the count of correct items, and max 16 KiB serialized payload.
- **Only static and SELECT-expression validation has been performed**; no actual DDL, migration, or two-real-user RLS verification has occurred.

## Evidence — authentic RED to GREEN
1. [RED 40927971694](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40927971694), SHA `5e49164742725418bee7287eb5bbbdd3829aac26`: **91/94 tests PASS, 3 FAIL** before SQL changes.
2. [Intermediate failing 40928186766](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40928186766), SHA `cd7c777741f8e1b329ab39817ddbfcaa6fe32739`: **93/94 PASS, 1 FAIL** because older source assertion still expected obsolete anon-only `REVOKE`; corrected transparently.
3. [GREEN 40928342244](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40928342244), SHA `357fa7239e3b9b4efb57a57fad6817d49762af90`: **94/94 PASS**, `npm ci` PASS, TypeScript PASS, Next production build PASS; candidate HTTP smoke still **NOT TESTED** because URL unset.
4. Read-only production `SELECT` expressions for JSONPath: valid item counted 1; wrong boolean, missing questionId, invalid level, and non-object item each counted 0. This is **NOT** a schema deployment simulation.

## Production baseline (read-only, 2026-10-29)
- `public.nordljud_favorites`: 5 rows, RLS ON, 3 policies.
- `public.nordljud_studied`: 2 rows, RLS ON, 3 policies.
- `public.nordljud_practice_history`: 1 row, RLS ON, 3 policies.
- R02 proposed tables: **zero present**.
- Supabase migration history: only `20261029101938 nordljud_v006_private_learning_state`.
- Aggregate Auth users: 1. Supabase Storage buckets: 0; objects: 0. These are metadata counts, not backup data.
- Security advisor still warns leaked-password protection disabled; unrelated to this SQL, requires separate Auth change permission.

## Backup recovery evidence — local test passed with explicit remaining limits
- The organization is on the Supabase **Free** tier. Managed daily database backups are not included. Supabase recommends a manual CLI `db dump` with off-site storage; see https://supabase.com/docs/guides/platform/backups and https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore .
- User-generated confidential files confirmed by PowerShell: roles.sql (370 bytes), schema.sql (8,204 bytes), data.sql (14,473 bytes), plus data-local-restore.sql excluding two restricted internal Storage vector tables. SHA-256 hashes were generated locally for all four; see [local backup/restore evidence](../evidence/V-008-R02_LOCAL_BACKUP_RESTORE_EVIDENCE_2026-10-29.md). The confidential SQL content remains on the user's Windows PC, not GitHub.
- **Successful isolated Docker restore**: schema.sql + data-local-restore.sql using PostgreSQL psql with ON_ERROR_STOP=1 and single transaction, exit code 0. The user independently verified local counts auth.users=1, Favorites=5, Studied=2, Practice History=1, three public tables with RLS ON and nine policies. Docker development environment was stopped after the test.
- **Explicit remaining limitation:** replaying roles.sql failed on log_min_messages privilege in local Postgres; the successful restore used Supabase-managed standard roles already available locally. The original data.sql also triggered a privilege error on an internal Storage vector table; the successful test used a freshly dumped restore variant excluding those tables.
- No encrypted/off-site archive or complete platform disaster-recovery drill was demonstrated. The user explicitly requested to skip extra encryption steps and finish quickly. This is a documented trade-off, **not** evidence that the original requirement for a full independently verified recoverable backup was fulfilled.
- Exact SHA `d4940119f84f8b3a4510e032335ae8df7fe1b1f0` and SQL file link were shown to the user. After being told of backup limitations, the user said `ادامه بده، تمومش کن بريم سراغ نُه.` (continue, finish it, move to nine). This indicates strong intent to proceed; it must **not** be falsely recorded as a verbatim declaration that the user has line-by-line reviewed this SHA or that every original conditional gate is satisfied.
- Before Production execution, reconcile the prior conditions with an explicit, unambiguous instruction covering the exact SHA and the residual role/off-site backup limitations. No migration may be executed merely because status documentation was updated. Do not put credentials, user data, or backup SQL into GitHub.

## Pre-execution stop gates and proposed one-time operation (NOT EXECUTED)
1. Student personally reviews the **exact blob SHA** `d4940119f84f8b3a4510e032335ae8df7fe1b1f0` and confirms it rather than implicitly accepting an evolving branch link.
2. Verified backup/restore evidence reference and restore operator recorded without secret values.
3. Reconfirm three target tables absent, old tables/policies unchanged and expected migration history. Verify target is project `rhtrzuoqycdnwcbgctpe`.
4. After conditions 1–3 are met, use connected Supabase `apply_migration` **once** with a descriptive stable name such as `v008_r02_secure_cloud_schema` and contents of the **exact reviewed GitHub SQL blob**. Do not create alternate SQL at execution time; do not use `execute_sql` for this DDL.
5. Independently verify table structure, RLS (12 policies), Postgres grants (no anon or excess authenticated grants), migration record, absence of changes to old data, followed by dedicated two-account Data API/RLS negative tests.
6. Stop and report any discrepancy; no repeated blind migration, TRUNCATE, DROP or destructive rollback. If a successful migration later needs reversal, preserve created data, disable dependent app Cloud capability if needed, and obtain separate approval for any destructive operation.

**Do not merge PR #1 or #2, change production Auth/SMTP/Google or Vercel settings, deploy publicly, start R03/V009, or claim Production Ready.**
