import { test, expect } from "@playwright/test";
test("all source levels and distinct sticka meanings are available to a Guest", async ({ page, request }) => {
 for (const level of ["A2", "B1", "B2", "C1"]) {
  const response = await request.get(`/api/lexicon?level=${level}`);
  expect(response.status()).toBe(200);
  const collection = await response.json();
  expect(collection.records).toHaveLength(456);
  expect(new Set(collection.records.map((s: { v: string }) => s.v)).size).toBe(455);
 }
 await page.goto("/");
 await expect(page.getByRole("heading", { name: "Explore the lexicon" })).toBeVisible();
 await page.getByRole("searchbox", { name: "Search exact Swedish spelling" }).fill("sticka");
 await expect(page.getByRole("button", { name: "sticka — knit", exact: true })).toBeVisible();
 await page.getByRole("button", { name: "sticka — knit", exact: true }).click();
 await expect(page.getByTestId("sense-details")).toContainText("knit");
 await page.getByRole("button", { name: /sticka — sting, prick; to leave/ }).click();
 await expect(page.getByTestId("sense-details")).toContainText("sting, prick; to leave");
 const viewport=page.viewportSize()!;await page.screenshot({path:`evidence/sdd-core-implementation/screenshots/lexicon-${viewport.width}x${viewport.height}.png`,fullPage:true});
});
test("level visits reuse loaded collections", async ({ page }) => {
 const counts: Record<string, number> = {};
 page.on("request", r => { if (r.url().includes("/api/lexicon?")) { const level = new URL(r.url()).searchParams.get("level")!; counts[level] = (counts[level] ?? 0) + 1; } });
 await page.goto("/");
 await page.getByRole("searchbox", { name: "Search exact Swedish spelling" }).fill("acceptera");
 await page.getByRole("button", { name: "acceptera — accept", exact: true }).click();
 await page.getByRole("button", { name: "B1", exact: true }).click();
 await expect(page.getByTestId("sense-details")).toContainText("accept");
 await page.getByRole("button", { name: "A2", exact: true }).click();
 await expect(page.getByTestId("sense-details")).toContainText("accept");
 expect(counts.A2).toBe(1);
 expect(counts.B1).toBe(1);
});

test("injected source failure is actionable and a retry recovers without exception disclosure",async({page})=>{
 await page.route("**/api/lexicon?level=A2",route=>route.fulfill({status:503,contentType:"application/json",body:JSON.stringify({message:"SYNTHETIC_EXCEPTION_SENTINEL"})}));
 await page.goto("/");
 await expect(page.getByRole("region",{name:"Lexicon search"}).getByRole("alert")).toContainText("teaching content is unavailable");
 await expect(page.getByText("SYNTHETIC_EXCEPTION_SENTINEL")).toHaveCount(0);
 await page.unroute("**/api/lexicon?level=A2");await page.getByRole("button",{name:"Try again",exact:true}).click();
 await page.getByRole("searchbox",{name:"Search exact Swedish spelling"}).fill("arbeta");
 await expect(page.getByRole("button",{name:"arbeta — work",exact:true})).toBeVisible();
});
test("selection keeps exact meaning and destination examples from A2 through C1 without copying flags",async({page,request})=>{
 await page.goto("/");await page.getByRole("searchbox",{name:"Search exact Swedish spelling"}).fill("sticka");
 await page.getByRole("button",{name:"sticka — knit",exact:true}).click();await page.getByRole("button",{name:"Add to favorites",exact:true}).click();
 await expect(page.getByRole("button",{name:"Remove from favorites",exact:true})).toBeVisible();
 for(const level of ["B1","B2","C1"]){
  const collection=await(await request.get(`/api/lexicon?level=${level}`)).json();
  const sense=collection.records.find((r:{v:string;meaning:string})=>r.v==="sticka"&&r.meaning==="knit");
  await page.getByRole("button",{name:level,exact:true}).click();
  await expect(page.getByTestId("sense-details")).toContainText(sense.forms.Pres.sv);
  await expect(page.getByRole("button",{name:"Add to favorites",exact:true})).toBeVisible();
 }
 await page.getByRole("button",{name:"A2",exact:true}).click();await expect(page.getByRole("button",{name:"Remove from favorites",exact:true})).toBeVisible();
 await page.getByRole("button",{name:/sticka — sting, prick; to leave/}).click();await expect(page.getByRole("button",{name:"Add to favorites",exact:true})).toBeVisible();
});

test("all four rendered collections and supplementary source/search/render measurements",async({page,browser},testInfo)=>{
 const counts:Record<string,number>={};page.on("request",r=>{if(r.url().includes("/api/lexicon?")){const level=new URL(r.url()).searchParams.get("level")!;counts[level]=(counts[level]??0)+1;}});
 await page.goto("/");const observations=[];
 for(const level of ["A2","B1","B2","C1"]){
  await page.getByRole("button",{name:level,exact:true}).click();
  const list=page.locator(".sense-list");await expect(list.getByRole("button")).toHaveCount(456);
  const started=await page.evaluate(()=>performance.now());
  await page.getByRole("searchbox",{name:"Search exact Swedish spelling"}).fill("sticka");
  await expect(list.getByRole("button")).toHaveCount(2);
  const searchObservedMs=(await page.evaluate(()=>performance.now()))-started;
  const clearStarted=await page.evaluate(()=>performance.now());
  await page.getByRole("searchbox",{name:"Search exact Swedish spelling"}).fill("");await expect(list.getByRole("button")).toHaveCount(456);
  observations.push({level,searchObservedMs,clearAndRenderObservedMs:(await page.evaluate(()=>performance.now()))-clearStarted});
 }
 await page.getByRole("button",{name:"A2",exact:true}).click();await expect(page.locator(".sense-list").getByRole("button")).toHaveCount(456);
 expect(counts).toEqual({A2:1,B1:1,B2:1,C1:1});
 const sourceRequests=await page.evaluate(()=>performance.getEntriesByType("resource").filter(item=>item.name.includes("/api/lexicon?")).map(item=>({url:new URL(item.name).pathname+new URL(item.name).search,durationMs:item.duration})));
 const measurement={kind:"supplementary-observation-no-threshold",browser:browser.version(),platform:process.platform,viewport:testInfo.project.use.viewport,method:"PerformanceResourceTiming for source requests; search/render samples include Playwright command and assertion overhead, not pure component latency",counts,sourceRequests,observations};
 console.log("CORE_MEASUREMENTS "+JSON.stringify(measurement));await testInfo.attach("supplementary-measurements",{body:JSON.stringify(measurement,null,2),contentType:"application/json"});
});

test("cancelled waiting ignores late source responses until an explicit retry",async({page})=>{
 let release!:()=>void;const blocked=new Promise<void>(resolve=>{release=resolve;});
 await page.route("**/api/lexicon?level=A2",async route=>{await blocked;await route.continue();});
 await page.goto("/");await page.getByRole("button",{name:"Cancel waiting",exact:true}).click();
 const feedback=page.getByRole("region",{name:"Lexicon search"}).getByRole("alert");await expect(feedback).toContainText("Loading cancelled");
 release();await expect(feedback).toContainText("Loading cancelled");await page.getByRole("button",{name:"Try again",exact:true}).click();
 await expect(page.locator(".sense-list").getByRole("button")).toHaveCount(456);
});

test("public source endpoints reject unsupported and ambiguous queries without leaking internals",async({request})=>{
 for(const route of ["lexicon","missions"]){for(const query of ["","?level=A1","?level=a2","?level=A2&level=B1","?level=A2&extra=unexpected"]){const response=await request.get(`/api/${route}${query}`);expect(response.status()).toBe(400);expect(await response.json()).toEqual({code:"INVALID_LEVEL",message:"Choose A2, B1, B2 or C1.",retryable:false});}}
});
