import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeePage } from '../pages/EmployeePage';

type Employee = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

import rawData from '../data/employeeData.json';
import { employeeTestData } from '../data/employeeTestData';
import { mockApiResponse } from '../helpers/mockHelpers';
const employeeData = rawData as Employee[];
const {
  employeeID,
  nationality,
  maritalStatus,
  licenseNumber,
  licenseExpiry,
  dateOfBirth,
  gender,
} = employeeTestData[0];

test.describe('Employee Tests', () => {
  let loginPage: LoginPage;
  let employeePage: EmployeePage;

  test.beforeEach(async ({ page }) => {
    // Arrange: Login to the system
    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);

    await loginPage.navigatetoLoginPage();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

    await employeePage.goToEmployeePage();
  });

  employeeData.forEach(({ firstName, middleName, lastName }) => {
    test(`Add employee: ${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`, async ({
      page,
    }) => {
      await mockApiResponse(
        page,
        '**/pim/employees',
        'Employee added successfully'
      );

      // Act: Click Add Employee
      await employeePage.addEmployee(firstName, lastName, middleName);

      // Assert: Save employee record
      await employeePage.saveForm();
    });
  });

  test('Search employee by ID', async ({ page }) => {
    await page.locator('input.oxd-input').nth(1).fill('0003');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.waitForSelector('.oxd-table');
  });

  test('Edit employee', async ({ page }) => {
    const employeeIDLocator = page.locator(`text="${employeeID}"`);

    await mockApiResponse(
      page,
      '**/personal-details',
      'Employee updated successfully',
      200,
      employeeID
    );

    await page.waitForSelector('.oxd-table');
    await expect(employeeIDLocator).toBeVisible();
    await page.locator(`text="${employeeID}"`).click();

    await employeePage.isPersonalDetailsPageDisplayed();

    await employeePage.selectDropdown('Nationality', nationality!);
    await employeePage.selectDropdown('Marital Status', maritalStatus!);
    await employeePage.fillInput("Driver's License Number", licenseNumber!);
    await employeePage.fillInput('License Expiry Date', licenseExpiry!);
    await employeePage.fillInput('Date of Birth', dateOfBirth!);
    await employeePage.selectRadio(gender!);

    await employeePage.saveForm();
  });

  test('Delete employee', async ({ page }) => {
    const employeeID = '0020';

    await mockApiResponse(
      page,
      '**/pim/employees',
      'Employee deleted successfully'
    );

    await page
      .locator(
        `div.oxd-table-row:has(div:has-text("${employeeID}")) .oxd-checkbox-input`
      )
      .click();
    await page.getByRole('button', { name: 'Delete Selected' }).click();
    await page.getByRole('button', { name: 'Yes, Delete' }).click();
  });
});
