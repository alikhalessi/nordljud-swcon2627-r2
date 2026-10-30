import { test, expect } from "@playwright/test";
test("four authentic missions show reversible English assistance", async ({ page, request }) => {
 await page.goto("/");
 await page.getByRole("button", { name: "Mission", exact: true }).click();
 for (const level of ["A2", "B1", "B2", "C1"]) {
  await page.getByRole("button", { name: level, exact: true }).click();
  const data = await (await request.get(`/api/missions?level=${level}`)).json();
  await expect(page.getByRole("heading", { name: data.mission.title })).toBeVisible();
  const study=page.getByRole("region",{name:"Mission study"});
  for(const key of data.mission.formKeys){const form=data.mission.sense.forms[key];if(data.mission.sense.availability[key].sv)await expect(study.getByText(form.sv,{exact:true}).first()).toBeVisible();if(data.mission.sense.availability[key].en)await expect(study.getByText(form.en,{exact:true})).toHaveCount(0);}
  await page.getByRole("button", { name: "Show English", exact: true }).click();
  for(const key of data.mission.formKeys){if(data.mission.sense.availability[key].en)await expect(study.getByText(data.mission.sense.forms[key].en,{exact:true}).first()).toBeVisible();}
  await expect(page.getByRole("button", { name: "Hide English", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Hide English", exact: true }).click();
 }
 await page.getByRole("button",{name:"Show English",exact:true}).click();
 const viewport=page.viewportSize()!;await page.screenshot({path:`evidence/sdd-core-implementation/screenshots/mission-${viewport.width}x${viewport.height}.png`,fullPage:true});
});

test("native browser speech requests or truthful unavailable feedback preserve study",async({page,browser},testInfo)=>{
 await page.goto("/");await page.getByRole("button",{name:"Mission",exact:true}).click();
 const study=page.getByRole("region",{name:"Mission study"});await expect(study.getByRole("heading",{level:2})).toBeVisible();
 const environment=await page.evaluate(()=>({hasSpeechApi:!!window.speechSynthesis&&!!window.SpeechSynthesisUtterance,voices:window.speechSynthesis?.getVoices().map(voice=>({language:voice.lang,localService:voice.localService,default:voice.default}))??[]}));
 await study.getByRole("button",{name:/Listen to .* example/}).first().click();
 await expect(study.getByRole("status")).toContainText(/speech|voices/i);
 const message=await study.getByRole("status").innerText();await expect(page.getByRole("group",{name:"Comprehension",exact:true})).toBeVisible();
 console.log("CORE_SPEECH_OBSERVATION "+JSON.stringify({browser:browser.version(),viewport:testInfo.project.use.viewport,...environment,message,audioHeard:"NOT OBSERVED; automated API/fallback check only"}));
});
