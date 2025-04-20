import { Page, Response } from '@playwright/test';

/**
 * Wraps methods with the capability to wait for an API request to complete.
 */
export class ApiWrapper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  waitForApiResponse(matchingText: string): Promise<Response> {
    return this.page.waitForResponse(
      async response =>
        response.url().includes('/api') &&
        (await response.text()).includes(matchingText),
    );
  }
}
