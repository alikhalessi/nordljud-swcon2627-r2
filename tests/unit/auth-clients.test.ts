import {beforeEach,describe,it,expect,vi} from "vitest";
import {NextResponse} from "next/server";
const sdk=vi.hoisted(()=>({server:vi.fn(),browser:vi.fn()}));
vi.mock("@supabase/ssr",()=>({createServerClient:sdk.server,createBrowserClient:sdk.browser}));
import {createRequestAuth,hasPkceVerifier} from "../../src/auth/server";
import {createBrowserAuth} from "../../src/auth/browser";
import type {CookieWrite} from "../../src/auth/server";
const config={url:"https://synthetic-project.supabase.co",publishableKey:"sb_publishable_synthetic_test_only",canonicalOrigin:"https://learning.example.test"};
beforeEach(()=>{sdk.server.mockReset().mockReturnValue({auth:{getUser:vi.fn()}});sdk.browser.mockReset().mockReturnValue({auth:{}});});
describe("SDK construction/cookie contracts, mocked and offline",()=>{
 it("does not create clients when configuration is unavailable",()=>{expect(createRequestAuth(null,{getAll:()=>[]})).toBeNull();expect(createBrowserAuth(null)).toBeNull();expect(sdk.server).not.toHaveBeenCalled();expect(sdk.browser).not.toHaveBeenCalled();});
 it("creates request-scoped clients with isolated cookies and SDK cache updates",()=>{
  const first=createRequestAuth(config,{getAll:()=>[{name:"synthetic-a",value:"a"}]}),second=createRequestAuth(config,{getAll:()=>[{name:"synthetic-b",value:"b"}]});
  expect(first).not.toBeNull();expect(second).not.toBeNull();expect(sdk.server).toHaveBeenCalledTimes(2);
  const a=sdk.server.mock.calls[0][2] as {cookies:{getAll:()=>unknown;setAll:(writes:CookieWrite[],headers:Record<string,string>)=>void}};
  const b=sdk.server.mock.calls[1][2] as typeof a;
  expect(a.cookies.getAll()).toEqual([{name:"synthetic-a",value:"a"}]);expect(b.cookies.getAll()).toEqual([{name:"synthetic-b",value:"b"}]);
  a.cookies.setAll([{name:"synthetic-refresh",value:"synthetic-value",options:{path:"/",secure:true,sameSite:"lax"}}],{"Expires":"0","Pragma":"no-cache","Cache-Control":"private, no-cache, no-store, must-revalidate, max-age=0"});
  const response=first!.apply(NextResponse.json({ok:true})),other=second!.apply(NextResponse.json({ok:true}));
  expect(response.cookies.get("synthetic-refresh")?.value).toBe("synthetic-value");expect(other.cookies.get("synthetic-refresh")).toBeUndefined();expect(response.headers.get("cache-control")).toContain("private");expect(response.headers.get("cache-control")).toContain("no-store");expect(response.headers.get("expires")).toBe("0");expect(response.headers.get("pragma")).toBe("no-cache");
 });
 it("uses PKCE and browser-readable secure SameSite cookies",()=>{
  expect(createBrowserAuth(config)).not.toBeNull();expect(sdk.browser).toHaveBeenCalledWith(config.url,config.publishableKey,expect.objectContaining({auth:expect.objectContaining({flowType:"pkce"}),cookieOptions:expect.objectContaining({secure:true,sameSite:"lax"})}));
 });
 it("recognizes only this project's nonempty verifier cookies including SDK chunks",()=>{
  expect(hasPkceVerifier(config,{getAll:()=>[{name:"sb-synthetic-project-auth-token-code-verifier.0",value:"synthetic-verifier"}]})).toBe(true);
  expect(hasPkceVerifier(config,{getAll:()=>[{name:"sb-other-project-auth-token-code-verifier",value:"synthetic-verifier"}]})).toBe(false);
  expect(hasPkceVerifier(config,{getAll:()=>[{name:"sb-synthetic-project-auth-token-code-verifier",value:""}]})).toBe(false);
 });
});
