import test from '@playwright/test';
import { ApiWrapper } from '@pages/ApiWrapper';

export class BaseComponent extends ApiWrapper {
  async closeWithEscape(): Promise<void> {
    await test.step('Close element with escape', async () => {
      await this.page.keyboard.press('Escape');
    });
  }

  async pressKeyboardEnter(delay = 0): Promise<void> {
    await test.step('Press [Enter]', async () => {
      await this.page.keyboard.press('Enter', { delay });
    });
  }

  async pressKeyboardArrowDown(delay = 0): Promise<void> {
    await test.step('Press [Arrow down]', async () => {
      await this.page.keyboard.press('ArrowDown', { delay });
    });
  }

  async pressKeyboardTab(delay = 0): Promise<void> {
    await test.step('Press [Arrow down]', async () => {
      await this.page.keyboard.press('Tab', { delay });
    });
  }

  async getTextFromClipboard(): Promise<string> {
    return await test.step('Get text from clipboard', async () => {
      return await this.page.evaluate(
        async () => await navigator.clipboard.readText(),
      );
    });
  }
}
