import { test, expect } from "@playwright/test";
import { goToPracticePage } from "../utils/goToPracticePage";
import bookData from "../utils/checktable.json";
import PosManager from "../pageObjects/PosManager";

for (const book of bookData) {
    test(`Check "${book.name}" book row exists`, async ({ page }) => {
        await goToPracticePage(page);
        const posManager = new PosManager(page);
        const bookTable = posManager.getBookTable();
        const row = bookTable.getBookRow(book.name);
        await expect(row).toContainText(book.author);
        await expect(row).toContainText(book.subject);
        await expect(row).toContainText(book.price);
    });
}