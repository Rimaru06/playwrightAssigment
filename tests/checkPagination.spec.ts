import { test, expect } from "@playwright/test";
import { goToPracticePage } from "../utils/goToPracticePage";
import PosManager from "../pageObjects/PosManager";
import products from "../utils/product.json";

for (const product of products) {
    test(`Find product "${product.name}" in pagination table and check it`, async ({ page }) => {
        await goToPracticePage(page);
        const posManager = new PosManager(page);
        const paginationTable = posManager.getPaginationTable();

        const found = await paginationTable.findAndCheckProduct(product.name);
        expect(found).toBe(true);
    });
}