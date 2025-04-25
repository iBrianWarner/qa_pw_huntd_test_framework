import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web/components/BaseComponent';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';
import { DropdownField } from '@/web/components/Fields/DropdownField';
import { Months } from '@/common/typedefs/months.typedefs';
import { IS_ACTIVE_REGEXP } from '@/common/constants/regExp.constants';

export class ProfileWorkplaceForm extends BaseComponent {
  public readonly dropdownField = new DropdownField(this.page);

  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly closeButton = this.page.getByRole('button').filter({
    has: this.page.locator('.icon-trash'),
  });

  private readonly roleField = this.elementsHelper.getFieldById('title');

  private readonly companyNameField =
    this.elementsHelper.getFieldById('companyName');

  private readonly startDateMonthDropdown =
    this.elementsHelper.getDropdownFieldByName('Month');

  private readonly startDateYearField = this.page.getByPlaceholder('Year');

  private readonly imWorkingHereButton =
    this.elementsHelper.getButtonByName('I’m working here');

  private readonly endDateButton =
    this.elementsHelper.getButtonByName('End date');

  private readonly achievementsField =
    this.elementsHelper.getTextareaById('description');

  private readonly saveButton = this.elementsHelper.getButtonByName('Save');

  async clickCloseButton(): Promise<void> {
    await test.step('Click close button', async () => {
      await this.closeButton.click();
    });
  }

  async fillRoleField(value: string): Promise<void> {
    await test.step('Fill role field', async () => {
      await this.roleField.fill(value);
    });
  }

  async fillCompanyNameField(value: string): Promise<void> {
    await test.step('Fill company name field', async () => {
      await this.companyNameField.fill(value);
    });
  }

  async clickStartDateMonthDropdown(): Promise<void> {
    await test.step('Click start date month dropdown', async () => {
      await this.startDateMonthDropdown.click();
    });
  }

  async selectStartDateMonth(value: Months): Promise<void> {
    await test.step('Select start date month', async () => {
      await this.dropdownField.selectOption(value);
    });
  }

  async selectStartDateMonthFromDropdown(value: Months): Promise<void> {
    await test.step('Select start date month from dropdown', async () => {
      await this.clickStartDateMonthDropdown();
      await this.selectStartDateMonth(value);
    });
  }

  async fillStartDateYearField(value: number): Promise<void> {
    await test.step('Fill start date year field', async () => {
      await this.startDateYearField.fill(String(value));
    });
  }

  async assertImWorkingHereButtonIsActive(): Promise<void> {
    await test.step('Assert "I’m working here" button is active', async () => {
      await expect(this.imWorkingHereButton).toHaveClass(IS_ACTIVE_REGEXP);
    });
  }

  async fillAchievementsField(value: string): Promise<void> {
    await test.step('Fill achievements field', async () => {
      await this.achievementsField.fill(value);
    });
  }

  async clickSaveButton(): Promise<void> {
    await test.step('Click "Save" button', async () => {
      await this.saveButton.click();
    });
  }
}
