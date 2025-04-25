/* eslint-disable playwright/no-page-pause */
/* eslint-disable playwright/no-wait-for-timeout */
/* eslint-disable playwright/no-conditional-in-test */
import { expect, test } from '@playwright/test';
import { ApiWrapper } from '@pages/ApiWrapper';

export abstract class BasePage extends ApiWrapper {
  abstract url: string;

  private readonly clock = this.page.clock;

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

  async waitForTimeout(timeout: number): Promise<void> {
    await test.step(`Wait for ${timeout}ms`, async () => {
      await this.page.waitForTimeout(timeout);
    });
  }

  async pause(): Promise<void> {
    await test.step(`Pause ${this.pageName} page`, async () => {
      await this.page.pause();
    });
  }

  async reload(shouldAssertOpened = true): Promise<void> {
    await test.step(`Reload ${this.pageName} page`, async () => {
      await this.page.reload();

      if (shouldAssertOpened) {
        await this.assertOpened();
      }
    });
  }

  async setFixedTime(time: number | string | Date): Promise<void> {
    await test.step('Set fixed page time', async () => {
      await this.page.clock.setFixedTime(time);
    });
  }

  async setSystemTime(time: number | string | Date): Promise<void> {
    await test.step('Set system time', async () => {
      await this.page.clock.setSystemTime(time);
    });
  }

  async installFakeTimeControlFunctions(): Promise<void> {
    await test.step('Install fake time control functions', async () => {
      await this.clock.install();
    });
  }

  async fastForwardTime(ticks: number): Promise<void> {
    await test.step('Fast forward time', async () => {
      await this.page.clock.fastForward(ticks);
    });
  }
}
