import {readFileSync,existsSync,statSync} from "node:fs";
import {resolve,relative,isAbsolute} from "node:path";
import {pathToFileURL} from "node:url";
import {createHash} from "node:crypto";
const IDS=Array.from({length:15},(_,index)=>`F${String(index+1).padStart(2,"0")}`);
const STATES=["PASS","FAIL","BLOCKED","NOT TESTED"];
const KINDS=["browser","source","unit-contract","build","audit","manual","live-account"];
const object=value=>value!==null&&typeof value==="object"&&!Array.isArray(value);
const text=value=>typeof value==="string"&&value.trim().length>0;
function sameRevision(a,b){return object(a)&&object(b)&&a.baseCommit===b.baseCommit&&a.dirty===b.dirty&&a.artifactDigest===b.artifactDigest;}
function inside(root,name){if(!text(name)||isAbsolute(name))return null;const target=resolve(root,name),rel=relative(root,target);return rel.startsWith("..")||isAbsolute(rel)?null:target;}
/** Documentary integrity only. Actual feature observations still require review. */
export function verifyLedger(ledger,repositoryRoot){
 const errors=[];
 if(!object(ledger))return ["Ledger must be an object"];
 if(ledger.schemaVersion!==1||ledger.condition!=="SDD"||ledger.scope!=="CORE"||ledger.primaryDenominator!==15)errors.push("Expected SDD CORE schema version 1 and the original denominator 15");
 const snapshot=ledger.snapshot;
 if(!object(snapshot)||!/^[0-9a-f]{40}$/i.test(snapshot.baseCommit??"")||typeof snapshot.dirty!=="boolean"||!/^[0-9a-f]{64}$/i.test(snapshot.artifactDigest??""))errors.push("A precise clean/dirty tested snapshot and digest are required");
 if(!Array.isArray(ledger.cases))return [...errors,"All fifteen case rows are required"];
 const ids=ledger.cases.map(row=>row?.id);
 if(ids.length!==15||new Set(ids).size!==15||IDS.some(id=>!ids.includes(id)))errors.push("Case identities must be exactly F01 through F15, once each");
 for(const [index,row] of ledger.cases.entries()){
  if(!object(row)){errors.push(`Case row ${index+1} must be an object`);continue;}
  const label=IDS.includes(row.id)?row.id:`row ${index+1}`;
  if(!STATES.includes(row.status))errors.push(`${label}: unsupported result state`);
  if(!text(row.expected)||!text(row.actual))errors.push(`${label}: expected and actual observations are required`);
  if(!sameRevision(row.testedRevision,snapshot))errors.push(`${label}: tested revision differs from the declared snapshot; dirty work cannot be claimed as a clean base`);
  if(!Array.isArray(row.evidence)){errors.push(`${label}: evidence must be an array`);continue;}
  if(row.status==="PASS"&&row.evidence.length===0)errors.push(`${label}: PASS requires actual supporting evidence`);
  for(const item of row.evidence){
   if(!object(item)||!KINDS.includes(item.kind)||!text(item.path)){errors.push(`${label}: evidence requires a supported kind and path`);continue;}
   if(repositoryRoot){const target=inside(repositoryRoot,item.path);if(!target||!existsSync(target)||!statSync(target).isFile())errors.push(`${label}: supporting evidence path is missing or outside the repository`);}
  }
  if(row.status==="PASS"&&["F01","F02","F04","F05","F06","F07","F08","F13"].includes(row.id)&&!row.evidence.some(item=>item.kind==="browser"))errors.push(`${label}: browser observations are required; unit/build checks do not establish this case`);
  if(row.status==="PASS"&&row.id==="F03"&&!row.evidence.some(item=>item.kind==="browser"||item.kind==="manual"))errors.push("F03: an actual browser/manual speech observation is required");
  if(row.status==="PASS"&&row.id==="F14"&&(!row.evidence.some(item=>item.kind==="browser")||!row.evidence.some(item=>item.kind==="audit")))errors.push("F14: delivered artifact audit and observable failure checks are both required");
  if(row.status==="PASS"&&row.id==="F15"&&!row.evidence.some(item=>item.kind==="build"))errors.push("F15: actual toolchain/build evidence is required");
  if(row.status==="PASS"&&["F09","F10","F11","F12"].includes(row.id)&&!row.evidence.some(item=>item.kind==="live-account"&&item.observed===true))errors.push(`${label}: unit mocks, checklists and builds cannot establish live account PASS`);
  if(row.status==="PASS"&&row.id==="F13"&&row.coverage?.loginVerified!==true)errors.push("F13: Guest-only viewport coverage cannot establish the complete login accessibility case");
 }
 if(!Array.isArray(ledger.supplementary))errors.push("Supplementary observations must remain outside the primary cases");
 if(repositoryRoot&&!text(snapshot?.artifactManifest))errors.push("Repository verification requires a tested runtime artifact manifest");
 if(repositoryRoot&&text(snapshot?.artifactManifest)){
  const target=inside(repositoryRoot,snapshot.artifactManifest);
  if(!target||!existsSync(target))errors.push("Tested artifact manifest is missing");
  else{
   try{
    const manifest=JSON.parse(readFileSync(target,"utf8"));const entries=Object.entries(manifest.files??{}).sort(([a],[b])=>a<b?-1:a>b?1:0);
    if(!object(manifest.files)||entries.length===0)errors.push("Runtime artifact manifest must contain nonempty file identities");
    for(const required of ["package.json","package-lock.json","src/app/page.tsx","src/domain/contracts.ts"])if(!Object.hasOwn(manifest.files??{},required))errors.push("Runtime artifact manifest omits a required implementation artifact");
    if(manifest.baseCommit!==snapshot.baseCommit||manifest.dirty!==snapshot.dirty)errors.push("Manifest capture metadata differs from the tested snapshot");
    const digest=createHash("sha256");
    for(const [name,expected] of entries){if(typeof expected!=="string"||!/^[0-9a-f]{64}$/i.test(expected))errors.push("Runtime artifact manifest contains an invalid file identity");const file=inside(repositoryRoot,name);if(!file||!existsSync(file)||createHash("sha256").update(readFileSync(file)).digest("hex")!==expected)errors.push("A tested runtime artifact differs from its recorded bytes");digest.update(`${name}\0${expected}\n`);}
    if(digest.digest("hex")!==snapshot.artifactDigest)errors.push("Tested artifact manifest digest mismatch");
   }catch{errors.push("Tested artifact manifest could not be verified");}
  }
 }
 return errors;
}
if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url){
 try{
  const ledger=JSON.parse(readFileSync(resolve(process.cwd(),process.argv[2]??"evaluation/sdd-core-results.json"),"utf8"));const errors=verifyLedger(ledger,process.cwd());
  const counts=Object.fromEntries(STATES.map(state=>[state,ledger.cases?.filter(row=>row.status===state).length??0]));
  console.log(JSON.stringify({documentaryIntegrity:errors.length===0?"PASS":"FAIL",primaryDenominator:15,counts,errors},null,2));process.exitCode=errors.length?1:0;
 }catch{console.error("Evidence ledger is unavailable or invalid; no runtime acceptance inferred.");process.exitCode=1;}
}
