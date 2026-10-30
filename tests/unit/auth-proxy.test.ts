import {beforeEach,describe,it,expect,vi} from "vitest";
import {NextRequest} from "next/server";
const ports=vi.hoisted(()=>({configuration:vi.fn(),create:vi.fn(),claims:vi.fn(),apply:vi.fn((response:Response)=>{response.headers.set("Cache-Control","private, no-store");return response;})}));
vi.mock("../../src/auth/policy",()=>({readAuthConfiguration:ports.configuration}));
vi.mock("../../src/auth/server",()=>({createRequestAuth:ports.create}));
import {proxy} from "../../src/proxy";
beforeEach(()=>{ports.configuration.mockReset().mockReturnValue({url:"https://synthetic.supabase.co"});ports.claims.mockReset().mockResolvedValue({data:{claims:{}},error:null});ports.create.mockReset().mockReturnValue({client:{auth:{getClaims:ports.claims}},apply:ports.apply});ports.apply.mockClear();});
describe("request refresh boundary; mocked SDK only",()=>{
 it("never constructs auth clients for public teaching routes",async()=>{await proxy(new NextRequest("https://learning.example.test/api/lexicon?level=A2"));expect(ports.create).not.toHaveBeenCalled();});
 it("does not construct an unconfigured private client",async()=>{ports.configuration.mockReturnValue(null);await proxy(new NextRequest("https://learning.example.test/api/session"));expect(ports.create).not.toHaveBeenCalled();});
 it("verifies refresh claims and carries SDK cache/cookie updates to the forwarded response",async()=>{const result=await proxy(new NextRequest("https://learning.example.test/api/session"));expect(ports.claims).toHaveBeenCalledOnce();expect(ports.apply).toHaveBeenCalledOnce();expect(result.headers.get("cache-control")).toContain("no-store");});
});
