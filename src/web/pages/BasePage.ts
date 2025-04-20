import { expect, test, Page } from '@playwright/test';

export abstract class BasePage {
  abstract url: string;

  readonly page: Page;

  get pageName(): string {
    return this.constructor.name.replace('Page', '');
  }

  private generateUrlWithParameters(
    url: string,
    parameters: Record<string, string>,
  ): string {
    let newUrl = `${url}?`;

    newUrl += Object.keys(parameters).map(key => `${key}=${parameters[key]}&`);

    return newUrl.slice(0, -1).replace(',', '');
  }

  async goto(url?: string): Promise<void> {
    await test.step(`Go to ${this.pageName} page`, async () => {
      await this.page.goto(url || this.url);
    });
  }

  async visit(url?: string): Promise<void> {
    await test.step(`Visit ${this.pageName} page`, async () => {
      await this.goto(url || this.url);
      await this.assertOpened(url || this.url);
    });
  }

  async assertOpened(
    url?: string | RegExp,
    parameters?: Record<string, string>,
  ): Promise<void> {
    await test.step(`Assert ${this.pageName} page url is correct`, async () => {
      let urlToAssert = url ?? this.url;

      if (parameters && typeof urlToAssert === 'string') {
        urlToAssert = this.generateUrlWithParameters(urlToAssert, parameters);
      }

      await this.page.waitForURL(urlToAssert, { waitUntil: 'commit' });
      await expect(this.page).toHaveURL(urlToAssert ?? this.url);
    });
  }
}
