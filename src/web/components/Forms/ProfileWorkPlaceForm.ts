import { test } from '@playwright/test';
import { BaseComponent } from '@/web/components/BaseComponent';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';

export class ProfileWorkplaceForm extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly closeButton = this.page.getByRole('button').filter({
    has: this.page.locator('.icon-trash'),
  });

  private readonly companyNameField =
    this.elementsHelper.getFieldById('companyName');

  async clickCloseButton(): Promise<void> {
    await test.step('Click close button', async () => {
      await this.closeButton.click();
    });
  }

  async fillCompanyNameField(value: string): Promise<void> {
    await test.step('Fill company name field', async () => {
      await this.companyNameField.fill(value);
    });
  }
}
