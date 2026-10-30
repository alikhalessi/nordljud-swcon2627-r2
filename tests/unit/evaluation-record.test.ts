import {describe,it,expect} from "vitest";
import {verifyLedger} from "../../scripts/verify-core-evidence.mjs";
const revision={baseCommit:"d140bc9898ef134efff7dc14ef95b2f2158ebc5f",dirty:true,artifactDigest:"a".repeat(64)};
function ledger(){return {schemaVersion:1,condition:"SDD",scope:"CORE",primaryDenominator:15,snapshot:{...revision},cases:Array.from({length:15},(_,i)=>({id:`F${String(i+1).padStart(2,"0")}`,status:"NOT TESTED",expected:"Original observable acceptance expectation",actual:"No runtime observation for this synthetic unit fixture.",evidence:[] as {path:string;kind:string}[],testedRevision:{...revision}})),supplementary:[]};}
describe("derived acceptance ledger integrity; documentary validator, not runtime acceptance",()=>{
 it("retains exactly the fifteen original IDs even when nothing was tested",()=>{expect(verifyLedger(ledger())).toEqual([]);});
 it("rejects a dropped/duplicated case or denominator change",()=>{const missing=ledger();missing.cases.pop();expect(verifyLedger(missing).length).toBeGreaterThan(0);const duplicate=ledger();duplicate.cases[14].id="F01";expect(verifyLedger(duplicate).length).toBeGreaterThan(0);const changed=ledger();changed.primaryDenominator=8;expect(verifyLedger(changed).length).toBeGreaterThan(0);});
 it("rejects unknown states and unsupported PASS without actual evidence",()=>{const invalid=ledger();invalid.cases[0].status="COMPLETE";expect(verifyLedger(invalid).length).toBeGreaterThan(0);const unsupported=ledger();unsupported.cases[0].status="PASS";expect(verifyLedger(unsupported).length).toBeGreaterThan(0);});
 it("rejects mock-based live authentication and partial login accessibility PASS",()=>{const mocked=ledger();mocked.cases[8].status="PASS";mocked.cases[8].evidence=[{path:"tests/unit/auth-contract.test.ts",kind:"unit-contract"}];expect(verifyLedger(mocked).length).toBeGreaterThan(0);const partial=ledger();partial.cases[12].status="PASS";partial.cases[12].evidence=[{path:"tests/e2e/accessibility.spec.ts",kind:"browser"}];expect(verifyLedger(partial).length).toBeGreaterThan(0);});
 it("rejects a dirty tested tree being reported as a clean base revision",()=>{const misleading=ledger();misleading.cases[0].testedRevision.dirty=false;expect(verifyLedger(misleading).length).toBeGreaterThan(0);});
 it("rejects browser acceptance claims supported only by unit or build checks",()=>{
  const onlyUnit=ledger();onlyUnit.cases[0].status="PASS";onlyUnit.cases[0].evidence=[{path:"tests/unit/source-contract.test.ts",kind:"unit-contract"}];expect(verifyLedger(onlyUnit).length).toBeGreaterThan(0);
  const onlyBuild=ledger();onlyBuild.cases[7].status="PASS";onlyBuild.cases[7].evidence=[{path:"package.json",kind:"build"}];expect(verifyLedger(onlyBuild).length).toBeGreaterThan(0);
 });
 it("requires a nonempty runtime manifest for repository snapshot verification",()=>{
  const missing=ledger();expect(verifyLedger(missing,process.cwd()).length).toBeGreaterThan(0);
  const empty=ledger();const digest="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";empty.snapshot.artifactDigest=digest;Object.assign(empty.snapshot,{artifactManifest:"tests/fixtures/empty-artifact-manifest.json"});for(const row of empty.cases)row.testedRevision.artifactDigest=digest;
  expect(verifyLedger(empty,process.cwd()).length).toBeGreaterThan(0);
 });
});
