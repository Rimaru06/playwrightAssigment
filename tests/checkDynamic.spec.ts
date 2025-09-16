import { test, expect } from "@playwright/test";
import { goToPracticePage } from "../utils/goToPracticePage";
import PosManager from "../pageObjects/posManager";

test("Dynamic web table changes on refresh and stats match table data", async ({ page }) => {
    await goToPracticePage(page);
    const posManager = new PosManager(page);
    const dynamicTable = posManager.getDynamicWebTable();

    const firstTable = await dynamicTable.getTableHtml();
    // Wait for table to change by checking if any data element updates
    await dynamicTable.table.locator("tbody tr").first().waitFor();
    await dynamicTable.table.hover(); // Trigger any dynamic updates
    await dynamicTable.table.locator("tbody tr").first().waitFor({ state: 'attached' });
    const secondTable = await dynamicTable.getTableHtml();

    expect(firstTable).not.toBe(secondTable);

    const chromeCpu = await dynamicTable.getChromeCpuText();
    const firefoxMemory = await dynamicTable.getFirefoxMemoryText();
    const chromeNetwork = await dynamicTable.getChromeNetworkText();
    const firefoxDisk = await dynamicTable.getFirefoxDiskText();


    await dynamicTable.expectValueInTable(chromeCpu!);
    await dynamicTable.expectValueInTable(firefoxMemory!);
    await dynamicTable.expectValueInTable(chromeNetwork!);
    await dynamicTable.expectValueInTable(firefoxDisk!);
});