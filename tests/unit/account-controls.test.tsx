import {beforeEach,describe,it,expect,vi} from "vitest";
import {render,screen,fireEvent,waitFor} from "@testing-library/react";
const sdk=vi.hoisted(()=>({create:vi.fn(),signup:vi.fn(),signin:vi.fn(),oauth:vi.fn(),signout:vi.fn()}));
vi.mock("../../src/auth/browser",()=>({createBrowserAuth:sdk.create}));
import {AccountControls} from "../../src/components/AccountControls";
const configuration={url:"https://synthetic.supabase.co",publishableKey:"sb_publishable_synthetic_test_only",canonicalOrigin:"https://learning.example.test"};
beforeEach(()=>{
 sdk.create.mockReset().mockReturnValue({auth:{signUp:sdk.signup,signInWithPassword:sdk.signin,signInWithOAuth:sdk.oauth,signOut:sdk.signout}});
 sdk.signup.mockReset().mockResolvedValue({data:{session:null},error:null});sdk.signin.mockReset().mockResolvedValue({error:null});sdk.oauth.mockReset().mockResolvedValue({error:null});sdk.signout.mockReset().mockResolvedValue({error:null});
 vi.stubGlobal("fetch",vi.fn(async()=>new Response(JSON.stringify({status:"signed-out"}),{status:200,headers:{"Content-Type":"application/json"}})));
});
function form(){fireEvent.change(screen.getByLabelText("Email"),{target:{value:"synthetic@example.test"}});fireEvent.change(screen.getByLabelText("Password"),{target:{value:"synthetic-test-password"}});}
describe("account controls, mocked SDK only",()=>{
 it("keeps unconfigured account services unavailable without constructing a client",()=>{render(<AccountControls configuration={null}/>);expect(screen.getByText("Account services are not configured for this local build.")).toBeInTheDocument();expect(sdk.create).not.toHaveBeenCalled();expect(fetch).not.toHaveBeenCalled();});
 it("records confirmation pending without claiming registration authenticated",async()=>{render(<AccountControls configuration={configuration}/>);form();fireEvent.click(screen.getByRole("button",{name:"Create account"}));await waitFor(()=>expect(sdk.signup).toHaveBeenCalledWith({email:"synthetic@example.test",password:"synthetic-test-password",options:{emailRedirectTo:"https://learning.example.test/auth/callback"}}));await screen.findByText(/Check your email.*not signed in/i);});
 it("requests only identity Google scopes and the exact canonical callback",async()=>{render(<AccountControls configuration={configuration}/>);fireEvent.click(screen.getByRole("button",{name:"Continue with Google"}));await waitFor(()=>expect(sdk.oauth).toHaveBeenCalledWith({provider:"google",options:{redirectTo:"https://learning.example.test/auth/callback",scopes:"openid email profile"}}));});
 it("uses local sign-out and displays a non-disclosing failure",async()=>{sdk.signout.mockResolvedValue({error:new Error("SYNTHETIC_AUTH_EXCEPTION")});render(<AccountControls configuration={configuration}/>);fireEvent.click(screen.getByRole("button",{name:"Sign out this browser"}));await waitFor(()=>expect(sdk.signout).toHaveBeenCalledWith({scope:"local"}));await screen.findByText(/Sign-out was not confirmed/);expect(screen.queryByText(/SYNTHETIC_AUTH_EXCEPTION/)).not.toBeInTheDocument();});
});
