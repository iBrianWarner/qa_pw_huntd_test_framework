import { Page, Response } from '@playwright/test';
export class ApiWrapper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  waitForApiResponse(matchingText: string): Promise<Response> {
    return this.page.waitForResponse(
      async response =>
        response.url().includes('/graphql') &&
        (await response.text()).includes(matchingText),
    );
  }
}
