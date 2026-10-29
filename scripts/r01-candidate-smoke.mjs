// R01 optional HTTP smoke for a specific immutable Vercel candidate URL.
// HTTP 200 + app heading is NOT evidence of real auth, E2E or accessibility.
const approvedHost = (host) => /^([a-z0-9-]+\.)+vercel\.app$/.test(host);
export function parseCandidateUrl(raw) {
  if(typeof raw!=="string"||!raw.trim())throw new Error("Missing exact candidate deployment URL");
  const url=new URL(raw);
  if(url.protocol!=="https:"||url.username||url.password||url.search||url.hash||url.pathname!=="/"||!approvedHost(url.hostname))
    throw new Error("Expected an HTTPS Vercel deployment URL without credentials, query or custom path");
  return url;
}
export async function smokeCandidate(raw,fetcher=fetch) {
  const url=parseCandidateUrl(raw);
  const response=await fetcher(url.toString(),{
    method:"GET",redirect:"error",signal:AbortSignal.timeout(12000),
    headers:{"accept":"text/html"}
  });
  if(!response.ok)throw new Error("Candidate HTTP status "+response.status);
  const type=response.headers.get("content-type")??"";
  if(!type.includes("text/html"))throw new Error("Expected HTML response");
  const body=await response.text();
  if(!/Nordljud/i.test(body))throw new Error("Expected Nordljud app marker in HTML");
  return {status:response.status,host:url.hostname,check:"HTTP/HTML/marker only"};
}
if(process.argv[1] && import.meta.url===new URL("file://"+process.argv[1]).href){
  const value=process.env.R01_CANDIDATE_URL;
  if(!value){console.log("NOT TESTED: R01_CANDIDATE_URL is unset; candidate HTTP smoke was skipped.");}
  else smokeCandidate(value).then(x=>console.log("HTTP SMOKE PASS (not E2E):",JSON.stringify(x)))
    .catch(e=>{console.error("HTTP SMOKE FAIL:",e.message);process.exitCode=1;});
}
