import PosManager from "../pageObjects/PosManager";
import { test, expect } from "@playwright/test";
import data from "../utils/guiElementTestdata.json";
import { goToPracticePage } from "../utils/goToPracticePage";

test("Fill the form and submit", async ({ page }) => {
  const posManager = new PosManager(page);
  const guiElement = posManager.getGuiElement();
  await goToPracticePage(page);

  const testData = data[0];

  await guiElement.FillForm(
    testData.Name,
    testData.Email,
    testData.Phone,
    testData.Address,
    testData.Gender,
    testData.Days,
    testData.Country,
    testData.Colors,
    testData.SortedList,
    testData.DatePicker1,
    testData.DatePicker2,
    testData.startDate,
    testData.endDate
  );

await expect(guiElement.DatePicker2Field).toHaveValue(`${testData.DatePicker2[1]}/${testData.DatePicker2[0]}/${testData.DatePicker2[2]}`);
await expect(guiElement.result).toHaveText(/You selected a range of \d+ days\./);
});