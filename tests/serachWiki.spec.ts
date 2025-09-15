import { test, expect } from "@playwright/test";
import { goToPracticePage } from "../utils/goToPracticePage";
import PosManager from "../pageObjects/PosManager";

test("Search for a term on Wikipedia and verify the first heading", async ({ page }) => {
  const posManager = new PosManager(page);
    await goToPracticePage(page);
    const searchWiki = posManager.getSearchWiki();
    const title =  await searchWiki.search("BCCI");
    await expect(title).toBeVisible();
});