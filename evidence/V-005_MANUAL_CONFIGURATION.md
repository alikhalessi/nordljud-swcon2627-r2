# V-005 external account setup — human-controlled checklist

**Not completed:** Supabase project selection/creation, publishable key injection into Vercel, Google OAuth credentials, redirect allow-lists, live login tests. This file is a guide, not a success record. Never share or commit passwords, service-role keys, Supabase `sb_secret_*` keys, Google Client Secrets, or user access tokens.

## 1. Isolated Supabase backend

Use [Supabase Dashboard](https://supabase.com/dashboard/projects) to create a separate Nordljud **V2** project for this experiment (or explicitly choose one authorized existing project). Do not silently reuse the older inactive `Nordlyd-3B` or SetPilot projects.

In **Project Settings → Connect / API Keys**, copy only the **Project URL** and **publishable key** (`sb_publishable_...`). In **Authentication → Providers**, enable Email (keep email confirmation enabled for real external testers). Default SMTP may restrict actual delivery; if confirmation email fails, record it as BLOCKED/FAIL, not as successful registration.

In **Authentication → URL Configuration**, set **Site URL** to the stable hosted origin `https://nordljud-r2-vibe-sepia.vercel.app`. Add the same origin to **Redirect URLs**. If using a different deployed origin, it must also be specifically allowed, and URLs must match the actual browser origin; do not use localhost for hosted acceptance.

## 2. Google OAuth

In [Google Auth Platform](https://console.cloud.google.com/auth/clients), configure consent screen/audience/test users and a **Web application** OAuth client. Add `https://nordljud-r2-vibe-sepia.vercel.app` to Authorized JavaScript origins. The **Google Authorized redirect URI** is your Supabase project provider callback, **NOT** the Vercel homepage. Copy it from **Supabase → Authentication → Providers → Google**; it normally looks like `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`.

Put the Google **Client ID and Client Secret** into the **Supabase Google provider settings** and enable the provider. Keep the secret out of Vercel public variables and GitHub. Supabase should redirect users back to the exact site origin registered in its own URL Configuration.

Official guidance: https://supabase.com/docs/guides/auth/social-sign-in/auth-google and https://supabase.com/docs/guides/auth/redirect-urls.

## 3. Vercel production settings

In [Nordljud V2 Vercel settings](https://vercel.com/aleksi9/nordljud-r2-vibe/settings/environment-variables), add exactly these environment-variable **names** for Production, with real values from the selected Supabase project:

- `NEXT_PUBLIC_SUPABASE_URL` = the project URL (`https://YOUR-PROJECT-REF.supabase.co`).
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = the browser-safe **publishable** key (NOT a secret key).

Redeploy `condition/vibe` afterward: public Next.js environment variables are compiled into the production JS build. Adding values to Vercel alone does not modify older deployments.

**Important deployment-protection gate:** A read-only query of the Vercel project returned `ssoProtection.enabled=true` / `all_except_custom_domains`. The intended .vercel.app URL may be protected, blocking public Google OAuth return and external testers. Review **Vercel → Settings → Deployment Protection** yourself. Decide whether public access is appropriate; do not turn off protection casually or presume it is already open. No agent changed these settings.

## 4. Manual hosted acceptance (do not mark PASS without evidence)

Record browser/version, source commit, production URL, steps, expected/actual behavior and screenshot for:

1. Guest: lessons, four levels, audio, practice, images usable without account.
2. Email sign-up: confirmation email is delivered (if required), link returns to real hosted origin, account is created.
3. Email sign-in: valid credentials show authenticated user; incorrect password shows failure.
4. Google login: a permitted Google test account returns successfully from OAuth to the exact hosted origin (not localhost) and displays signed-in identity.
5. Logout and reload: sign-out returns to Guest Mode; refresh restores the correct session state; no saved learning progress is implied.
6. Another browser/private window: accounts do not share browser sessions. No protected per-user data exists yet, so this is **not** an RLS audit.

**Not part of V-005:** favorites, cloud scores/progress, account-owned tables or RLS. The team should create separate data and authorization acceptance criteria in V-006.

## Reproducibility

The repo pins direct dependencies but still lacks a committed `package-lock.json`; controlled regeneration/commit of a complete lockfile is a separate outstanding task. No external service secret should ever be checked in during that work.
