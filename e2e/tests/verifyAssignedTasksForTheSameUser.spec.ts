import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Adding tasks and verify", () => {
  test("should add two projects and then assign tasks to the user and verify", async ({page}) => {
    await page.goto("https://ayush-kumar-silicon-university.neetoplanner.net");
    await page.locator('[data-test-id="neeto-auth-email-input-field"]').fill('cpts9gnqty9-planner-ayush_kumar-silicon_university@bigbinary.com');
    await page.locator('[data-test-id="neeto-auth-login-button"]').click();
    await page.getByPlaceholder('Enter 6 digit login code').fill('123456');
    await page.locator('[data-test-id="main-header"]').waitFor({ state: 'visible', timeout: 50000 });
    await expect(page.locator('[data-test-id="main-header"]')).toContainText("Active Projects");
    
    //adding task 1
    const taskNumber1 = faker.string.numeric({length: {min:1, max: 3}});
    const newTask1 = `TP${taskNumber1}`
    await page.getByRole('button', {name: 'Add new project'}).click();
    await page.getByPlaceholder('Enter project name').fill(newTask1);
    await page.getByPlaceholder('Enter description').fill(`Test Project Number: ${taskNumber1}`);
    await page.locator('[data-test-id = "save-changes-button"]').click();
    await expect(page.getByTestId('neeto-molecules-header').getByText(newTask1)).toContainText(newTask1);
    await page.getByRole('button', { name: 'Add new task' }).click();
    await page.getByTestId('neeto-molecules-autosave-input').fill(`Task ${taskNumber1}`);
    await page.getByTestId('neeto-molecules-autosave-input-save').click();
    const taskAssigned1 = `Task ${taskNumber1}`;
    const pattern1 = new RegExp(`^${taskAssigned1} #.*`);
    await page.getByRole('row', { name: `Task ${taskNumber1} #${newTask1}106` }).getByRole('button').nth(2).click();
    await page.getByRole('button', { name: 'Ayush Kumar (you)' }).click();
    await page.getByText('NameAssigneeDue dateNew Tasks').click();
    await page.getByText(`Task ${taskNumber1}#${newTask1}106`).click();
    await page.getByText('Add a description here.').click();
    await page.locator('div').filter({ hasText: /^Normal textSave changesCancelAdd attachment$/ }).getByRole('textbox').fill('New Task');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await page.locator('div').filter({ hasText: /^CommentsActivitiesNormal textComment$/ }).getByRole('textbox').fill('New Comment');
    await page.getByRole('button', { name: 'Comment', exact: true }).click();
    await page.getByTestId('close-button').click();
    await page.getByRole('link', { name: 'Ayush Kumar Silicon University' }).click();

    //adding task 2
    const taskNumber2 = faker.string.numeric({length: {min:1, max: 3}});
    const newTask2 = `TP${taskNumber2}`
    await page.getByRole('button', {name: 'Add new project'}).click();
    await page.getByPlaceholder('Enter project name').fill(newTask2);
    await page.getByPlaceholder('Enter description').fill(`Test Project Number: ${taskNumber2}`);
    await page.locator('[data-test-id = "save-changes-button"]').click();
    await expect(page.getByTestId('neeto-molecules-header').getByText(newTask2)).toContainText(newTask2);
    await page.getByRole('button', { name: 'Add new task' }).click();
    await page.getByTestId('neeto-molecules-autosave-input').fill(`Task ${taskNumber2}`);
    await page.getByTestId('neeto-molecules-autosave-input-save').click();
    const taskAssigned2 = `Task ${taskNumber2}`;
    const pattern2 = new RegExp(`^${taskAssigned2} #.*`);
    await page.getByRole('row', { name: `Task ${taskNumber2} #${newTask2}106` }).getByRole('button').nth(2).click();
    await page.getByRole('button', { name: 'Ayush Kumar (you)' }).click();
    await page.getByText('NameAssigneeDue dateNew Tasks').click();
    await page.getByText(`Task ${taskNumber2}#${newTask2}106`).click();
    await page.getByText('Add a description here.').click();
    await page.locator('div').filter({ hasText: /^Normal textSave changesCancelAdd attachment$/ }).getByRole('textbox').fill('New Task');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await page.locator('div').filter({ hasText: /^CommentsActivitiesNormal textComment$/ }).getByRole('textbox').fill('New Comment');
    await page.getByRole('button', { name: 'Comment', exact: true }).click();
    await page.getByTestId('close-button').click();

    //verifying first task
    await page.getByTestId('navlink-tasks').click();
    await page.getByRole('button', { name: taskAssigned1 }).click();
    await expect(page.getByText('New Task', { exact: true })).toContainText('New Task');
    await expect(page.getByText('New Comment').first()).toContainText('New Comment');
    await expect(page.locator('div').filter({ hasText: /^Ayush Kumar$/ }).first()).toBeVisible();
    await page.getByTestId('close-button').click();

    //verifying second task
    await page.getByRole('button', { name: taskAssigned2 }).click();
    await expect(page.getByText('New Task', { exact: true })).toContainText('New Task');
    await expect(page.getByText('New Comment').first()).toContainText('New Comment');
    await expect(page.locator('div').filter({ hasText: /^Ayush Kumar$/ }).first()).toBeVisible();
    await page.getByTestId('close-button').click();
  });
});