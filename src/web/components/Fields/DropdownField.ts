import { test, Locator, Page } from '@playwright/test';
import { Cities } from '@/common/typedefs/cities.typedefs';
import { BaseComponent } from '@/web/components/BaseComponent';
import { UiElementsHelper } from '../Helpers/UiElementsHelpers';

export class DropdownField extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  public readonly selectDropdownOption = this.page.locator('.select__option');

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
    await test.step(`Click on the required option ${option}`, async () => {
      await this.selectDropdownOption.filter({ hasText: option }).click();
    });
  }

  async selectLocationOption(option: Cities | string): Promise<void> {
    await test.step('Click on location option', async () => {
      await this.getLocationOption(option).first().click();
    });
  }
}
