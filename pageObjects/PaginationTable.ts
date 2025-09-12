import { Page, Locator } from "@playwright/test";

export default class PaginationTable {
    readonly page: Page;
    readonly table: Locator;
    readonly pagination: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = page.locator("#productTable");
        this.pagination = page.locator("#pagination a");
    }

    async findAndCheckProduct(productName: string): Promise<boolean> {
        const pageCount = await this.pagination.count();
        for (let i = 0; i < pageCount; i++) {
            await this.pagination.nth(i).click();
            await this.page.waitForTimeout(200);
            const row = this.table.locator("tbody tr", { hasText: productName });
            if (await row.count() > 0) {
    
                await row.locator('input[type="checkbox"]').check();
                return true;
            }
        }
        return false;
    }
}