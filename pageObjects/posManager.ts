import GuiElement from "./guiElement";
import FileUploadWidget from "./fileUploadWidget";
import {type Page} from "@playwright/test";
import BookTable from "./bookTable";
import DynamicWebTable from "./dynamicWebTable";
import PaginationTable from "./paginationTable";
import DownloadFile from "./downloadFile";
import SearchWiki from "./searchWiki";  
export default class PosManager{
    readonly page: Page;
    readonly guiElement : GuiElement;
    readonly fileUploadWidget: FileUploadWidget;
    readonly bookTable: BookTable;
    readonly dynamicWebTable: DynamicWebTable;
    readonly paginationTable: PaginationTable;
    readonly downloadFile : DownloadFile;
    readonly searchWiki : SearchWiki;
    constructor(page: Page){
        this.page = page;
        this.guiElement = new GuiElement(page);
        this.fileUploadWidget = new FileUploadWidget(page);
        this.bookTable = new BookTable(page);
        this.dynamicWebTable = new DynamicWebTable(page);
        this.paginationTable = new PaginationTable(page);
        this.downloadFile = new DownloadFile(page);
        this.searchWiki = new SearchWiki(page);
    }

    getGuiElement(): GuiElement {
        return this.guiElement;
    }
    getFileUploadWidget(): FileUploadWidget {
        return this.fileUploadWidget;
    }
    getBookTable(): BookTable {
        return this.bookTable;
    }
    getDynamicWebTable(): DynamicWebTable {
        return this.dynamicWebTable;
    }
    getPaginationTable(): PaginationTable {
        return this.paginationTable;
    }
    getDownloadFile(): DownloadFile {
        return this.downloadFile;
    }
    getSearchWiki(): SearchWiki {
        return this.searchWiki;
    }
}