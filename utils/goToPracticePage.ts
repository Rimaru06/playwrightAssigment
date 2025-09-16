import { Page } from "@playwright/test";

export async function goToPracticePage(page: Page) {
    await page.goto("/");
}