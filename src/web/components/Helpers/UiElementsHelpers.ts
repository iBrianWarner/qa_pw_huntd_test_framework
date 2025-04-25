import { Page, Locator } from 'playwright';

export class UiElementsHelper {
  constructor(private page: Page) {}

  public getFieldById(fieldId: string): Locator {
    return this.page.locator(`input#${fieldId}`);
  }

  public getButtonByName(name: string): Locator {
    return this.page.getByRole('button', { name });
  }

  public getDropdownFieldByName(name: string): Locator {
    return this.page.locator('.select__control').filter({ hasText: name });
  }
}
