import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const packageFile = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const workflow = readFileSync(new URL("../.github/workflows/vibe-first-check.yml", import.meta.url), "utf8");

test("R01: clean dependency installation is reproducible with a lockfile", () => {
  const url = new URL("../package-lock.json", import.meta.url);
  assert.ok(existsSync(url), "package-lock.json must be checked into the repository");
  const lock = JSON.parse(readFileSync(url, "utf8"));
  assert.equal(lock.lockfileVersion, 3);
  assert.equal(lock.packages[""].name, packageFile.name);
  for(const section of ["dependencies","devDependencies"])
    for(const [name, version] of Object.entries(packageFile[section]))
      assert.equal(lock.packages[""][section][name], version, name);
  assert.match(workflow, /npm ci --no-audit --no-fund/);
  assert.doesNotMatch(workflow, /run: npm install/);
});

test("R01: CI tests code on isolated hardening branch and on PR before candidate acceptance", () => {
  assert.match(workflow, /hardening\/v008-r01/);
  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run typecheck/);
  assert.match(workflow, /npm run build/);
  assert.doesNotMatch(workflow, /vercel (?:deploy|promote|rollback)|supabase db push|supabase migration up/);
});

test("R01: publish requires a human-approved SHA, not a GREEN workflow alone", () => {
  const release = readFileSync(new URL("../docs/R01_CONTROLLED_RELEASE_RUNBOOK.md", import.meta.url), "utf8");
  assert.match(release, /separate.*[Aa]pproval/s);
  assert.match(release, /condition\/vibe/);
  assert.match(release, /hardening\/v008-r01/);
  assert.match(release, /RED.*GREEN/s);
  assert.match(release, /BLOCKED/);
  assert.match(release, /[Rr]ollback/);
  assert.match(release, /[Cc]andidate/);
});
