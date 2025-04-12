import { expect, Page } from '@playwright/test';

export class UserPage {
  constructor(private page: Page) {}

  async goToUserPage() {
    await this.page.locator('text=Admin').click();
    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page.getByRole('heading', { name: 'Add User' })).toBeVisible();
  }

  async selectDropdown(labelText: string, value: string) {
    await this.page.locator(`label:has-text("${labelText}")`)
    .locator('xpath=../../..')
    .locator('.oxd-select-text').click();
    await this.page.waitForSelector('.oxd-select-dropdown');
    await this.page.locator(`.oxd-select-dropdown >> text="${value}"`).click();
  }

  async saveForm() {
    await this.page.click('button:has-text("Save")');
  }
}
