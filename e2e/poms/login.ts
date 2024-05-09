import {Page, expect} from "@playwright/test";

export default class LoginPage {
    page: Page;
    constructor(page: Page){
        this.page = page;
    }
    loginUserAndVerify = async({
        email, password
    }:{
        email:string;
        password: string;
    }) :  Promise<void> =>{
        await this.page.locator('[data-test-id="neeto-auth-email-input-field"]').fill('cpts9gnqty9-planner-ayush_kumar-silicon_university@bigbinary.com');
        await this.page.locator('[data-test-id="neeto-auth-login-button"]').click();
        await this.page.getByPlaceholder('Enter 6 digit login code').fill('123456');
        await this.page.locator('[data-test-id="main-header"]').waitFor({ state: 'visible', timeout: 50000 });
        await expect(this.page.locator('[data-test-id="main-header"]')).toContainText("Active Projects");
    }
}