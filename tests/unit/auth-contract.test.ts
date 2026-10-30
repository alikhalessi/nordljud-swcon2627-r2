import {describe,it,expect,vi} from "vitest";
import {canonicalCallback,completeCallback,freshOwner,readAuthConfiguration,safeMutationRequest,signOutThisBrowser} from "../../src/auth/policy";
import type {AuthPort} from "../../src/auth/policy";
const config={url:"https://synthetic-project.supabase.co",publishableKey:"sb_publishable_synthetic_test_only",canonicalOrigin:"https://learning.example.test"};
const owner="11111111-1111-4111-8111-111111111111";
function auth(){return {getUser:vi.fn(async()=>({data:{user:{id:owner}},error:null})),exchangeCodeForSession:vi.fn(async()=>({error:null})),signOut:vi.fn(async()=>({error:null}))};}
describe("offline authentication contracts; mocked SDK, never live auth proof",()=>{
 it("remains unavailable unless explicitly enabled with public-only complete configuration",()=>{
  expect(readAuthConfiguration({})).toBeNull();
  const env={NORDLJUD_ACCOUNT_ENABLED:"1",NEXT_PUBLIC_SUPABASE_URL:config.url,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:config.publishableKey,NORDLJUD_APP_ORIGIN:config.canonicalOrigin};
  expect(readAuthConfiguration(env)).toEqual(config);
  expect(readAuthConfiguration({...env,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:"sb_secret_synthetic-do-not-use"})).toBeNull();
  expect(readAuthConfiguration({...env,NORDLJUD_APP_ORIGIN:"https://user:password@learning.example.test"})).toBeNull();
  expect(readAuthConfiguration({...env,NORDLJUD_APP_ORIGIN:"https://learning.example.test/path"})).toBeNull();
 });
 it("uses only the canonical hosted callback, with no forwarded-host or arbitrary next target",()=>{
  expect(canonicalCallback(config)).toBe("https://learning.example.test/auth/callback");
  expect(canonicalCallback({...config,canonicalOrigin:"https://evil.example/path"})).toBeNull();
  expect(canonicalCallback({...config,canonicalOrigin:"http://localhost:3100"})).toBeNull();
 });
 it("requires exact same-origin JSON mutation requests",()=>{
  expect(safeMutationRequest(new Request("https://learning.example.test/api/me/progress",{method:"PUT",headers:{Origin:config.canonicalOrigin,"Content-Type":"application/json"}}),config)).toBe(true);
  for(const headers of ([{Origin:"https://other.example.test","Content-Type":"application/json"},{Origin:config.canonicalOrigin,"Content-Type":"text/plain"},{"Content-Type":"application/json"}] as Record<string,string>[])) expect(safeMutationRequest(new Request("https://learning.example.test/api/me/progress",{method:"PUT",headers}),config)).toBe(false);
 });
 it("derives the owner only from a fresh getUser result",async()=>{
  const client=auth();expect(await freshOwner(client)).toBe(owner);expect(client.getUser).toHaveBeenCalledOnce();
  const failed={...client,getUser:vi.fn(async()=>({data:{user:{id:owner}},error:new Error("synthetic-private-error")}))};expect(await freshOwner(failed)).toBeNull();
 });
 it("refuses missing, duplicate, oversized or unsafe callback contexts before exchange",async()=>{
  for(const [query,verifier] of [["code=valid",false],["",true],["code=a&code=b",true],["code=a&next=https://evil.example",true],[`code=${"x".repeat(2049)}`,true]] as const){const client=auth();expect((await completeCallback(client,new URLSearchParams(query),verifier)).status).toBe("unavailable");expect(client.exchangeCodeForSession).not.toHaveBeenCalled();}
 });
 it("exchanges once and verifies the returned owner before declaring authentication",async()=>{
  const client=auth();expect(await completeCallback(client,new URLSearchParams("code=synthetic-code"),true)).toEqual(expect.objectContaining({status:"authenticated",ownerId:owner}));expect(client.exchangeCodeForSession).toHaveBeenCalledExactlyOnceWith("synthetic-code");expect(client.getUser).toHaveBeenCalledOnce();
 });
 it("reports expired/replayed exchange failures without disclosing SDK exception details",async()=>{
  const client=auth();client.exchangeCodeForSession.mockResolvedValue({error:new Error("SYNTHETIC_PRIVATE_EXCEPTION") } as unknown as {error:null});
  const result=await completeCallback(client,new URLSearchParams("code=synthetic-code"),true);expect(result.status).toBe("unavailable");expect(result.message).not.toContain("SYNTHETIC_PRIVATE_EXCEPTION");expect(client.getUser).not.toHaveBeenCalled();
 });
 it("uses explicit local sign-out and does not promise account-wide revocation",async()=>{
  const client=auth();expect((await signOutThisBrowser(client)).status).toBe("signed-out");expect(client.signOut).toHaveBeenCalledExactlyOnceWith({scope:"local"});
  const unavailable:AuthPort={...client,signOut:async()=>({error:new Error("synthetic-provider-failure")})};expect((await signOutThisBrowser(unavailable)).status).toBe("unavailable");
 });
});
