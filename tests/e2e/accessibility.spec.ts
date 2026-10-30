import { test, expect } from "@playwright/test";
test("essential Guest controls have keyboard focus, names and narrow-screen fit", async ({ page }) => {
 await page.goto("/");
 await expect(page.getByRole("heading", { name: "Explore the lexicon" })).toBeVisible();
 await page.keyboard.press("Tab");
 await expect(page.getByRole("link", { name: "Skip to learning" })).toBeFocused();
 await page.keyboard.press("Enter");
 const search = page.getByRole("searchbox", { name: "Search exact Swedish spelling" });
 await search.focus();
 await expect(search).toBeFocused();
 expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
 await page.getByRole("button", { name: "Account", exact: true }).click();
 await expect(page.getByText("Account services are not configured for this local build.")).toBeVisible();
 await page.getByRole("button", { name: "Explore", exact: true }).click();
 await expect(search).toBeVisible();
});

test("keyboard flag changes retain focus and level selection remains operable",async({page})=>{
 await page.goto("/");const search=page.getByRole("searchbox",{name:"Search exact Swedish spelling"});await search.fill("sticka");
 const sense=page.getByRole("button",{name:"sticka — knit",exact:true});await sense.focus();await page.keyboard.press("Enter");
 const favorite=page.getByRole("button",{name:"Add to favorites",exact:true});await favorite.focus();await page.keyboard.press("Space");
 const removed=page.getByRole("button",{name:"Remove from favorites",exact:true});await expect(removed).toBeVisible();await expect(removed).toBeFocused();
 await page.keyboard.press("Tab");const studied=page.getByRole("button",{name:"Mark as studied",exact:true});await expect(studied).toBeFocused();await page.keyboard.press("Space");
 await expect(page.getByRole("button",{name:"Unmark studied",exact:true})).toBeFocused();
 const level=page.getByRole("button",{name:"B1",exact:true});await level.focus();await page.keyboard.press("Enter");
 await expect(level).toHaveAttribute("aria-pressed","true");await expect(level).toBeFocused();
 expect(await level.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");
});
