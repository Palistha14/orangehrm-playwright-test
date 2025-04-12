import { Page } from '@playwright/test';

export async function mockApiResponse(
  page: Page,
  url: string,
  message: string,
  status: number = 200,
  employeeID?: string
) {
  await page.route(url, async (route) => {
    await route.fulfill({
      status: status,
      contentType: 'application/json',
      body: JSON.stringify({
        message: message,
        ...(employeeID ? { employeeID } : {}),
      }),
    });
  });
}
