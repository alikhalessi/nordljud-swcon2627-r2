# Actual local toolchain

- Node 24.22.2 / npm 11.19.1, isolated outside the repository; official ZIP checksum verified in T002. System Node/npm were not replaced.
- git version 2.47.1.windows.1; host reported `Windows-10-10.0.26300-SP0` (Windows NT build information, not a physical-device certification).
- Existing Microsoft Edge 156.0.4314.50; Playwright 1.64.1, headless Windows profiles 1280×800 and 360×800 CSS pixels.
- Exact direct pins are in package.json; actual resolved transitive dependencies in package-lock.json. `npm ci --ignore-scripts --no-audit --no-fund` installed 441 packages. Lifecycle scripts were suppressed; build/test success establishes the used local path, not all-platform compatibility. The ESLint pin's deprecation/support warning is retained in T004; no vulnerability audit is claimed.

Commands, real exit codes and timestamps remain in T002–T008/T074/T079 JSONL. The private machine launcher selects the isolated runtime explicitly.
