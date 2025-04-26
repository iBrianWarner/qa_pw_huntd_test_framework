import { test, Page } from '@playwright/test';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';

export class FormControlsComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  constructor(private page: Page) {}

  private readonly saveAndContinueButton =
    this.elementsHelper.getButtonByName('Save and continue');

  private readonly firstNameField =
    this.elementsHelper.getFieldById('firstName');

  private readonly lastNameField = this.elementsHelper.getFieldById('lastName');

  async clickSaveAndContinueButton(): Promise<void> {
    await test.step('Click "Save and continue" button', async () => {
      await this.saveAndContinueButton.click();
    });
  }

  async fillFirstNameField(firstName: string): Promise<void> {
    await test.step('Fill first name field', async () => {
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName: string): Promise<void> {
    await test.step('Fill last name field', async () => {
      await this.lastNameField.fill(lastName);
    });
  }
}
