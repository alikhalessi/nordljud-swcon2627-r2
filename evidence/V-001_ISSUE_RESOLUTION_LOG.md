# V-001 — Authentic issue-resolution and release chronology (retrospective audit)

**Audit date:** 2026-10-28, Europe/Helsinki. **Implementation:** V2-A / Vibe Coding.  
**This file was assembled retrospectively** by reading existing Git commits, GitHub Actions workflow logs, Vercel deployment records and user-supplied browser screenshots in the conversation. It is **not** a contemporaneous agent prompt or evidence that the student independently fixed the issues.

## Prompt provenance and original scope

- [The exact V-001 approved prompt](V-001_APPROVED_PROMPT.md) was committed before app code, in [commit `a832e3f`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/a832e3fa663b3d0bbb9382bc57eb44fe000ce190). It was based on an assistant draft which the student edited and resubmitted in full.
- The initial user request explicitly scoped the work to a **simple first learning part** with A2/B1/B2/C1 and one exercise. It did *not* explicitly request a searchable 456-entry-per-level vocabulary explorer or completed login/progress features at this point.
- ChatGPT wrote and committed the app using the connected GitHub integration. No separate GitHub Copilot, Gemini or other independent coding agent was used for the V-001 implementation.

## Issue 1: TypeScript narrowing error during first CI

| Evidence | Observed result |
|---|---|
| [Initial implementation `974ff5f`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/974ff5fe2617dfbf632b2f36569d8f4b4a016d17) | First Next.js + React + TypeScript increment; fixed one lesson per level, browser speech and quiz |
| [GitHub Actions run `40681873875`](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40681873875) | **FAIL**: npm install success; **3/3 dataset tests PASS**; TypeScript **FAIL** with `TS18048`; production build **SKIPPED**, not passed |
| Exact diagnostic | `app/learning-app.tsx(55,52): error TS18048: 'lesson' is possibly 'undefined'.` |
| Code diagnosis | Inside `LearningApp`, a render-time guard narrowed `lesson` for synchronous use, but nested `playSwedish()` callback later used `lesson.swedish`. Strict TypeScript could not guarantee the narrowed value inside that callback |
| Fix | After the guard, store `const currentSentence = lesson.swedish;`; use `new SpeechSynthesisUtterance(currentSentence)` instead of `new SpeechSynthesisUtterance(lesson.swedish)` |
| [Fix commit `39e3625`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/39e36252568186e35264a24044557f59a1bbdf75) | Minimal change in `app/learning-app.tsx`, along with updated evidence records. No changes to original user-approved prompt or shared Swedish data |
| [GitHub Actions run `40682028306`](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40682028306) | **SUCCESS**: 3/3 dataset tests, TypeScript typecheck, and Next.js production build all passed |

**Who authorized the fix?** The original V-001 prompt authorized building a working first increment. No distinct, fully written **student-approved corrective prompt** for TS18048 was submitted. ChatGPT independently diagnosed and made the code correction. This fact must not be rewritten as a student instruction or separate Copilot interaction.

## Issue 2: Initial Vercel deployment targeted the wrong branch

- The student created the Vercel project `nordljud-r2-vibe`, connected to the same GitHub repository.
- [First Vercel production deployment at baseline `90e4f6d`](https://vercel.com/aleksi9/nordljud-r2-vibe), from branch **`main`**, ended in **ERROR**. The screenshot showed `NEXT_NO_VERSION` / no detected Next.js version. This was a *configuration/source-selection error*: `main` was the data/documentation baseline and did not contain the Vibe Next.js application. It was **not** evidence that the corrected Vibe code failed to build.
- Student navigated Vercel's **Production Branch Tracking** to `condition/vibe`. Because no deployment of that branch existed yet, the UI displayed a `No deployments found for 'condition/vibe'` warning. The student then opened **Deployments → Create Deployment**, selected `condition/vibe`, and initiated a Production deploy.
- [Production deployment with `39e3625`](https://vercel.com/aleksi9/nordljud-r2-vibe/FWSArWFphWWxZJnUvkroW8JEUHWk), branch `condition/vibe`, was verified from Vercel's deployment list as **READY**.
- The student first opened `https://nordljud-r2-vibe.vercel.app`, saw `404 DEPLOYMENT_NOT_FOUND`, and then opened `https://nordljud-r2-vibe-sepia.vercel.app`, seeing the actual V-001 learner interface in the browser. **The generic domain did not work at that observation point; the separate working alias did.** Do not conflate DNS/alias configuration with code correctness or claim all domains were working.
- The student's screenshot showed a real lesson at B1 and then A2; it did not establish a complete end-to-end acceptance test of every control, audio output, security or performance.

**Who executed the deployment resolution?** The student operated Vercel manually following ChatGPT's chat instructions; ChatGPT did **not** deploy with a connected Vercel account or browser automation. The assistant suggested branch selection and deployment creation, not an exact separately approved coding prompt.

## Issue 3: Functional coverage gap discovered by student after V-001

- The student reported the application showed only one fixed verb at each level and no option to browse the full vocabulary or choose a verb.
- That is a **requirements-discovery / scope gap** in the narrowly scoped first prompt, not a TypeScript or Vercel bug.
- The subsequent feature request was drafted and **explicitly approved** by the student as [V-002](V-002_APPROVED_PROMPT.md) and saved in [commit `43c742a`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/43c742aae26ef3aa3f53ceeaccf1627e6d0bae5b) *before V-002 code*.
- Do **not** retroactively attribute V-002 search/explorer functions to V-001 or call V-001 a fully complete Nordljud product.

## Distinguish actual inputs from retrospective analysis

| Stage | Exact student-approved feature prompt? | Who acted? | Status |
|---|---|---|---|
| Original V-001 increment | Yes, preserved verbatim | Student approved; ChatGPT authored source through GitHub | Implemented |
| TS18048 correction | **No separate correction prompt** | ChatGPT interpreted CI and patched code | RED and GREEN runs preserved |
| Vercel branch/deployment correction | **No separate coding prompt** | Student clicked UI following ChatGPT guidance | Original ERROR and successful READY preserved |
| Vocabulary Explorer requirement | Yes, later V-002 approved verbatim | Student gave feedback and approved next feature prompt | Belongs to V-002, not V-001 |

## What automated checks do NOT prove

Three passing initial data tests and one successful production build do not prove browser-based speech output, every lesson's pedagogy, grammar/semantic quality, security or full user requirement coverage. Manual audio confirmation was not received at V-001. Direct npm versions were pinned but the initial implementation had no committed lockfile, reducing exact dependency resolution reproducibility.

## Reuse in Version 3 — no silent knowledge leakage

- **Neutral reusable requirement**: Swedish learning levels, user-selectable vocabulary, examples, translation assistance, and audibly testable Swedish pronunciation; preserve shared teaching-data provenance.
- **V3 Vibe**: replay the exact frozen original V-001 / later V-002+ approved prompts (and only conditionally replay follow-up defect feedback under a predeclared rule). Avoid handing it V-001's error analysis, finished fixes or code.
- **V3 SDD**: give equivalent neutral feature targets, measurable acceptance criteria and original shared input data, then use actual official Spec Kit workflow in an isolated environment. Do not hand it V-001's solution code or use TS18048 patch as an instruction.
- This file lives only with the V2 historical evidence and the final evaluation package; do not copy it into either isolated V3 implementation repository or ChatGPT Project. The student's experience and informed ordering remain confounds to disclose.
- Record the *observed* prompt count, actual errors, and correction events separately. There is no basis to fabricate elapsed active time, extra assistant prompts, or another agent identity.

**Evidence status:** GitHub commit / CI SHA and Vercel status grounded in actual connected-system records. Screenshots and manual browser observations are grounded in the student's live conversation evidence; they have not been separately uploaded as certified artifacts here.
