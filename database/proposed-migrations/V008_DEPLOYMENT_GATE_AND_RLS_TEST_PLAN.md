# V-008 Supabase deployment gate — NOT AUTHORIZED / NOT APPLIED

**Status:** Proposed database records only. The student explicitly prohibited production database migrations without a separate approval beyond the V-008 code authorization. **No Supabase SQL was executed against any environment during this iteration.**

## Prepared but not applied

Proposed SQL file: [V008_review_learning_records_PROPOSAL_NOT_APPLIED.sql](V008_review_learning_records_PROPOSAL_NOT_APPLIED.sql).

The proposed schema introduces three user-owned tables under `public`: `nordljud_daily_completions`, `nordljud_review_items`, `nordljud_review_sessions`. Every table has an `auth.users(id)` foreign key, per-user Row Level Security on SELECT, INSERT, UPDATE, DELETE, and Data API grants to `authenticated` but not `anon`. Browser never uses a service-role key. The existing favorites, studied and practice history tables and their meanings are unchanged. The SQL is a version-controlled **deployment candidate**, not a migration that has been created via Supabase CLI or installed into migration history.

## Further approval needed

1. Student reviews the proposed SQL and explicitly approves the intended project/environment and **production database migration application** (a separate approval from V-008 implementation).
2. Identify the correct Supabase project and production/staging environment without guessing. Confirm recent Supabase release notes and project settings first.
3. Use the supported Supabase migration workflow, ensure migration history is correctly created and check the target schema's Data API grants/exposure. Do not invent an applied migration or success screenshot.
4. Verify exact live RLS on two different authenticated test users: A can CRUD own records; B **cannot select, alter, overwrite, delete or insert as A**; anonymous clients cannot read protected user data. Test ownership re-assignment/update with a hostile different `user_id`, and verify session changes don't leak the previous account's data. Include actual Postgres/REST results and expected 0/permission denied responses with IDs redacted.
5. Only after live verification should the Cloud storage feature be recorded `PASS`. Until then the UI must clearly show `BLOCKED`, and no guest storage should be silently uploaded on login.

## What source tests actually verify

The V-008 test suite checks the SQL text for `ENABLE ROW LEVEL SECURITY`, explicit account ownership predicates, `WITH CHECK` and least-privilege role grants. These **source tests do not prove that policies have been deployed or enforce account isolation**. Browser, mobile, real accounts, storage, permissions, and authentication are also unverified without actual testing.

## Product fallback

- Public daily archive is deterministically recreated from unchanged source on the client and is Guest-accessible.
- Guest review queue, explicit completion and review results use a separate, bounded, validated localStorage key, and can be cleared. This is browser/device-local only.
- Logged-in users are **not** silently switched to guest storage for review records; cloud record operations are disabled and clearly marked BLOCKED if the authorized tables and RLS cannot be verified.
- No Android native app, PWA push, reminder notification or background scheduler has been implemented.

**Research disclosure:** V-008 is late user-driven scope expansion after a frozen two-method Round 2 benchmark. Report it separately from the original F01–F15, and do not reuse Vibe implementation in the independent Spec Kit SDD condition.
