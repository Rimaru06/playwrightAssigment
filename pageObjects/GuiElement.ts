import { type Page, Locator } from "@playwright/test";
export default class GuiElement {
    readonly monthMap: { [key: number]: string } = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };
    readonly page: Page;
    readonly NameField: Locator;
    readonly EmailField: Locator;
    readonly PhoneField: Locator;
    readonly AddressField: Locator
    readonly GenderRadioField: Locator;
    readonly DaysCheckBoxField: Locator;
    readonly CountrySelectOptionsField: Locator;
    readonly ColorSelectOptionsField: Locator;
    readonly SortedSelectOptionsField: Locator;
    readonly DatePicker1Field: Locator;
    readonly DatePicker2Field: Locator;
    readonly StartDate: Locator;
    readonly EndDate: Locator;
    readonly SubmitButton: Locator;
    readonly calender: Locator;
    readonly result: Locator;
    constructor(page: Page) {
        this.page = page;
        this.NameField = page.locator("#name");
        this.EmailField = page.locator("#email");
        this.PhoneField = page.locator("#phone");
        this.AddressField = page.locator("#textarea");
        this.CountrySelectOptionsField = page.locator("#country");
        this.ColorSelectOptionsField = page.locator("#colors");
        this.SortedSelectOptionsField = page.locator("#animals");
        this.DatePicker1Field = page.locator("#datepicker");
        this.DatePicker2Field = page.locator("#txtDate");
        this.StartDate = page.locator("#start-date");
        this.EndDate = page.locator("#end-date");
        this.SubmitButton = page.locator(".submit-btn");
        this.calender = page.locator("#ui-datepicker-div");
        this.result = page.locator("#result");
    }
    compareMonth(current: string, target: string): number {
        const months = Object.values(this.monthMap);
        return months.indexOf(current) - months.indexOf(target);
    }
    async FillForm(name: string, email: string, phone: string, address: string, gender: string, days: string[], country: string, color: string, animals: string,
        date1: string[], date2: string[], startDate: string[], endDate: string[]): Promise<void> {

        await this.NameField.fill(name);
        await this.EmailField.fill(email);
        await this.PhoneField.fill(phone);
        await this.AddressField.fill(address);
        await this.page.locator(`input[type="radio"][id="${gender}"]`).check();
        for (const day of days) {
            await this.page.getByLabel(day).check();
        }
        await this.CountrySelectOptionsField.selectOption(country);
        await this.ColorSelectOptionsField.selectOption(color);
        await this.SortedSelectOptionsField.selectOption(animals);
        await this.DatePicker1Field.click();

        // --- DatePicker1 ---
        await this.DatePicker1Field.click();
        let month1 = await this.calender.locator(".ui-datepicker-month").textContent();
        let year1 = await this.calender.locator(".ui-datepicker-year").textContent();
        const targetMonth1 = this.monthMap[Number(date1[0])];
        const targetYear1 = date1[2];

        while (month1 !== targetMonth1 || year1 !== targetYear1) {
            if (Number(year1) > Number(targetYear1) ||
                (year1 === targetYear1 && this.compareMonth(month1 || "", targetMonth1) > 0)) {
                await this.calender.locator(".ui-datepicker-prev").click();
            } else {
                await this.calender.locator(".ui-datepicker-next").click();
            }
            month1 = await this.calender.locator(".ui-datepicker-month").textContent();
            year1 = await this.calender.locator(".ui-datepicker-year").textContent();
        }

        const ele = this.calender.locator(`text="${date1[1]}"`);
        await ele.click();

        // --- DatePicker2 ---
        await this.DatePicker2Field.click();
        await this.calender.locator(".ui-datepicker-month").selectOption({ value: String(Number(date2[0]) - 1) });
        await this.calender.locator(".ui-datepicker-year").selectOption({ value: date2[2] });
        const ele2 = this.calender.locator(`a.ui-state-default:text-is("${date2[1]}")`);
        await ele2.click();

        // --- Start Date ---
        const startDateValue = `${startDate[2]}-${startDate[0].padStart(2, "0")}-${startDate[1].padStart(2, "0")}`;
        await this.StartDate.fill(startDateValue);

        // --- End Date ---
        const endDateValue = `${endDate[2]}-${endDate[0].padStart(2, "0")}-${endDate[1].padStart(2, "0")}`;
        await this.EndDate.fill(endDateValue);

        await this.SubmitButton.click();
    }
}