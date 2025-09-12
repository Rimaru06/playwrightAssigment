import { Page, Locator } from "@playwright/test";

export default class FileUploadWidget {
    readonly page: Page;
    readonly singleFileInput: Locator;
    readonly singleFileForm: Locator;
    readonly singleFileStatus: Locator;
    readonly multipleFilesInput: Locator;
    readonly multipleFilesForm: Locator;
    readonly multipleFilesStatus: Locator;

    constructor(page: Page) {
        this.page = page;
        this.singleFileInput = page.locator("#singleFileInput");
        this.singleFileForm = page.locator("#singleFileForm");
        this.singleFileStatus = page.locator("#singleFileStatus");
        this.multipleFilesInput = page.locator("#multipleFilesInput");
        this.multipleFilesForm = page.locator("#multipleFilesForm");
        this.multipleFilesStatus = page.locator("#multipleFilesStatus");
    }

    async uploadSingleFile(filePath: string) {
        await this.singleFileInput.setInputFiles(filePath);
        await this.singleFileForm.locator('button[type="submit"]').click();
    }

    async uploadMultipleFiles(filePaths: string[]) {
        await this.multipleFilesInput.setInputFiles(filePaths);
        await this.multipleFilesForm.locator('button[type="submit"]').click();
    }
}