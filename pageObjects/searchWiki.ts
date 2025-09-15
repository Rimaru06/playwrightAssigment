import type { Page, Locator } from "@playwright/test";

export default class SearchWiki {
    readonly page: Page;
    readonly searchInput: Locator
    readonly searchButton: Locator
    readonly searchResults: Locator

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator("#Wikipedia1_wikipedia-search-input");
        this.searchButton = page.locator(".wikipedia-search-button");
        this.searchResults = page.locator("#Wikipedia1_wikipedia-search-results");
    }

    async search(term: string) {
        await this.searchInput.fill(term);
        await this.searchButton.click();

        const firstResult = this.searchResults.locator('div[id="wikipedia-search-result-link"]').first();
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            firstResult.locator('a').click()
        ])

        await newPage.waitForLoadState();
        const title = newPage.getByRole("heading", { name: "Board of Control for Cricket in India" });
        return title;
    }

}