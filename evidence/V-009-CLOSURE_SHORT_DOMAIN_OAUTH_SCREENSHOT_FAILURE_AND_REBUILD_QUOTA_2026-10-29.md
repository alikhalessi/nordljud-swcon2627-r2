# V-009 Closure — User-reproduced short-domain Google Login failure and deployment timeline
Date: 2026-10-29 Europe/Helsinki
Status: **REPRODUCED BY STUDENT / BUILD CONFIG FIX PENDING DEPLOYMENT; GOOGLE AUTH STILL FAILS IN LIVE SCREENSHOT**.

## Student's genuine black-box evidence
The student supplied a Chrome screenshot of `https://nordljud-vibe.vercel.app/?utm_source=chatgpt.com` with the Nordljud sign-in dialog open. Clicking `Continue with Google` produces a red inline message:
> Authentication could not be completed. Please try again or continue as a guest.

The app shell/guest vocabulary renders (A2 selected; list shows vocabulary), but **Google OAuth fails**. This screenshot is reported by the student and was inspected in conversation; no screenshot was copied to GitHub without a separate consent to publish the image.

## Timestamp-backed root cause of the CURRENT outdated built bundle
- Short domain `nordljud-vibe.vercel.app` is verified by Vercel and routes to READY Preview deployment `dpl_4F6FYTQFHBVLDdgWtQavzCyhKRd8` on `hardening/v009-release-candidate`, code SHA `ba3a68b5efe416121cfb35a0edcefb03c26326d0`.
- This deployment READY timestamp: **2026-10-29T21:30:23.482Z** (23:30:23 Helsinki).
- Branch Preview env `NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS` was amended to include exact `https://nordljud-vibe.vercel.app` at **2026-10-29T21:38:16.659Z** (23:38:16 Helsinki), approximately **eight minutes AFTER** the served deployment was built.
- `app/auth-controls.tsx` passes the origin through `getAuthRedirectUrl` and `safeOriginsFromConfig(process.env.NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS)`, which reject unlisted URLs BEFORE `supabase.auth.signInWithOAuth`. `authErrorText` maps that error to the generic observed message. This is a strong source-level explanation of the screenshot.
- Next.js embeds public client env variables at build time. Adding the new env after build does **not** update the already compiled JS, although the new short domain now routes to it.
- A fresh V009 Preview deployment was attempted against exact current evidence SHA `be573dc7a173d3c8ca7e21ed5f980daa2b37ca11` after the failure. Vercel rejected it with **402 payment_required / api-deployments-free-per-day** (more than 100), retryAfter=86400. There is no new post-env READY deployment.
- Vercel env POSTFLIGHT still shows 3 branch-preview entries (Supabase public URL, publishable key, allowlisted origins) and distinct unchanged Production entries.
- The browser query `?utm_source=chatgpt.com` is not part of `window.location.origin`; it is not itself the root cause.
- **Additional unresolved gate:** Supabase Auth redirect URL allowlist for the new short origin is not readable from current connected Supabase tools; verify it in Dashboard and test actual full Google callback after a new build. Historic Google login has succeeded on original public Production but does NOT prove current short Preview.

## Real outcome and next executable step
**FAIL** — short-domain Preview Google sign-in in student's browser.  
**PASS** — short URL verified/attached; branch Preview environment setting updated; public Production unchanged.  
**BLOCKED** — rebuild and retest on the corrected environment, by Vercel free 24h API deploy quota.  
**NOT TESTED** — actual Google OAuth callback, sign-out and two-user Cloud isolation on updated build.

When deployment quota becomes available, create **one** new protected V009 Preview from the exact branch SHA, verify it uses the new origin, confirm Supabase allowed callback URL, then have student or permitted browser run full Google login. Do not claim success from READY alone or publicize an untested build. No new Vibe iteration, PR merge, Production migration or live provider setting change was done.

## Repeat screenshot and live-provider re-verification (same day)
- The student supplied a SECOND authentic Chrome screenshot of the short URL `nordljud-vibe.vercel.app` **without any `utm_source` query**, showing the exact same generic inline Google-login failure. Therefore the tracking query parameter was not the cause. Authentic screenshot inspected in conversation but not copied into GitHub.
- Vercel `get_deployment('nordljud-vibe.vercel.app')` still resolves to `dpl_4F6FYTQFHBVLDdgWtQavzCyhKRd8` (SHA `ba3a68b5...`), built/READY at `2026-10-29T21:30:23Z`. The branch-scoped exact short-host allowed-origins variable was updated **later**, `2026-10-29T21:38:16Z`. There remains **no confirmed later deploy** on the V009 branch; the latest known live build is stale for that setting.
- Read-only Supabase `auth_logs` aggregation for log timestamps since `2026-10-29T21:38:00Z` returned `auth_events=0`, `google_events=0`, `authorization_events=0`, `token_events=0` in the available logging window. This is consistent with the frontend pre-OAuth rejection but **log absence alone cannot prove the user's individual request did not reach the provider** (log ingestion/window limits). Do not infer provider disabled from it.
- As of this check, corrected client configuration has **not** been rebuilt into a new READY V009 deployment. Further retries on the same stale bundle cannot validate the fix. Exact next step is one quota-permitted protected Preview build, verify SHA/build timestamp and actual Google callback; separately inspect Supabase redirect allowlist if OAuth reaches the provider but callback fails.
