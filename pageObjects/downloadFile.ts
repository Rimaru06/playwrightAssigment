import type { Page , Locator } from "@playwright/test";
export default class DownloadFile{
    readonly page : Page;
    readonly downloadLink : Locator;
    readonly inputText : Locator;
    readonly generateTextButton : Locator;
    readonly txtDownLoadLink : Locator;

    constructor(page : Page){
        this.page = page;
        this.downloadLink = page.getByRole("link", { name: "Download Files" });
        this.inputText = page.locator("#inputText");
        this.generateTextButton = page.locator("#generateTxt");
        this.txtDownLoadLink = page.locator("#txtDownloadLink");
    }


    async downloadFileProcess()
    {
        await this.downloadLink.click();
        await this.page.waitForLoadState("networkidle");
        await this.inputText.fill("hi my name is robot");
        await this.generateTextButton.click();
        const [ download ] = await Promise.all([
            this.page.waitForEvent("download"),
            this.txtDownLoadLink.click()
        ]);
        const downloadPath = await download.path();
        await download.saveAs("./downloads/"+download.suggestedFilename());
        return downloadPath;
    }
}