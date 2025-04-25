import { Cities } from '@/common/typedefs/candidateInfo.typedefs';
import { BaseComponent } from '@/web/components/BaseComponent';
import { test, Locator, Page } from '@playwright/test';

export class DropdownField extends BaseComponent {
  private readonly selectDropdownOption = this.page.locator('.select__option');

  private getLocationOption(option: string): Locator {
    return this.page.locator('.pac-item').filter({
      hasText: option,
    });
  }

  public getPlusIconForField(field: Locator | Page): Locator {
    return field.locator('.icon-plus');
  }

  public getMinusIconForField(field: Locator | Page): Locator {
    return field.locator('.icon-minus');
  }

  async selectOption(option: string): Promise<void> {
    await test.step('Click on option with the required option', async () => {
      await this.selectDropdownOption.filter({ hasText: option }).click();
    });
  }

  async selectLocationOption(option: Cities | string): Promise<void> {
    await test.step('Click on location option', async () => {
      await this.getLocationOption(option).first().click();
    });
  }
}
