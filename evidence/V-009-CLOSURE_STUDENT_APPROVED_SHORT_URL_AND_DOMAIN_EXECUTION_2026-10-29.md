# V-009 Closure — Student-authorized short, stable branch-domain alias
Date: 2026-10-29 (Europe/Helsinki). Single V009 Closure; no new iteration.
## Exact original user approval in Persian
> صد در صد تأیید می‌کنم، لطفا اجرا کن.

The student directly replied to a proposal for the exact shorter URL `nordljud-vibe.vercel.app`, with the description that it should connect to the V009 Vibe Git branch while the old Production deployment remains unchanged, and its URL must be included in the allowed Google/Supabase redirect setup. Translation ("I approve 100%, please execute") is assistant-authored, not original.

## Real Vercel change and verification
- Vercel project `prj_ZyW5gjGLrwr0XKWQcUdNdOo4fVh2` (`nordljud-r2-vibe`); added Git branch domain **`nordljud-vibe.vercel.app`** with `gitBranch=hardening/v009-release-candidate`, `redirect=null`.
- Provider's add-project-domain response: **`verified=true`** for exactly that project and branch.
- The original public aliases `nordljud-r2-vibe-sepia.vercel.app` and `nordljud-r2-vibe-aleksi9.vercel.app` were NOT modified by this change; they remain on historical Production `condition/vibe` until a separately approved release.
- The existing branch-scoped Preview variable `NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS` (Vercel id `qHL2kjuBV5GyVuDJ`) was updated only on `hardening/v009-release-candidate` to include the exact newly approved `https://nordljud-vibe.vercel.app` **in addition to** the already authorized branch Preview hostname. No broad wildcard, no change to Production env values.
- A new Preview build is required because `NEXT_PUBLIC_` values are baked into the client bundle at build time. This GitHub evidence commit may trigger the automatic Git integration but **does not itself prove a READY runtime, Google OAuth or Supabase redirect allowlist**.
- Google OAuth to the original public Production URL has historical successful Supabase event evidence. Preview remains dependent on confirmation of Supabase Auth post-login redirect allowlist for `https://nordljud-vibe.vercel.app/auth/callback` and `/auth/reset`, and on actual browser E2E. No Google provider, OAuth secret, SMTP, Production config, database, new account or PR merge changed.
- This is a user-approved URL configuration within the existing V009 Closure, **not** approval to publish an unreviewed Production build or declare Vibe Freeze.
## Research chronology
Actual Vercel branch-domain add and branch-only allowed-origins update were carried out after the user's explicit message and before this GitHub evidence document was committed; do not backdate this evidence as a pre-execution commit. This entry preserves the exact user approval and actual operation sequence.

## Post-change provider verification
- A subsequent read-only `get_project_domain` verified `nordljud-vibe.vercel.app` belongs to exact Vibe project, `gitBranch=hardening/v009-release-candidate`, and `verified=true`.
- An independent Vercel `get_deployment` of **the short hostname itself** resolved to `dpl_4F6FYTQFHBVLDdgWtQavzCyhKRd8` (READY, Preview target null, Git SHA `ba3a68b5efe416121cfb35a0edcefb03c26326d0`). The original Production aliases were unaffected.
- This resolved deployment **predates the addition** of the short hostname to `NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS`; Next.js client-baked configuration needs a new Preview build. A web fetch did not independently verify page content or Google sign-in. Do not claim browser/OAuth E2E PASS.
