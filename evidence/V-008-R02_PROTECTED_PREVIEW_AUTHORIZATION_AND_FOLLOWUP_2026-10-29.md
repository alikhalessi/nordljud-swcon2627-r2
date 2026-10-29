# R02 protected Preview authorization and verified follow-up (2026-10-29)

**Student's exact instruction in Persian:** «اجازهٔ Preview محافظت‌شده را می‌دهم».

**Narrow interpretation:** The user authorized development-stage **SSO-protected Preview** behavior, not public publication or any live Auth, Google, SMTP, Supabase Production migration, Production/Preview environment-variable change, PR merge, R03, or V-009. Previous permission to implement R02 code **only** in `hardening/v008-r02` remains in force. Do not treat this as approval to silently copy Production Supabase keys into Preview.

## Direct screenshot observations (images shared in private chat; not uploaded to GitHub)

- Supabase project `rhtrzuoqycdnwcbgctpe`, Production > Authentication > Sign In / Providers: sign-ups **ON**, email confirmation **ON**, Email provider **ENABLED**. The Google provider row is outside the visible screenshot; status **UNVERIFIED**, not disabled or enabled by inference.
- Supabase Authentication > URL Configuration: Site URL is `https://nordljud-r2-vibe-sepia.vercel.app`; exactly one listed Redirect URL is the same bare site origin. Explicit application `/auth/callback` and `/auth/reset` redirect URLs are **NOT LISTED**. No save/change operation was authorized.
- Proposed additions subject to a new exact live-Auth approval, leaving existing Site URL and listed Redirect URL intact:
  1. `https://nordljud-r2-vibe-sepia.vercel.app/auth/callback`
  2. `https://nordljud-r2-vibe-sepia.vercel.app/auth/reset`
- **Rollback** for a later authorized redirect change: remove only these two newly added URLs; retain original base origin and current Site URL. Capture real before/after settings separately without secrets.

## Authentic Vibe RED/GREEN and release boundary

- [RED 40923736557](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40923736557), SHA `3c01cdd8`: 86/89 passed, 3 failed.
- [RED 40923946297](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40923946297), SHA `9d37263f`: 86/90 passed, 4 failed.
- [GREEN 40924098248](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40924098248), SHA `d0b8aa4`: 90/90 passed, `npm ci`, TS and Next build successful. Auth/REST E2E **NOT TESTED**.
- Vercel SSO is enabled for non-custom domains, and RED test-only commits produced protected Preview READY states; current GREEN SHA is **not confirmed READY in Vercel** and Vercel reports deployment-rate limitation. Do not confuse protected Preview with an authorized public or Production deployment.

**Current outstanding permissions:** Exact Supabase auth redirect URL changes; Google provider setup only if separately verified and approved; isolated Preview test Supabase environment/credentials only after explicit scope; separately reviewed exact Production schema SQL execution; any public deployment or PR merge; final R02 acceptance before R03/V009. **NONE** of those permissions was granted here.
