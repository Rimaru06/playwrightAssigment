import GuiElement from "./GuiElement";
import FileUploadWidget from "./FileUploadWidget";
import {type Page} from "@playwright/test";
import BookTable from "./BookTable";
import DynamicWebTable from "./DynamicWebTable";
import PaginationTable from "./PaginationTable";
export default class PosManager{
    readonly page: Page;
    readonly guiElement : GuiElement;
    readonly fileUploadWidget: FileUploadWidget;
    readonly bookTable: BookTable;
    readonly dynamicWebTable: DynamicWebTable;
    readonly paginationTable: PaginationTable;
    constructor(page: Page){
        this.page = page;
        this.guiElement = new GuiElement(page);
        this.fileUploadWidget = new FileUploadWidget(page);
        this.bookTable = new BookTable(page);
        this.dynamicWebTable = new DynamicWebTable(page);
        this.paginationTable = new PaginationTable(page);
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
}