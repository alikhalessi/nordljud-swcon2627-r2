# V-008-R02 — Final explicit student authorization before production schema migration
Date: 2026-10-29 (Europe/Helsinki)
Target project: `rhtrzuoqycdnwcbgctpe` (`nordljud-v2-auth`)
Candidate GitHub blob SHA: `d4940119f84f8b3a4510e032335ae8df7fe1b1f0`
GitHub candidate: `database/proposed-migrations/V008_R02_SECURE_CLOUD_SCHEMA_NOT_APPLIED.sql` at `hardening/v008-r02`
Authorized execution action: **one** `Supabase apply_migration` to create precisely three new user-owned cloud tables with indexes, constraints, grants and 12 owner-scoped RLS policies, followed by independent inspection. No merge or public deployment authorization.

## Exact student instruction (verbatim, Persian)
> اوکی، من قبول می‌کنم.اجرای SQL با SHA `d4940119f84f8b3a4510e032335ae8df7fe1b1f0` روی Production را تأیید می‌کنم. محدودیت آزمایش بازیابی نقش‌ها و نداشتن نسخهٔ رمزگذاری‌شدهٔ مستقل را می‌پذیرم. Migration را یک‌بار اجرا و نتیجه را بررسی کن.

## Evidence and accepted limitations
- Previous conditional-only authorization was expressly clarified by the exact SHA and instruction above.
- Isolated restore of `schema.sql` and `data-local-restore.sql` succeeded with exit code 0; restored Auth and public tables matched live baseline 1/5/2/1, public RLS enabled and 9 preexisting policies. See `evidence/V-008-R02_LOCAL_BACKUP_RESTORE_EVIDENCE_2026-10-29.md` for SHA256 of data/roles/schema/restore-safe SQL files.
- Student explicitly accepts limited replay of `roles.sql` due to local `log_min_messages` permissions; independent encrypted offsite backup was not produced. User was informed; no claim of full platform disaster-recovery readiness.
- Target preflight: project active/healthy, three new tables absent, originals 5/2/1 unchanged, Auth users 1, migration history contains only `20261029101938 nordljud_v006_private_learning_state`.
- Existing code PRs and public routes remain protected. No authorization for PR #1 or #2 merge, live Google/SMTP settings change, production website promotion, or other destructive operations.
- Explicitly retain the user-defined instruction to verify after one application and stop on error.
