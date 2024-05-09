//import { test, expect } from "@playwright/test";
import { test } from "../fixtures";

test.describe("Login page", () => {
  test("should login with the correct credentials and verify", async ({ page, loginPage}) => {
    await page.goto("https://ayush-kumar-silicon-university.neetoplanner.net");
    // await page.locator('[data-test-id="neeto-auth-email-input-field"]').fill('cpts9gnqty9-planner-ayush_kumar-silicon_university@bigbinary.com');
    // await page.locator('[data-test-id="neeto-auth-login-button"]').click();
    // await page.getByPlaceholder('Enter 6 digit login code').fill('123456');
    // await page.locator('[data-test-id="main-header"]').waitFor({ state: 'visible', timeout: 50000 });
    // await expect(page.locator('[data-test-id="main-header"]')).toContainText("Active Projects");
    const email = 'cpts9gnqty9-planner-ayush_kumar-silicon_university@bigbinary.com';
    const password = '123456'
    //await login.loginUserAndVerify({email, password});
    await loginPage.loginUserAndVerify({email, password});
  });
});