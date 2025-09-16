import { Page, Locator, expect } from "@playwright/test";

export default class DynamicWebTable {
    readonly page: Page;
    readonly table: Locator;
    readonly chromeCpu: Locator;
    readonly firefoxMemory: Locator;
    readonly chromeNetwork: Locator;
    readonly firefoxDisk: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = page.locator("#taskTable");
        this.chromeCpu = page.locator(".chrome-cpu");
        this.firefoxMemory = page.locator(".firefox-memory");
        this.chromeNetwork = page.locator(".chrome-network");
        this.firefoxDisk = page.locator(".firefox-disk");
    }

    async getTableHtml(): Promise<string> {
        return await this.table.innerHTML();
    }

    async getChromeCpuText(): Promise<string> {
        return (await this.chromeCpu.textContent())?.trim() ?? "";
    }

    async getFirefoxMemoryText(): Promise<string> {
        return (await this.firefoxMemory.textContent())?.trim() ?? "";
    }

    async getChromeNetworkText(): Promise<string> {
        return (await this.chromeNetwork.textContent())?.trim() ?? "";
    }

    async getFirefoxDiskText(): Promise<string> {
        return (await this.firefoxDisk.textContent())?.trim() ?? "";
    }

    async expectValueInTable(value: string) {
        await expect(this.table).toContainText(value);
    }
}