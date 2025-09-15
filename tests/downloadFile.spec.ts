import { test, expect } from "@playwright/test";
import PosManager from "../pageObjects/PosManager";
import { goToPracticePage } from "../utils/goToPracticePage";
test("Download file and then upload the downloaded file", async ({ page }) => {
    const posManager = new PosManager(page);
    await goToPracticePage(page);
    const downloadFile = posManager.getDownloadFile();
    const fileWidget = posManager.getFileUploadWidget();

    const path = await downloadFile.downloadFileProcess();
    await fileWidget.uploadSingleFile(path);
    await expect(fileWidget.singleFileStatus).toContainText(`Single file selected: ${path.split('/').pop()}`);

})