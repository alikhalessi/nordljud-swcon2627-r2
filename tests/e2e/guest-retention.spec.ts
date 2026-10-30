import { test, expect } from "@playwright/test";
test("Guest flags and selection persist while completion and practice reset", async ({ page }) => {
 await page.goto("/");
 await page.getByRole("searchbox", { name: "Search exact Swedish spelling" }).fill("sticka");
 await page.getByRole("button", { name: "sticka — knit", exact: true }).click();
 await page.getByRole("button", { name: "Add to favorites", exact: true }).click();
 await expect(page.getByRole("button", { name: "Remove from favorites", exact: true })).toBeVisible();
 await page.getByRole("button", { name: "Mark as studied", exact: true }).click();
 await expect(page.getByRole("button", { name: "Unmark studied", exact: true })).toBeVisible();
 await expect(page.getByTestId("storage-status")).toContainText("Saved");
 await page.getByRole("button", { name: "Mission", exact: true }).click();
 await page.getByRole("button", { name: "Mark mission complete", exact: true }).click();
 await expect(page.getByText("Completed by you")).toBeVisible();
 await page.reload();
 await page.getByRole("button", { name: "Explore", exact: true }).click();
 await expect(page.getByTestId("sense-details")).toContainText("knit");
 await expect(page.getByRole("button", { name: "Remove from favorites", exact: true })).toBeVisible();
 await expect(page.getByRole("button", { name: "Unmark studied", exact: true })).toBeVisible();
 await page.getByRole("button", { name: "Mission", exact: true }).click();
 await expect(page.getByRole("button", { name: "Mark mission complete", exact: true })).toBeVisible();
});

test("clearing only this isolated browser context's Condition B database removes its Guest flags",async({page})=>{
 await page.goto("/");await page.getByRole("searchbox",{name:"Search exact Swedish spelling"}).fill("sticka");await page.getByRole("button",{name:"sticka — knit",exact:true}).click();await page.getByRole("button",{name:"Add to favorites",exact:true}).click();await expect(page.getByTestId("storage-status")).toContainText("Saved");
 await page.evaluate(async()=>{const name="nordljud-condition-b-core-v1:"+encodeURIComponent("sha256:c6aa8fb0845f46045c01aa50bed4e17833a01612391f1297e4647003abc617ba");await new Promise<void>((resolve,reject)=>{const request=indexedDB.deleteDatabase(name);request.onsuccess=()=>resolve();request.onerror=()=>reject(new Error("Test-context database clear failed"));request.onblocked=()=>reject(new Error("Test-context database clear blocked"));});});
 await page.reload();await page.getByRole("searchbox",{name:"Search exact Swedish spelling"}).fill("sticka");await page.getByRole("button",{name:"sticka — knit",exact:true}).click();await expect(page.getByRole("button",{name:"Add to favorites",exact:true})).toBeVisible();await expect(page.getByRole("button",{name:"Mark as studied",exact:true})).toBeVisible();
});
