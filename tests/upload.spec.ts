import { test, expect } from "@playwright/test";
import PosManager from "../pageObjects/posManager";
import { goToPracticePage } from "../utils/goToPracticePage";

test("Single and multiple file upload", async ({ page }) => {
    const posManager = new PosManager(page);
    await goToPracticePage(page);
    const fileWidget = posManager.getFileUploadWidget();

    await fileWidget.uploadSingleFile("uploads/testfile1.txt");
    await expect(fileWidget.singleFileStatus).toContainText("Single file selected: testfile1.txt");

   

    await fileWidget.uploadMultipleFiles(["uploads/testfile1.txt", "uploads/testfile2.txt"]);
    await expect(fileWidget.multipleFilesStatus).toContainText("Multiple files selected:");
    await expect(fileWidget.multipleFilesStatus).toContainText("testfile1.txt");
    await expect(fileWidget.multipleFilesStatus).toContainText("testfile2.txt");
});