import {test,expect} from "@playwright/test";
test("unconfigured account routes return private safe unavailable responses without provider access",async({request,page})=>{
 for(const path of ["/api/session","/auth/callback?code=synthetic-code"]){const response=await request.get(path,{maxRedirects:0});expect(response.status()).toBe(503);expect(response.headers()["cache-control"]).toContain("private");expect(response.headers()["cache-control"]).toContain("no-store");const text=await response.text();expect(text).not.toContain("synthetic-code");expect(text).not.toMatch(/access_token|refresh_token|sb_secret_/);}
 await page.goto("/");await expect(page.getByRole("heading",{name:"Explore the lexicon"})).toBeVisible();
});
