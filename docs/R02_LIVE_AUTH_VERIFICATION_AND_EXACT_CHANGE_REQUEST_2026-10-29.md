# V-008-R02 — Verified live configuration, missing facts, and separately gated changes

**Status:** READ-ONLY DIAGNOSIS; NO LIVE CONFIGURATION OR DATABASE CHANGE AUTHORIZED.
**Date:** 2026-10-29 Europe/Helsinki.
**Project:** Vercel `nordljud-r2-vibe` (`prj_ZyW5gjGLrwr0XKWQcUdNdOo4fVh2`), Supabase `nordljud-v2-auth` (`rhtrzuoqycdnwcbgctpe`).
**Approval boundary:** Student's exact R02 code permission `24e75a1b` authorizes source fixes on isolated branch only; **not** Google/Email Auth provider settings, SMTP, Vercel environment variable changes or Production schema execution. R01 PR #1 and R02 PR #2 stay Draft/unmerged. V-009 and R03 remain stopped.

## Read-only facts independently observed

1. Vercel connector `filter_project_envs(decrypt=false)` returned precisely two configured environment variable **names** for the project: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Both report `target:["production"]`; **neither is currently configured for Preview** according to this metadata. Their values were **not decrypted or inspected**.
2. Supabase project is `ACTIVE_HEALTHY`. The original user-owned `nordljud_favorites`, `nordljud_studied`, `nordljud_practice_history` exist and have RLS enabled. Three R02 completion/review tables remain **absent**. No proposed migration was applied.
3. Security Advisor reports `auth_leaked_password_protection` **WARN / disabled**. This does not establish that an account was compromised. Changing the setting requires a separately approved live Auth configuration operation.
4. Aggregate read-only Supabase Auth logs over the default recent 24h window: 143 Auth-log events, **zero with an exact `provider is not enabled` substring** in the `msg` field; only one observed HTTP 400 grouped as other path. This does **not** disprove a historical provider-disabled event (its message may be in other fields or outside the window), and does **not** prove Google is enabled or login works.
5. Connected Supabase tools do not expose a safe read-only `get_auth_provider_config` action. Therefore enablement, Google credentials and exact current Supabase Site URL / redirect allowlist remain **NOT INDEPENDENTLY VERIFIED**; do not invent them from code or historical logs.
6. GitHub R02 code fixes include explicit PKCE callback and recovery pages, one-time code verification, an anti-replay React StrictMode fix, generic non-enumerating errors, and user-owned cloud affected-row checks. These are **staged source only**, not deployed or proven in a real browser.

## Two screenshots (read-only) needed to establish exact current provider settings

With account administrator access, capture the **non-secret fields only** from:

- [Supabase Dashboard → Authentication → Sign In / Providers](https://supabase.com/dashboard/project/rhtrzuoqycdnwcbgctpe/auth/providers): show whether **Google** and **Email** are enabled and whether confirmation is required; **mask all OAuth client secrets, credentials, and any personal email**.
- [Supabase Dashboard → Authentication → URL Configuration](https://supabase.com/dashboard/project/rhtrzuoqycdnwcbgctpe/auth/url-configuration): show Site URL and current Redirect URLs, without keys/tokens. Save authentic screenshots as supporting evidence only with explicit user intent; avoid adding unredacted security screenshots to GitHub.

If an authorized Google Cloud OAuth client exists, separately verify the configured **Google OAuth Authorized Redirect URI** is the exact Supabase callback for this project: `https://rhtrzuoqycdnwcbgctpe.supabase.co/auth/v1/callback` (subject to provider dashboard verification). This Google redirect URI is **not** the same as the Nordljud frontend's post-login redirect.

## Proposed future changes — all blocked pending separate consent

| Action | Proposed new state | Risks | Rollback | Authorization |
|---|---|---|---|---|
| Supabase Google Provider | Enable/configure only after verifying existing state, valid client ID/secret and Google Authorized Redirect URI | Inadvertently exposes login method, redirect misconfiguration, invalid OAuth client; user confusion | Restore recorded existing provider toggle/approved URLs; keep secrets off evidence | SEPARATE EXPLICIT PERMISSION REQUIRED |
| Supabase Auth Site URL / Redirect allowlist | Only exact currently verified Nordljud origins and `/auth/callback` / `/auth/reset` paths; avoid wildcard preview domains | Breaks existing login/confirmation if old paths omitted; potentially allows redirect abuse if overly broad | Restore existing captured Site URL/redirect entries | SEPARATE EXPLICIT PERMISSION REQUIRED |
| Vercel Preview Supabase environment | **Do not blindly copy Production keys into Preview.** Prefer an authorized isolated test Supabase instance; if none available, propose Preview access limited to approved test users and seek explicit risk acceptance. Existing Production variables unchanged | Preview code could touch Production accounts/data; public preview surface, mismatched Auth allowlist | Remove Preview-only env vars; redeploy only after authorized scope | SEPARATE EXPLICIT PERMISSION REQUIRED |
| Supabase leaked-password protection | Consider enabling after current password and organizational policy review | User-facing password acceptance behavior changes, possible plan dependency | Restore previous toggle if supported, document change | SEPARATE EXPLICIT PERMISSION REQUIRED |
| Supabase Production schema | Exact [R02 SQL proposal](../database/proposed-migrations/V008_R02_SECURE_CLOUD_SCHEMA_NOT_APPLIED.sql), owner RLS, grants and constraints, via supported migration mechanism | RLS errors can block storage; unintended grants, duplicate migration or data loss if rolled back carelessly | Backup/schema snapshot, prefer additive deployment; no destructive rollback without separate consent | **SEPARATE EXPLICIT SQL + PROJECT + ACTION APPROVAL REQUIRED** |

**Current configuration change authorization:** NONE. This document is a review-ready proposal, not a command to apply any setting or database migration.

## Acceptance and release gating

1. Capture true pre-change Provider/URL configuration from an authorized UI without secret material; classify confirmed versus inferred settings.
2. Obtain explicit user permission **per actual live change**, after presenting exact before/after and rollback. Never assume a generic 'continue' is a Production or migration permission.
3. Use two authorized test identities in an isolated permitted database, run actual RLS negative checks and real browser sign-in/confirmation/recovery. Do not claim `PASS` based on source-level tests.
4. Do not merge Draft PRs, deploy unapproved source, start R03/V-009, or waive mandatory R01 Vercel Preview routing verification before Vibe Freeze.
