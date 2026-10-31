# Nordljud CORE — Phase 0 Research

Date: 2026-10-30, Europe/Helsinki. Status: research decisions complete; proposed Plan awaits student review.
Approved input: [CORE specification](spec.md), revision 0.4.0, SHA-256 `7AC546793D8EF63DA8563AB4B3CFF081374EB3ED4CFB98DE052DC0944275B2A1`.
Starting commit: `d140bc9898ef134efff7dc14ef95b2f2158ebc5f` on `condition/spec-driven`.

The installed official Spec Kit 0.12.11 Plan skill required research agents. Three read-only agents researched the web stack, authentication/persistence, and neutral source data/validation. They did not implement, install packages, run application tests, access Vibe content, or configure services. Registry and documentation observations establish proposed choices, not installed compatibility or runtime success.

## R1 — One independent application

**Decision:** One Next.js App Router application using React, TypeScript and native CSS. Server Components load the public learning shell/source; Client Components manage interactions, Guest persistence and speech. Same-origin Route Handlers mediate account progress. Use user-scoped Supabase authentication plus database RLS rather than a privileged backend key.

**Rationale:** This fits the approved technology families and bounded classroom scope without a second application server. A common domain/source adapter can power Guest practice and server-side validation. Public teaching content stays separate from private account responses.

**Alternatives:** A separate Express/backend service adds deployment and contract overhead. Direct browser database writes can be owner-secure with RLS, but a same-origin application boundary centralizes validation, revision conflicts and non-disclosing errors. Neither alternative removes RLS obligations.

Sources: [Next server/client components](https://nextjs.org/docs/app/getting-started/server-and-client-components), [Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route), [backend-for-frontend guidance](https://nextjs.org/docs/app/guides/backend-for-frontend). Vercel's [Node runtime guidance](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) is a future hosting constraint, not deployment permission.

## R2 — Exact proposed dependency baseline

**Decision:** Use the exact versions below when implementation is separately authorized. No dependency manifest, lockfile or installation is created by Plan. Create/review a real lockfile during implementation and thereafter use `npm ci`.

| Runtime/package | Exact proposed version | Primary observation source |
| --- | --- | --- |
| Node.js | 24.22.2 | [Node release index](https://nodejs.org/dist/index.json), v24 release dated 2026-10-27 |
| npm | 11.19.1 | Bundled with that Node release; [metadata](https://registry.npmjs.org/npm/11.19.1) |
| next | 16.4.3 | [metadata](https://registry.npmjs.org/next/16.4.3) |
| react | 19.3.1 | [metadata](https://registry.npmjs.org/react/19.3.1) |
| react-dom | 19.3.1 | [metadata](https://registry.npmjs.org/react-dom/19.3.1) |
| @supabase/supabase-js | 2.118.0 | [metadata](https://registry.npmjs.org/%40supabase%2Fsupabase-js/2.118.0) |
| @supabase/ssr | 0.12.7 | [metadata](https://registry.npmjs.org/%40supabase%2Fssr/0.12.7) |
| typescript | 6.0.3 | [metadata](https://registry.npmjs.org/typescript/6.0.3) |
| @types/node | 24.19.2 | [metadata](https://registry.npmjs.org/%40types%2Fnode/24.19.2) |
| @types/react | 19.3.0 | [metadata](https://registry.npmjs.org/%40types%2Freact/19.3.0) |
| @types/react-dom | 19.3.0 | [metadata](https://registry.npmjs.org/%40types%2Freact-dom/19.3.0) |
| vitest | 5.0.5 | [metadata](https://registry.npmjs.org/vitest/5.0.5) |
| vite | 8.3.5 | [metadata](https://registry.npmjs.org/vite/8.3.5) |
| @vitejs/plugin-react | 6.1.2 | [metadata](https://registry.npmjs.org/%40vitejs%2Fplugin-react/6.1.2) |
| jsdom | 30.1.3 | [metadata](https://registry.npmjs.org/jsdom/30.1.3) |
| @testing-library/react | 16.3.3 | [metadata](https://registry.npmjs.org/%40testing-library%2Freact/16.3.3) |
| @testing-library/dom | 10.4.2 | [metadata](https://registry.npmjs.org/%40testing-library%2Fdom/10.4.2) |
| @testing-library/jest-dom | 7.0.1 | [metadata](https://registry.npmjs.org/%40testing-library%2Fjest-dom/7.0.1) |
| @testing-library/user-event | 14.6.8 | [metadata](https://registry.npmjs.org/%40testing-library%2Fuser-event/14.6.8) |
| @playwright/test | 1.64.1 | [metadata](https://registry.npmjs.org/%40playwright%2Ftest/1.64.1) |
| eslint | 9.39.5 | [metadata](https://registry.npmjs.org/eslint/9.39.5) |
| eslint-config-next | 16.4.3 | [metadata](https://registry.npmjs.org/eslint-config-next/16.4.3) |

**Rationale:** These pins satisfy the observed engine/peer ranges. Supabase JS requires Node >=22; SSR 0.12.7 requires Supabase JS ^2.114.0. React/DOM match. Node 24 satisfies the selected tool engines.

**Alternatives:** Unqualified latest versions are unsuitable: observed TypeScript 7.0.2 exceeds the current typescript-eslint parser's declared `<6.1.0` range; observed ESLint 10.13.0 exceeds relevant Next-config plugin peer ranges. Sources: [typescript-eslint parser](https://registry.npmjs.org/%40typescript-eslint%2Fparser/8.72.1), [React lint plugin](https://registry.npmjs.org/eslint-plugin-react/7.37.5), [import lint plugin](https://registry.npmjs.org/eslint-plugin-import/2.32.0), [accessibility lint plugin](https://registry.npmjs.org/eslint-plugin-jsx-a11y/6.10.2).

**Limitations:** Declared compatibility is not an install/build result. The actual local read-only observation was Node `v22.15.0`, npm `10.9.2`, Git `2.47.1.windows.1`; no upgrade ran. Vercel allows a Node major such as `24.x` and rolls patches: record actual hosted build/runtime versions if hosting is later authorized rather than claiming the exact local patch is enforced remotely.

## R3 — Immutable source identity and field-level availability

**Decision:** Adapt frozen arrays without rewriting them. Use `level:zero-padded-source-ordinal` as the level-specific sense ID (for example `A2:0361`), bound to the approved source-manifest identity. Resolve a level counterpart only by a unique exact stored `(v, meaning)` pair in the target file. Never match spelling alone or silently normalize meaning strings.

**Rationale:** Read-only structural analysis found 456 unique pairs and 455 spellings in every level; pair sets and order match across all four levels. The two `sticka` rows are ordinal 361 (`knit`) and 362 (`sting, prick; to leave (colloquial)`). Ordinals are stable because these inputs are frozen. The selected level comes from the filename; the source `frequency` field spans A1–C2 inside every file and must not be mistaken for the selected teaching level.

**Alternative:** A serialized `(level, v, meaning)` key is also unique but requires a carefully versioned encoding. Do not use written spelling alone, fuzzy matching or mutable examples as identity.

| Input | Records | Exact pairs | Em-dash form words | Blank form words | Blank sv/en fields |
| --- | ---: | ---: | ---: | ---: | ---: |
| A2 | 456 | 456 | 36 | 0 | 36 / 36 |
| B1 | 456 | 456 | 29 | 3 | 29 / 29 |
| B2 | 456 | 456 | 31 | 0 | 31 / 31 |
| C1 | 456 | 456 | 31 | 1 | 31 / 31 |

Every record contains `v`, `frequency`, `meaning`, `page`, `forms`; every level has 2,280 form objects under `Inf/Imp/Pres/Pret/Sup`, with `word/sv/en`. Blank B1 preterites at ordinals 83, 86 and 229, and C1 ordinal 86, coexist with nonblank examples. Derive availability independently for each field: missing word does not erase a usable Swedish/English example. Whitespace-only or exact editorial em-dash fields are unavailable; preserve their raw strings rather than repairing them.

All four mission seeds resolve uniquely (A2 ordinal 14, B1 141, B2 140, C1 292), with all requested form fields source-present. The four raw files total 2,450,760 bytes. These are input observations, not F05 browser acceptance, linguistic validation or performance measurements. See [source manifest](../../shared-content/SOURCE_MANIFEST.md) and retained research evidence.

## R4 — Guest persistence with real browser transactions

**Decision:** Native IndexedDB stores only approved preferences and per-level/per-sense Favorites/Studied. Guest mission completion and practice outcomes remain in memory. Namespace the database for Condition B, schema version and source-manifest identity. Never create a Supabase anonymous user or import Guest data into an account.

Each read/patch/write occurs inside one overlapping `readwrite` transaction and patches only the requested field. Signal saved only on transaction completion. This preserves unrelated flags; the last successfully serialized same-flag transaction becomes current, without promising global click-time ordering. Re-read on focus and update notifications. Do not await unrelated network work inside a transaction.

**Rationale:** The [IndexedDB scheduling rules](https://www.w3.org/TR/IndexedDB/#transaction-scheduling) provide transaction ordering. A localStorage whole-snapshot read/modify/write is not atomic: [WHATWG explicitly warns against assuming locking](https://html.spec.whatwg.org/multipage/webstorage.html).

**Failures/alternatives:** Handle denied access, quota, abort/I/O failure, blocked upgrades and newer/corrupt schemas. Preserve existing data; offer truthful memory-only operation and explicit retry, with no saved claim. Close obsolete connections on versionchange; never downgrade/delete an unknown database or invent a clearing interface. No power-loss-proof durability or full offline-launch guarantee is claimed. References: [transactions](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction), [completion](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/complete_event), [IndexedDB use](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB).

## R5 — Request-scoped auth, standard PKCE and current-browser sign-out

**Decision:** Standard Supabase SSR browser/server clients with PKCE. The browser initiates email/Google flows; `/auth/callback` exchanges a returned code using the same browser's verifier. Use the default email ConfirmationURL flow, not a dependency on customized token-hash templates. Use a configured canonical origin and fixed/validated application return path; hosted callbacks never fall back to localhost.

Primary implementation evidence supports this design: [published auth-js source](https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.118.0.tgz) sends PKCE challenge/method on signup; [official Auth verify implementation](https://github.com/supabase/auth/blob/master/internal/api/verify.go) handles PKCE verification and code redirects. [Email templates](https://supabase.com/docs/guides/auth/auth-email-templates) and [PKCE documentation](https://supabase.com/docs/guides/auth/sessions/pkce-flow) describe the verification URL and same-browser verifier boundary. This is a design inference from primary sources, not an observed project flow.

Server clients are request-scoped. Use `getClaims()` for proxy refresh/token verification and `getUser()` before private operations; never authorize from cookie-loaded `getSession().user`. Apply SSR cookie updates and `setAll` cache headers. Auth/private responses are `private, no-store`, with no shared private-data cache or ISR. Standard SSR browser synchronization uses browser-readable cookies; do not promise HttpOnly protection. Use Secure under HTTPS, SameSite=Lax, framework escaping and no untrusted HTML. See [SSR clients](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs), [advanced SSR guidance](https://supabase.com/docs/guides/auth/server-side/advanced-guide), [getUser](https://supabase.com/docs/reference/javascript/auth-getuser) and [getSession](https://supabase.com/docs/reference/javascript/auth-getsession).

**Human decision PLAN-Q01:** The student selected **this browser only** for sign-out. Explicitly use local-session scope; clear local account UI/cache and keep other device sessions independent. Neither sign-out nor account switching deletes owned progress. Failed sign-out is not reported as confirmed revocation; pause private UI and retain safe Guest learning with explanatory retry feedback. Existing access tokens are not claimed universally invalid immediately. [Sign-out documentation](https://supabase.com/docs/guides/auth/signout).

**Alternatives:** Global sign-out was explicitly offered and not selected. A custom server-only HttpOnly/BFF auth scheme adds session machinery and is not the selected design. Google API tokens, additional identity scopes and custom email-template/SMTP changes are unnecessary.

## R6 — Ownership, conditional writes and identity transitions

**Decision:** Three conceptual owner-scoped state tables: level/sense flags, mission completion, and latest practice/check state. Use verified user identity, publishable key plus user JWT, server validation and RLS on every exposed table. No ordinary operation needs an elevated key.

RLS must cover SELECT/INSERT/UPDATE/DELETE, restrict existing and resulting owner, and include SELECT visibility needed by updates. No anonymous grants, mutable user-metadata authorization, permissive owner reassignment or SECURITY DEFINER bypass. [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [API keys](https://supabase.com/docs/guides/getting-started/api-keys).

Use revision-based conditional writes and unique identities, not blind whole-state upserts. Initial create races and stale expected revisions yield conflicts; never treat zero affected rows as saved. Preserve pending intent for explicit retry in the same verified identity, without an offline account queue or replay into a newly signed-in identity. Ignore/abort stale client responses after identity changes and clear private in-memory views. See [conditional updates](https://supabase.com/docs/reference/javascript/update) and [PostgreSQL isolation](https://www.postgresql.org/docs/current/transaction-iso.html). No SQL/migration or live test is generated by Plan.

## R7 — Source-backed checks, speech and validation

**Decision:** Minimal source-derived multiple-choice comprehension and verb-form checks; values and distractors must be usable, distinct frozen source fields. Controlled choices avoid inventing a fuzzy typed-answer policy. Preserve authentic Swedish; unavailable inputs disable only the affected check. One displayed check is an attempt: reveal latches no correctness credit for that attempt; an explicit fresh retry cannot rewrite the prior revealed outcome as if it was independently correct. Only the latest result is retained, not attempt history or mastery certification.

Speech requests explicitly set `sv-SE`, handle asynchronous voices and errors, and keep reading/practice usable. Real audible output needs manual evidence; voice metadata/API existence is not an audio PASS. [Speech language](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/lang), [voice changes](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event), [speech errors](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/error_event).

Use Vitest/Testing Library for pure domain logic and synchronous client interactions; use real Edge Playwright runs for Next/server/IndexedDB journeys. [Next Vitest guidance](https://nextjs.org/docs/app/guides/testing/vitest) separates async Server Components from unit-test coverage. Use existing `msedge` channel at approved 1280×800 and 360×800 CSS pixels; do not install/replace Edge. [Playwright browsers](https://playwright.dev/docs/browsers). Manual speech and real provider ownership checks stay distinct from mocks.

**Verification policy:** Genuine failing behavior tests precede implementation, followed by passing/regression runs. Missing tools/setup failures are not product RED. Preserve F01–F15 N=15; FR-020/FR-021 and observations exceeding original cases remain supplementary. All application cases are currently NOT TESTED.

## R8 — Operational boundaries and completed research

**Decision:** No new numerical latency/uptime/traffic SLA is introduced into the approved benchmark. Design for the bounded 456-record active level, load/cache it once in memory, avoid per-entry network requests, and measure/report actual behavior later without inventing a threshold-based PASS. Public-source loading requires the app host; Guest independence from Supabase is not a promise of first-load operation with no network.

D02 requires a separately authorized independent project, hosted origin, two legitimate synthetic accounts and allowed email delivery. Current [SMTP guidance](https://supabase.com/docs/guides/auth/auth-smtp) restricts default delivery; [June 2026 template restrictions](https://supabase.com/changelog/46599-changes-to-email-template-customisation-on-free-tier) must not lead to silently paid/custom SMTP. No service is assumed available, and no provider setup or spending is authorized. D03 rights/educational review remains required before public teaching-data publication.

The Supabase researcher fetched [the public changelog](https://supabase.com/changelog.md) first. When the web reader rejected Markdown, read-only HTTP retrieval succeeded. Relevant [TLS](https://supabase.com/changelog/cbc-tls-ciphers-deprecated) and [Postgres minor-release](https://supabase.com/changelog/postgres-15-19-17-11-breaking-changes) notes were reviewed; no project/runtime change followed.

All Phase 0 design unknowns are resolved into the choices above, including the explicit sign-out answer. Unavailable D02/D03 prerequisites are recorded deployment/test/publication gates, not invented completed setup. Phase 1 may now document these designs. It does not authorize Checklist, Tasks, Analyze, Implement, Converge, application execution, commit or push.
