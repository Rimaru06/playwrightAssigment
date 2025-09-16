import {test , expect} from "@playwright/test";

test("Visual regression test for blogPost website", async ({ page }) => {
    await page.goto("/");
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot("blogPost-website.png");
});
