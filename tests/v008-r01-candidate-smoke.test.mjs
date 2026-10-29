import test from "node:test";
import assert from "node:assert/strict";
import { parseCandidateUrl,smokeCandidate } from "../scripts/r01-candidate-smoke.mjs";

test("R01: smoke refuses private/non-Vercel URLs, credentials and non-root paths",()=>{
  for(const bad of [
    "http://abc.vercel.app/","http://localhost:3000/","https://127.0.0.1/",
    "https://example.org/","https://x.vercel.app/private",
    "https://x.vercel.app/?token=abc","https://u:password@x.vercel.app/"
  ]) assert.throws(()=>parseCandidateUrl(bad));
  assert.equal(parseCandidateUrl("https://nordljud-r2-vibe-example.vercel.app/").hostname,
    "nordljud-r2-vibe-example.vercel.app");
});

test("R01: HTTP check requires 2xx HTML with app identity; never claims authenticated E2E",async()=>{
  const target="https://example-deployment.vercel.app/";
  const fake=(status,ctype,text)=>async()=>({
    status,ok:status>=200&&status<300,headers:new Map([["content-type",ctype]]),
    text:async()=>text
  });
  await assert.rejects(smokeCandidate(target,fake(404,"text/html","Nordljud")),/404/);
  await assert.rejects(smokeCandidate(target,fake(200,"application/json","Nordljud")),/HTML/);
  await assert.rejects(smokeCandidate(target,fake(200,"text/html","other app")),/marker/);
  const r=await smokeCandidate(target,fake(200,"text/html","<title>Nordljud</title>"));
  assert.equal(r.status,200);
  assert.equal(r.check,"HTTP/HTML/marker only");
});
