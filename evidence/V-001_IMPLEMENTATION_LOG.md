# V-001 implementation log — first Vibe Coding increment

**Exact user-approved input:** [V-001_APPROVED_PROMPT.md](V-001_APPROVED_PROMPT.md) (committed before any source change, commit `a832e3fa663b3d0bbb9382bc57eb44fe000ce190`).

**Status at code creation:** AI-authored implementation committed; GitHub Actions and real browser results NOT YET VERIFIED.

## What was built from the user's natural request
- Standalone Next.js + React + TypeScript learning app in the **Vibe branch only**.
- Four selectable Swedish levels A2, B1, B2, C1.
- One interactive lesson for each level, based on the existing four mission seeds and source bilingual example sentences.
- A translation reveal/hide option, browser Swedish text-to-speech request (where available), and a simple multiple-choice translation exercise with immediate feedback.
- Responsive basic styling and three simple data sanity tests.
- An initial independent GitHub Actions typecheck/test/build pipeline.

## Intentionally not implemented
Authentication, cloud progress persistence, the complete 456-sense explorer, favorites, separate SDD implementation, deployment, real two-account checks. Those are **later requested increments** and may not be claimed as working after V-001.

## Provenance / real workflow
The student's exact text was supplied on 28 October 2026 after an earlier assistant-drafted V-001 candidate, and was saved in Git before generating these files. ChatGPT, using the connected GitHub integration, authored source and committed directly. No interactive GitHub Copilot session was used for this Vibe step. No historic Nordljud UI/auth source was read or transplanted in this increment. The preexisting shared teaching data was used as requested.

## Verification still to do
1. Examine actual GitHub Actions job output; do not count globally green workflows as all steps passing without inspection.
2. Open a running browser preview and check all four levels and exercise choices; no browser test has been performed just by committing source.
3. Record the student's actual observation and next approved corrective prompt (V-002). Never invent user feedback.

**Reproducibility note:** Direct npm package versions were pinned (including Next 15.5.28, chosen because of a security patch issued 14 October 2026), but no resolved npm lockfile was generated at initial source authoring. This is a known limitation to address in a later review, not concealed.
