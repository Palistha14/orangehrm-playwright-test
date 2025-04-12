import { expect, Page } from '@playwright/test';

export class EmployeePage {
  constructor(private page: Page) {}

  async goToEmployeePage() {
    await this.page.locator('text=PIM').click();    
  }

  async addEmployee(firstName: string, lastName: string, middleName?: string) {
    await this.page.locator('text=Add Employee').click();
    await this.page.fill('input[name="firstName"]', firstName);

    if (middleName) {
      await this.page.fill('input[name="middleName"]', middleName);
    }

    await this.page.fill('input[name="lastName"]', lastName);
    await this.page.click('button:has-text("Save")');
    await this.page.waitForURL('**/pim/viewPersonalDetails/empNumber/**');
  }

  async isPersonalDetailsPageDisplayed() {
    const h6 = this.page.locator('h6', { hasText: 'Personal Details' });
    await expect(h6).toBeVisible();
  }

  async selectDropdown(labelText: string, value: string) {
    const dropdown = this.page.locator(`div.oxd-input-group:has(label:has-text("${labelText}"))`);
    await dropdown.locator('.oxd-select-text').click();
    await this.page.locator(`.oxd-select-dropdown >> text=${value}`).click();
  }

  async fillInput(labelText: string, value: string) {
    const input = this.page.locator(`div.oxd-input-group:has(label:has-text("${labelText}")) input`);
    await input.click();
    await input.fill(value);
    await input.press('Enter');
  }

  async selectRadio(labelText: string) {
    await this.page.locator(`label:has-text("${labelText}")`).click();
  }

  async saveForm() {
    await this.page.click('button:has-text("Save")');
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes('/personal-details') && resp.status() === 200
    );
    console.log('Response status:', response.status());
    expect(response.status()).toBe(200);
  }
}
