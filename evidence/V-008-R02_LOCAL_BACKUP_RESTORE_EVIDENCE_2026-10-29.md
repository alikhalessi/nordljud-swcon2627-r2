# V-008-R02 — User-attested local backup and recovery test evidence
Date: 2026-10-29 (Europe/Helsinki).
Project: Supabase Production `rhtrzuoqycdnwcbgctpe` (Nordljud); local isolated CLI/Docker environment `Nordljud-Backup`.
Evidence provenance: User-provided Windows PowerShell and Docker outputs in the ChatGPT conversation on 2026-10-29. No confidential SQL dump contents or credentials committed.

## Observed backup export
- Supabase CLI v2.122.0, Docker Server v29.9.2. `supabase login`, `supabase init`, and `supabase link --project-ref rhtrzuoqycdnwcbgctpe` succeeded.
- `supabase db dump --linked --role-only` -> `roles.sql`, 370 bytes.
- `supabase db dump --linked` -> `schema.sql`, 8,204 bytes.
- `supabase db dump --linked --data-only --use-copy` -> `data.sql`, 14,473 bytes.
- Restore-specific data dump: `supabase db dump --linked --data-only --use-copy -x "storage.buckets_vectors" -x "storage.vector_indexes"` -> `data-local-restore.sql` (approximately 14 KB).
- User-confirmed COPY sections in original data dump include `auth.users`, `auth.identities`, `auth.sessions`, three `public.nordljud_*` tables, and storage metadata.
- Private local folder (do not commit): `C:\Users\alikh\Nordljud-Backup\private-backup`.

## Local restore test: verified success with explicit exception
- Attempt to replay `roles.sql` with transaction and ON_ERROR_STOP: failed on PostgreSQL `permission denied for parameter log_min_messages` (transaction aborted); role replay NOT validated.
- Initial schema+data restore: failed on local privilege `storage.buckets_vectors` (transaction aborted).
- Final isolated local restore: `schema.sql` + `data-local-restore.sql` with `psql -X --single-transaction -v ON_ERROR_STOP=1`, exit code **0**. The two internal Storage vector tables were excluded from this restore-only data copy. The original `data.sql` remains unchanged.
- User verified on local restored DB: `auth.users=1`, `public.nordljud_favorites=5`, `public.nordljud_studied=2`, `public.nordljud_practice_history=1`. All three public tables have RLS enabled with 3 policies each, total 9. Items ending `_pkey` and `_idx` in the user query output were indexes (not tables).
- `npx supabase stop` confirmed `Stopped supabase local development setup`; the CLI indicated local data is retained in a Docker volume.

## Hash evidence (SHA-256, supplied by user from PowerShell)
- `data-local-restore.sql`: `1233E883F470A55732C1C999567AD8CCFD2D5FDE57335CF8DD57063601ABFB80`
- `data.sql`: `0AB2A49A47B1D4C688CB4C0283CDED7EBD836810B013F3B88E01267F1B019A7A`
- `roles.sql`: `168A95A9C745AF5ED4679751F90419AC9DC434240A213B03E32A06D5664C2308`
- `schema.sql`: `88CB912EEB225F95B1A8F3309B50A7AF8267E0FA166E158A30C66CB2E4B2842B`
- Manifest recorded locally as `SHA256-manifest.txt`.

## Explicit limitations, risk and user direction
- The original role dump **has not** been proven restorable in the local target. The test relies on Supabase's pre-created local standard roles.
- Encryption, off-site copy and a full disaster-recovery rehearsal were **not** demonstrated. The user explicitly questioned the value of encryption and requested avoiding extra steps; we must not claim these controls took place.
- Auth provider/SMTP settings and any external Storage objects are not covered by these database tests; no claims about broader platform-level restoration or two-account live RLS can be made.
- After being shown the exact candidate SQL blob SHA `d4940119f84f8b3a4510e032335ae8df7fe1b1f0` and explicitly told of the backup/role limitations, the user directed: `ادامه بده، تمومش کن بریم سراغ نُه.` (Continue, finish it; let's move to nine.)
- This is a user instruction to advance the workflow, **not** a fabricated assertion that the user examined every SQL line or explicitly accepted every risk; preserve the prior conditional SQL/backup approval gate unless its actual conditions are verified or unambiguously amended.
- No production deployment, PR merge, provider setting change, or data-destructive rollback is authorized by this evidence document.
