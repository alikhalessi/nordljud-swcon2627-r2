# V-006 — implementation chronology and acceptance gates

**Approved prompt:** [V-006_APPROVED_PROMPT.md](V-006_APPROVED_PROMPT.md) — verbatim student-authored corrected English text recorded first in commit [9e75721](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/9e75721faea1647fac4b8bdae68779106fecfac6). Explicit correction: **email registration has NOT been student-tested**, despite some earlier assistant suggestions to the contrary. The student reported Google Login and Logout success.
**Method:** V2-A Vibe Coding, branch `condition/vibe`; ChatGPT wrote code via connected GitHub tools, not an independent Copilot/Spec Kit run.

## Backend (actual changes)
- [RLS schema committed before migration](V-006_DATABASE_SCHEMA.sql), code commit [f04fa97](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/f04fa973377e0368ad6170c94d20c0b2233c6bc6).
- Migration `nordljud_v006_private_learning_state` applied successfully using connected Supabase migration tool to **existing** `nordljud-v2-auth` project `rhtrzuoqycdnwcbgctpe`, no project replacement.
- Verified three public tables now exist with `rls_enabled=true` and zero baseline rows: `nordljud_favorites`, `nordljud_studied`, `nordljud_practice_history`.
- Every table references `auth.users` via `user_id`; `SELECT` and `DELETE` policies use `(select auth.uid()) = user_id`; `INSERT` policies use `WITH CHECK ((select auth.uid()) = user_id)`. All default table grants were revoked from `anon`; `authenticated` received only `SELECT`, `INSERT`, `DELETE`. No UPDATE privilege; status toggling uses INSERT or DELETE. RLS must be runtime-tested using *two different signed-in identities* before claiming production-isolation E2E success.
- Security advisor returned one auth-wide warning: **Leaked Password Protection Disabled**, independent of the new tables. Follow-up recommendation: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection. No settings changed without account-owner action.

## Frontend (actual implementation)
- [Core feature commit `b41cd14`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/b41cd147587f7b74ed669f61a4d7d1884abbaef8) changes six code files. A new authenticated learning-state provider subscribes to the Supabase Auth session and clears stale user data immediately on identity changes; old in-flight reads are ignored by an epoch guard.
- Favorite identity uses *exact* Swedish `verb + meaning` (the distinct meanings of `sticka` remain separate). Studied identity adds `level`. Historical records include `level`, `score`, `total`, date and unique UUID.
- UI adds separate **Saved learning & favorites** dashboard, A2/B1/B2/C1 counters, Favorites list and removal, independent studying status toggles, history list, one-row deletion and Delete All with user confirmation. Selected-word Practice Mode automatically saves one completed session when an authenticated user finishes it. No other existing learning modes, source data, voice, photos or original mini lesson are removed.
- In Guest Mode all lesson/Practice functions remain available; cloud writes are disabled and UI explains that guest progress is not saved.
- Cloud write errors are displayed and cloud data is reloaded after writes; passing unit/static tests does **not** mean account sync, cross-device or user-isolation E2E has been demonstrated.

## Outstanding acceptance

1. Google Login and Logout were previously student-verified for V-005; **email registration NOT tested**.
2. Add and remove a Favorite; compare `sticka` senses.
3. Mark `arbeta` studied in A2, then B1; verify distinct counters and toggles.
4. Finish selected-word Practice Mode; inspect saved score/history, Delete entry / Delete All.
5. Refresh and log out/in; verify items persist on another device.
6. Sign into a *second independent account* and verify A's records are invisible; try unauthorized read/change if permitted by controlled security tests. E2E RLS confirmation pending.
7. Check Guest Mode still supports all lessons but does not permanently persist data.
8. Test auth-specific password error and email signup separately in V-005 acceptance.

**V3 research integrity:** Neutral feature requirements and common source data may be shared between independent V3 Vibe and SDD runs; never copy V2's React code or DB migration into the isolated agents. Record human/provider actions and assistant choices distinctly.
