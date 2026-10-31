# Nordljud CORE — Authentication Contract

Status: proposed architecture; live provider behavior NOT TESTED. D02 remains unconfigured/unverified.

## Configuration boundary

The future independent application needs its own authorized Supabase project/origin/test users. Configuration names are `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and a canonical application origin. No actual values, project IDs, account credentials or elevated keys are created or retained by Plan. A name marked public is not suitable for a secret.

Production/hosted origin must be explicitly allow-listed HTTPS and not localhost. Local development on port 3100 is separate and cannot be used as a successful hosted F10 return. Do not use unsafe redirect wildcards or blindly trust forwarded-host headers. Google identity scopes do not authorize Google data APIs, and provider access/refresh tokens are not retained for application use.

## Browser/server session contract

Use the standard SSR browser client for session synchronization and request-scoped server clients for refresh/private operations. The selected design uses browser-readable session cookies; it does not claim HttpOnly protection. HTTPS Secure/SameSite behavior, escaped rendering, no untrusted HTML and private-response caching rules are mandatory implementation checks. Apply SDK cookie/cache header updates; never reuse a module-level authenticated server client across users.

Proxy refresh uses token verification; every private application route obtains a fresh verified user. Cookie-loaded session contents or UI state alone cannot authorize data access. Identity is carried through a publishable key plus user JWT so database RLS still applies.

Public source endpoints do not create authenticated clients or carry session cookies; exclude them from the refresh path. The public learning shell does not embed private records. Any response that refreshes authentication cookies uses the private/no-store rule rather than public source caching.

## Supported flows

| Flow | Required behavior |
| --- | --- |
| Email signup | Browser SDK PKCE request with exact callback origin; show confirmation-pending versus actual authenticated status truthfully |
| Email confirmation | Default ConfirmationURL reaches provider verification, then same-browser code callback; exchange code with matching verifier cookie |
| Email sign-in | Source-independent valid/invalid credential response; only a verified session unlocks private data |
| Google sign-in | Explicit learner action opens provider; code returns to the authorized hosted app origin and establishes a verified session |
| Callback | `GET /auth/callback?code=...`; single exchange, fixed/validated return path, no code/token logging or shared caching |
| Sign-out | Explicit `local` scope: this browser only, as the student's PLAN-Q01=A answer; clear private UI/cache after confirmed local action and never delete progress |
| Provider/session failure | Actionable non-disclosing message, no false auth/save claim; supported Guest reading/practice remains available |

The default email PKCE design is based on published SDK/Auth implementation evidence linked in [research R5](../research.md#r5--request-scoped-auth-standard-pkce-and-current-browser-sign-out). It is a proposed design inference, not proof of current project behavior. No custom template, SMTP service or paid plan is assumed. D02 must verify allowed recipients, delivery limits, actual default-template behavior, code lifetime and the same-browser verifier.

## Failure matrix

- Cancelled provider, invalid/expired/replayed code or missing verifier: explain authentication did not complete; do not create a fake valid session or expose provider internals.
- Email link opened in another browser/device: explain the missing PKCE context and allow a fresh supported sign-in; do not silently switch to a less-safe flow.
- Provider unavailable: report the affected dependency, keep private account actions unavailable and retain Guest study. Guest fallback is not an F09/F10 authentication PASS.
- Sign-out fails: private UI is paused/cleared safely with retry feedback, but do not claim revocation was confirmed. Do not promise all already issued JWTs become invalid immediately.
- Account A changes to B: clear A's private in-memory views, reject stale responses/writes from A and fetch only B's verified records. Guest records are neither imported nor overwritten by account data.
- Two devices: local sign-out affects this browser; the other legitimate session can remain signed in. Owned saved progress persists in either case.

Future evidence must include real hosted origin/session verification and two-user checks. Unit mocks, a callback redirect, a build or a deployment READY signal alone do not establish F09–F12 PASS.
