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
const employeeData = rawData as Employee[];
const { employeeID, nationality, maritalStatus, licenseNumber, licenseExpiry, dateOfBirth, gender } = employeeTestData[0];


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
    test(`Add employee: ${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`, async ({ }) => {
    // Act: Click Add Employee
    await employeePage.addEmployee(firstName, lastName, middleName);
  
    // Assert: Check if its successful
    await employeePage.isPersonalDetailsPageDisplayed();
    });
  });
  
  test('Edit employee', async ({ page }) => {
    const employeeIDLocator = page.locator(`text="${employeeID}"`);
  
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
    const employeeID = '0020'
    await page.locator(`div.oxd-table-row:has(div:has-text("${employeeID}")) .oxd-checkbox-input`).click();
    await page.getByRole('button', { name: 'Delete Selected' }).click();
    await page.getByRole('button', { name: 'Yes, Delete' }).click();
    const response = await page.waitForResponse(
      (resp) => resp.url().includes('/employee') && resp.status() === 200
    );
    console.log('Response status:', response.status());
    expect(response.status()).toBe(200);
  });
});
