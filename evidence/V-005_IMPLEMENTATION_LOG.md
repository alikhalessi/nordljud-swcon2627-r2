# V-005 authentication implementation and verification record

**Approved source:** [V-005_APPROVED_PROMPT.md](V-005_APPROVED_PROMPT.md), exact English prompt drafted by ChatGPT, approved by student: "yes dear comrade!" in chat. Preserved *before code* at commit [4aba75c](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/4aba75c1f2d60bdf3e95128fc1fc49d18a892851). No separate coding agent or real Spec Kit was used.

## Actual implementation

- [54b215b](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/54b215bbe6236bec40b4e8ec581af4643fd6183c): browser-only Supabase Auth client, email signup/login, Google OAuth initiation, logout/status/error/guest UI, public env example and static tests.
- [4ae69ab](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/4ae69ab48e9548ba618186f77b15988f8a554eee): integrated AuthControls into the V2-A app header, pinned `@supabase/supabase-js@2.118.0` and styled responsive auth UI. Preserved all existing vocabulary levels, cross-level comparison, audio, real-photo pilot, selected-word Practice Mode and fixed V-001 mini lesson.
- Selected a direct browser SDK because this phase has public learning pages only; there are no protected user-owned database records or server auth endpoints yet. Supabase cookies/SSR and RLS will be required if protected server data is introduced in V-006. An authenticated browser label is **not** authorization.
- No credentials committed; browser uses only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. **Privileged keys must never be placed in NEXT_PUBLIC variables**. Missing config means guest-safe operation, not fake sign-in.

## Observed RED and GREEN checks

- [RED GitHub Actions 40782323667](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40782323667): the integration-presence static test failed at intermediate source commit 54b215b because `<AuthControls` had not yet been mounted in `app/learning-app.tsx`; build was skipped and Vercel deployment of intermediate code was ERROR. This was an incomplete intermediate step, not evidence of faulty Google Auth.
- [GREEN GitHub Actions 40782421682](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40782421682): **22 of 22 automated tests PASS**, 0 failures, TypeScript PASS, Next.js production build PASS. [Deployed code at exact SHA 4ae69ab](https://nordljud-r2-vibe-67ce98eju-aleksi9.vercel.app) reported **READY**.
- Tests were static code/configuration assertions and existing data tests; **no live email registration, delivery, Google OAuth redirect, sign-out or session persistence was completed**.
- Dependency reproducibility limitation: previous repo had no `package-lock.json`. Direct package versions are pinned, but attempt to create a lockfile through the execution environment timed out. This means transitives remain unlocked until a lockfile is committed in a controlled environment; do not mislabel as full deterministic dependency resolution.

## Read-only account inspection (not configuration)

Supabase connection exposed three projects: `setpilot-db` (INACTIVE), `setpilot-staging` (INACTIVE), `Nordlyd-3B` (INACTIVE). **None was resumed, changed or silently attached to this V2 experiment.** Recommend a *separate V2* project authorized by the student.

Vercel project `nordljud-r2-vibe`: the verified attached domain is `https://nordljud-r2-vibe-sepia.vercel.app`. Vercel project environment variable listing returned **zero configured variables**. Project security metadata currently reports `ssoProtection.enabled=true` / `all_except_custom_domains`; public access and OAuth return to the .vercel.app domain may be gated by Deployment Protection. No protection settings were changed.

**True status: Code IMPLEMENTED; automated tests/build PASS; Vercel deployment READY; authentication provider CONFIGURATION REQUIRED and live E2E acceptance BLOCKED/PENDING.**

## Research replication boundaries

Assistant chose design and SDK details after a natural-language approved prompt; no Copilot or SDD process executed. For V3, pass equivalent neutral auth/guest requirements to isolated conditions, not V2 component code, prior fixes or existing setup decisions. Track credential access and human provider setup as separate variables.

See [V-005_MANUAL_CONFIGURATION.md](V-005_MANUAL_CONFIGURATION.md) for precise student-operated next steps.
