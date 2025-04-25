import { test, Page } from '@playwright/test';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';

export class FormControlsComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  constructor(private page: Page) {}

  private readonly saveAndContinueButton =
    this.elementsHelper.getButtonByName('Save and continue');

  async clickSaveAndContinueButton(): Promise<void> {
    await test.step('Click "Save and continue" button', async () => {
      await this.saveAndContinueButton.click();
    });
  }
}
