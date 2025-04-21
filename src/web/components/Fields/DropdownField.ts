import { BaseComponent } from '@/web/components/BaseComponent';
import { test, Locator, Page } from '@playwright/test';

export class DropdownField extends BaseComponent {
  private readonly selectDropdownOption = this.page.locator('.select__option');

  public getPlusIconForField(field: Locator | Page): Locator {
    return field.locator('.icon-plus');
  }

  public getMinusIconForField(field: Locator | Page): Locator {
    return field.locator('.icon-minus');
  }

  async selectOption(option: string): Promise<void> {
    await test.step('Click on option with the required option', async () => {
      await this.selectDropdownOption
        .filter({ hasText: option })
        .click();
    });
  }
}
