import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigatetoLoginPage() {
    await this.page.goto('/web/index.php/auth/login', {
      waitUntil: 'domcontentloaded',
    });
  }

  async login(username: string, password: string) {
    const h5 = this.page.locator('h5', { hasText: 'Login' });
    await expect(h5).toBeVisible();
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
