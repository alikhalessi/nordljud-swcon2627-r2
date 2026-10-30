import {afterEach,describe,it,expect,vi} from "vitest";
import {requireLiveTestAuthorization} from "../../scripts/live-test-gate";
afterEach(()=>vi.unstubAllEnvs());
describe("closed live-suite gate; setup check only, never a provider test",()=>{
 it("rejects the default without accessing a provider",()=>{vi.stubEnv("NORDLJUD_LIVE_TESTS","0");vi.stubEnv("NORDLJUD_D02_AUTHORIZATION_FILE",undefined);expect(()=>requireLiveTestAuthorization()).toThrow(/BLOCKED/);});
 it("does not treat a live flag alone as authorization",()=>{vi.stubEnv("NORDLJUD_LIVE_TESTS","1");vi.stubEnv("NORDLJUD_D02_AUTHORIZATION_FILE",undefined);expect(()=>requireLiveTestAuthorization()).toThrow(/authorization record/);});
});
