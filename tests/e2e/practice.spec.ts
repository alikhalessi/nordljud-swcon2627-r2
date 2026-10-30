import { test, expect } from "@playwright/test";
test("both practice checks distinguish correct, incorrect and revealed outcomes", async ({ page, request }) => {
 const data = await (await request.get("/api/missions?level=A2")).json();
 await page.goto("/");
 await page.getByRole("button", { name: "Mission", exact: true }).click();
 for (const [kind, title] of [["comprehension", "Comprehension"], ["verbForm", "Verb form"]] as const) {
  const check = data.checks[kind];
  const group = page.getByRole("group", { name: title, exact: true });
  const wrong = check.choices.find((c: { id: string }) => c.id !== check.correctChoiceId);
  await group.getByRole("radio", { name: wrong.label, exact: true }).check();
  await group.getByRole("button", { name: "Check answer" }).click();
  await expect(group.getByRole("status")).toContainText("Incorrect");
  await expect(group.getByRole("status")).toContainText("No correctness credit");
  const correct = check.choices.find((c: { id: string }) => c.id === check.correctChoiceId);
  await group.getByRole("button", { name: "Reveal answer" }).click();
  await expect(group.getByRole("status")).toContainText("Revealed");
  await group.getByRole("radio", { name: correct.label, exact: true }).check();
  await group.getByRole("button", { name: "Check answer" }).click();
  await expect(group.getByRole("status")).toContainText("Revealed");
  await expect(group.getByRole("status")).toContainText("No correctness credit");
  await group.getByRole("button", { name: "New attempt" }).click();
  await group.getByRole("radio", { name: correct.label, exact: true }).check();
  await group.getByRole("button", { name: "Check answer" }).click();
  await expect(group.getByRole("status")).toContainText("Correct");
 }
});

test("completion before failed practice stays self-report and neither activity marks a sense studied",async({page,request})=>{
 const data=await(await request.get("/api/missions?level=A2")).json();await page.goto("/");await page.getByRole("searchbox",{name:"Search exact Swedish spelling"}).fill(data.mission.verb);await page.getByRole("button",{name:`${data.mission.verb} — ${data.mission.sense.meaning}`,exact:true}).click();
 await expect(page.getByRole("button",{name:"Mark as studied",exact:true})).toBeVisible();await page.getByRole("button",{name:"Mission",exact:true}).click();await page.getByRole("button",{name:"Mark mission complete",exact:true}).click();
 const group=page.getByRole("group",{name:"Comprehension",exact:true}),check=data.checks.comprehension;const wrong=check.choices.find((c:{id:string})=>c.id!==check.correctChoiceId);
 await group.getByRole("radio",{name:wrong.label,exact:true}).check();await group.getByRole("button",{name:"Check answer",exact:true}).click();await expect(group.getByRole("status")).toContainText("Incorrect");await expect(page.getByText("Completed by you",{exact:true})).toBeVisible();
 await page.getByRole("button",{name:"Explore",exact:true}).click();await expect(page.getByRole("button",{name:"Mark as studied",exact:true})).toBeVisible();
 await page.reload();await page.getByRole("button",{name:"Mission",exact:true}).click();await expect(page.getByRole("button",{name:"Mark mission complete",exact:true})).toBeVisible();await expect(page.getByRole("group",{name:"Comprehension",exact:true}).getByRole("status")).toContainText("Choose an answer");
});
test("an injected unavailable source check does not block the other check or mission reading",async({page})=>{
 await page.route("**/api/missions?level=A2",async route=>{const response=await route.fetch();const data=await response.json();data.checks.comprehension={...data.checks.comprehension,available:false,correctChoiceId:null,choices:[],unavailableReason:"Synthetic unavailable-source UI fixture. Continue supported practice."};await route.fulfill({response,json:data});});
 await page.goto("/");await page.getByRole("button",{name:"Mission",exact:true}).click();const unavailable=page.getByRole("group",{name:"Comprehension",exact:true});await expect(unavailable.getByRole("status")).toContainText("Check unavailable. No correctness credit");await expect(unavailable.getByRole("radio")).toHaveCount(0);await expect(page.getByRole("group",{name:"Verb form",exact:true}).getByRole("radio").first()).toBeVisible();await expect(page.getByRole("region",{name:"Mission study"})).toBeVisible();
});
