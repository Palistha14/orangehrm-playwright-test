import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeePage } from '../pages/EmployeePage';
import { employeeTestData } from '../data/employeeTestData';

const { nationality, maritalStatus } = employeeTestData[0];

test.describe('Role-based Access Control Tests', () => {
  let loginPage: LoginPage;
  let employeePage: EmployeePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);
    await loginPage.navigatetoLoginPage();
  });

  test('Login with ESS role', async ({ page }) => {
    await loginPage.login(process.env.EMAIL_TEST!, process.env.PASSWORD_TEST!);

    // Check if ESS user role can be redirect to Employee List page
    await page.goto('/web/index.php/pim/viewEmployeeList');

    const errorMessage = page.locator('text=Credential Required');
    await expect(errorMessage).toBeVisible();
  });

  test('Able to update personal information based on access provided', async ({
    page,
  }) => {
    await loginPage.login(process.env.EMAIL_TEST!, process.env.PASSWORD_TEST!);
    await page.locator('text=My Info').click();

    // Check if this funtion is disabled or not
    const labelText = "Driver's License Number";
    const input = page.locator(
      `div.oxd-input-group:has(label:has-text("${labelText}")) input`
    );
    await expect(input).toBeDisabled();

    await employeePage.selectDropdown('Nationality', nationality!);
    await employeePage.selectDropdown('Marital Status', maritalStatus!);

    await employeePage.saveForm();
  });
});
