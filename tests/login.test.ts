import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Arrange: Navigate to login
    loginPage = new LoginPage(page);
    await loginPage.navigatetoLoginPage();
  });

  test('Login with valid credentials', async ({ page }) => {
    // Act: Perform login
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

    // Assert: Verify successful login
    await expect(page.locator('h6')).toContainText('Dashboard');
  });

  test('Invalid credentials login shows error', async ({ page }) => {
    // Act: Perform login
    await loginPage.login(process.env.EMAIL!, 'invalidPassword');

    // Assert: URL has not changed
    await expect(page).toHaveURL(/.*\/auth\/login/);

    // Assert: Error message is shown
    const errorMessage = page.locator('.oxd-alert-content-text');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid credentials');
  });

  test('Logged out', async ({ page }) => {
    // Act: Perform login
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await page.locator('.oxd-userdropdown-tab').click();
    await page.locator('text=Logout').click();

    // Assert: You are redirected to the login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
    const h5 = page.locator('h5', { hasText: 'Login' });
    await expect(h5).toBeVisible();
  });
});
