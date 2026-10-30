# Reproduce the actual local CORE increment

Use package.json's exact Node 24.22.2/npm 11.19.1 runtime, the committed lockfile and existing Microsoft Edge. On this machine an isolated checksum-verified runtime was used outside Git; the private Start_Nordljud_CORE.ps1 selects it. The system runtime remains unchanged.

From the repository root, with the approved Node runtime on this shell's PATH:

```powershell
$env:NEXT_TELEMETRY_DISABLED = '1'
$env:NORDLJUD_ACCOUNT_ENABLED = '0'
$env:NEXT_PUBLIC_SUPABASE_URL = ''
$env:NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = ''
npm ci --ignore-scripts --no-audit --no-fund
npm run typecheck
npm run lint
npm run test:sources
npm test
npm run build
npm run test:e2e
node scripts/verify-core-evidence.mjs
npm start
```

Open http://127.0.0.1:3100. A busy port is reported, never reused or killed. Browser tests manage their own independent server; stop a separately launched demo before running them. Default suites discover offline unit and Guest browser cases only. test:rls/test:e2e:account additionally require real D_TEST target authorization and scoped credentials before any live action; their unimplemented files and D02 environment remain pending. Do not use these commands as permission to configure a provider.

T002/T004/T074/T079 retain actual versions, installation/command output and exits. The ledger names the dirty base plus tested artifact manifest; no clean-checkout run or clean fixed-SHA run is invented. Raw-byte manifests are checkout-sensitive under core.autocrlf=true: CRLF conversion may change raw hashes on another checkout. Never normalize protected files in this working tree; approved Git blobs and exact retained working bytes are separately verified.

Protected source counts remain 456 senses/455 spellings at each level, 1,824 level-specific records, four missions. D01 is Edge/Windows at the two recorded CSS sizes. Audio was requested, not heard/quality-rated. This is a second informed iteration; no Vibe source/retrospective was consulted during coding, and no causal superiority or full CORE result follows. D02/D03 remain named limits.
