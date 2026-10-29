# V-008-R02 — Conditional Production Migration Authorization and Hard Backup Gate
Date: 2026-10-29 (Europe/Helsinki).
STATUS: **BLOCKED — DO NOT EXECUTE MIGRATION**.
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

## Backup requirement — NOT SATISFIED
- The organization is on the Supabase **Free** tier. Managed daily database backups are not included. Supabase recommends a manual CLI `db dump` with off-site storage; see https://supabase.com/docs/guides/platform/backups and https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore .
- The connected Supabase tools offer schema/read-only SQL and migrations but **no backup generation or restore-test action**. No complete exported roles/schema/data snapshot, encrypted storage receipt, or successful isolated restore evidence was provided or created. Do not substitute counts, screenshots, SQL query output, GitHub contents, or a promise of backup for a recoverable backup.
- Required evidence before execution: timestamped verified encrypted/off-site logical database dump (roles + schema + data, including public user data and auth accounts), confidential location, integrity checksum, and **successful test restore** into an isolated instance with matching essential table/user counts and RLS policies. Do not commit user data, passwords, DB connection strings, or backups to GitHub.
- Review whether separate provider configuration and storage assets would be needed for full platform disaster recovery; the proposed migration changes only database schema, not Auth configurations.

## Pre-execution stop gates and proposed one-time operation (NOT EXECUTED)
1. Student personally reviews the **exact blob SHA** `d4940119f84f8b3a4510e032335ae8df7fe1b1f0` and confirms it rather than implicitly accepting an evolving branch link.
2. Verified backup/restore evidence reference and restore operator recorded without secret values.
3. Reconfirm three target tables absent, old tables/policies unchanged and expected migration history. Verify target is project `rhtrzuoqycdnwcbgctpe`.
4. After conditions 1–3 are met, use connected Supabase `apply_migration` **once** with a descriptive stable name such as `v008_r02_secure_cloud_schema` and contents of the **exact reviewed GitHub SQL blob**. Do not create alternate SQL at execution time; do not use `execute_sql` for this DDL.
5. Independently verify table structure, RLS (12 policies), Postgres grants (no anon or excess authenticated grants), migration record, absence of changes to old data, followed by dedicated two-account Data API/RLS negative tests.
6. Stop and report any discrepancy; no repeated blind migration, TRUNCATE, DROP or destructive rollback. If a successful migration later needs reversal, preserve created data, disable dependent app Cloud capability if needed, and obtain separate approval for any destructive operation.

**Do not merge PR #1 or #2, change production Auth/SMTP/Google or Vercel settings, deploy publicly, start R03/V009, or claim Production Ready.**
