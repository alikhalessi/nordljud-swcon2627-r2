# V-009 Closure — Preview Google OAuth root cause and targeted environment correction
Date: 2026-10-29 Europe/Helsinki. This is a focused follow-up within the already approved **V-009-CLOSURE-P01**, not a new iteration. No application source change.

## Student's observed discrepancy
The user reports that Google Login works on the old **public Production** Nordljud URL, but not on the latest **V-009 Preview**. The user rightly requires a working release candidate before presentation.

## Verified code/configuration root cause
- Production Vercel aliases `nordljud-r2-vibe-sepia.vercel.app` and `nordljud-r2-vibe-aleksi9.vercel.app` still point to `dpl_GyGByUnZBcWzEENAY58yDX1qBf24`, source branch `condition/vibe` SHA `7f64839dbcb8ae945b0416ecf83b84d78009b1f0`, READY. This is older than staged R02/Auth fixes.
- Latest observed V009 ready Preview is `dpl_EnxkTyXoM9HnvVQy827PBDsGYq1G`, source branch `hardening/v009-release-candidate` SHA `874929679618a69bca0e4f515fecaeb438c60c98` (READY). Branch preview alias is `https://nordljud-r2-vibe-git-hardening-v009-release-candidate-aleksi9.vercel.app` (SSO protected).
- In `lib/auth-flow.mjs`, `getAuthRedirectUrl` only accepts `KNOWN_PRODUCTION_ORIGINS` (two public domains) or exact origins explicitly passed via `safeOriginsFromConfig`. The React `app/auth-controls.tsx` calls `safeOriginsFromConfig(process.env.NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS, ...)` before `signInWithOAuth({provider:'google', redirectTo:redirectFor('/auth/callback')})`. With no Preview `NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS`, `redirectFor` **throws before initiating Google OAuth** on the protected Preview domain.
- At root-cause check, Vercel env listing confirmed this specific variable **absent** for Preview. Thus we have a source/config reproducible defect, *not* evidence all Vibe source is broken.
- Independent Supabase `auth_logs` review shows successful historical Google OAuth with token `/token` HTTP 200 on public Nordljud, including 2026-10-29 at 21:24:38 UTC, as well as some earlier failures. **This verifies provider activity for Production only; it does NOT prove Preview Google OAuth E2E.** Never store client identities/IPs/session IDs in evidence.

## Narrow Preview-only correction actually executed
- Created encrypted Vercel environment variable `NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS`, exact value `https://nordljud-r2-vibe-git-hardening-v009-release-candidate-aleksi9.vercel.app`, target `preview`, scoped solely to gitBranch `hardening/v009-release-candidate`. No wildcard, no production target.
- Post-change Vercel `filter_project_envs(decrypt=false)` confirmed branch Preview now has this variable PLUS the earlier two client Supabase env variables. Original `production` variables remained distinct and unchanged.
- No GitHub application/test code changed, no Auth/Google/SMTP dashboard settings changed, no Production deployment promoted, no PR merged, no new accounts created and no database migration executed.
- This correction was within the student's previously approved V009 Closure scope and does not introduce a new corrective iteration.

## Must still verify before declaring Google Login fixed
1. Generate a **new V009 Preview deployment after the environment change** (Next.js embeds `NEXT_PUBLIC_*` values at build time). Prior builds remain unverified for this config. Earlier attempts to deploy were rate-limited by Vercel free daily quota `402 api-deployments-free-per-day`; don't claim the update took effect at runtime until a new build is confirmed.
2. Review **Supabase Authentication → URL Configuration** with authorized admin: allow exact stable branch Preview `https://nordljud-r2-vibe-git-hardening-v009-release-candidate-aleksi9.vercel.app/auth/callback` and `/auth/reset` as appropriate, while preserving existing Production origins. This dashboard configuration is NOT independently accessible through available read-only Supabase connector; do not guess or silently mutate live settings.
3. With an approved protected Preview browser session, perform actual Google OAuth redirect/back and sign-out, then two-account Cloud/RLS checks, retaining redacted evidence. A Vercel READY deployment alone is not a login PASS.
4. Verify release routing and get separate final Vibe Freeze approval. Until these tests are passed, `RESEARCH_SNAPSHOT_ONLY`, not Production Ready.

## Correction severity / honesty
**Confirmed defect:** Preview origin missing from new Auth allowlist configuration. **Config correction staged and provider-verified, runtime behavior NOT TESTED.** Do not say Google is disabled: historical OAuth succeeded in Production. This is a high-priority presentation blocker if Preview login is required.
