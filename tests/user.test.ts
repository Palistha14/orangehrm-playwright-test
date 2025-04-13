import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { mockApiResponse } from '../helpers/mockHelpers';
import { UserPage } from '../pages/UserPage';

test.describe('User Tests', () => {
  let loginPage: LoginPage;
  let userPage: UserPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    userPage = new UserPage(page);
    await loginPage.navigatetoLoginPage();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await expect(page.locator('h6')).toContainText('Dashboard');
  });

  test('Add new user', async ({ page }) => {
    const employeeName = 'Palistha Shakya';
    const username = 'testUser.qa';
    const password = 'P@ss123word';

    await mockApiResponse(page, '**/admin/users', 'User added successfully');

    await userPage.goToUserPage();
    await userPage.addUser();
    await userPage.selectDropdown('User Role', 'Admin');
    await userPage.selectDropdown('Status', 'Enabled');

    await page.getByPlaceholder('Type for hints...').fill(`${employeeName}`);
    await page
      .locator('.oxd-autocomplete-dropdown')
      .locator(`span:has-text("${employeeName}")`)
      .click();
    await page
      .locator('.oxd-input-group:has(label:text("Username")) input')
      .fill(`${username}`);
    await page.locator('input[type="password"]').nth(0).fill(`${password}`);
    await page.locator('input[type="password"]').nth(1).fill(`${password}`);

    await userPage.saveForm();
  });

  test('Edit user', async ({ page }) => {
    const username = 'anna.test';
    await mockApiResponse(page, '**/admin/users', 'User updated successfully');
    await userPage.goToUserPage();
    await page
      .locator(
        `div.oxd-table-row:has(div:has-text("${username}")) i.bi-pencil-fill`
      )
      .click();
    await userPage.selectDropdown('Status', 'Disabled');
    await userPage.saveForm();
  });

  test('Delete user', async ({ page }) => {
    const username = 'anna.test';
    await mockApiResponse(page, '**/admin/users', 'User deleted successfully');
    await userPage.goToUserPage();
    await page
      .locator(
        `div.oxd-table-row:has(div:has-text("${username}")) .oxd-checkbox-input`
      )
      .click();
    await page.getByRole('button', { name: 'Delete Selected' }).click();
    await page.getByRole('button', { name: 'Yes, Delete' }).click();
  });
});
