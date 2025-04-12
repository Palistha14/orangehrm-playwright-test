import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";

test('Login with valid credentials', async ({ page }) => {
  // Arrange: Navigate to login
  const loginPage = new LoginPage(page);
  await loginPage.navigatetoLoginPage();

  // Act: Perform login
  await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

  // Assert: Verify successful login
  await expect(page.locator('h6')).toContainText('Dashboard');
});
