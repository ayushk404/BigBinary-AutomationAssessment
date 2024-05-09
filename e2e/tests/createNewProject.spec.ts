import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import LoginPage from "../poms/login";

test.describe("Create Project", () => {
  test("should login with the correct credentials and create a new project", async ({ page }) => {
    await page.goto("https://ayush-kumar-silicon-university.neetoplanner.net");
    const login = new LoginPage(page);
    const email = 'cpts9gnqty9-planner-ayush_kumar-silicon_university@bigbinary.com';
    const password = '123456'
    await login.loginUserAndVerify({email, password});
    const taskNumber = faker.string.numeric({length: {min:1, max: 3}});
    const newTask = `TP${taskNumber}`
    await page.getByRole('button', {name: 'Add new project'}).click();
    await page.getByPlaceholder('Enter project name').fill(newTask);
    await page.getByPlaceholder('Enter description').fill(`Test Project Number: ${taskNumber}`);
    await page.locator('[data-test-id = "save-changes-button"]').click();
    await expect(page.getByTestId('neeto-molecules-header').getByText(newTask)).toContainText(newTask);
  });
});