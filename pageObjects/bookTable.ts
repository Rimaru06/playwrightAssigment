import { Page, Locator } from "@playwright/test";

export default class BookTable {
    readonly page: Page;
    readonly table: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = page.locator('table[name="BookTable"]');
    }

    getBookRow(bookName: string): Locator {
        return this.table.locator('tr', { hasText: bookName });
    }
}