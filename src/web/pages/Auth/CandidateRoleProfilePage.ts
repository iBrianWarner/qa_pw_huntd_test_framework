import { ROUTES } from '@/web/constants';
import { test, expect, Locator } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { DropdownField } from '@/web/components/Fields/DropdownField';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';
import { FormControlsComponent } from '@/web/components/Helpers/FormControlsComponents';

export class CandidateRoleProfilePage extends LoggedInBasePage {
  public readonly url = ROUTES.profile.candidate;

  public readonly dropdownField = new DropdownField(this.page);

  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly formControlsComponent = new FormControlsComponent(this.page);

  private readonly desiredPositionField =
    this.elementsHelper.getFieldById('position');

  private readonly desiredRolePlusButton =
    this.dropdownField.getPlusIconForField(this.page);

  private readonly desiredRoleMinusButton =
    this.dropdownField.getMinusIconForField(this.page);

  private readonly technologiesFieldLabel = this.page.getByText(
    'Type and select strongest tech skills',
  );

  private readonly technologiesField =
    this.elementsHelper.getFieldById('technologies');

  private getRoleLocator(role: string): Locator {
    return this.page.locator('.select__option').filter({
      hasText: role,
    });
  }

  async fillDesiredPositionField(value: string): Promise<void> {
    await test.step('Fill desired position field', async () => {
      await this.desiredPositionField.fill(value);
    });
  }

  async assertDesiredPositionFieldValue(value: string): Promise<void> {
    await test.step('Assert desired position field value', async () => {
      await expect(this.desiredPositionField).toHaveValue(value);
    });
  }

  async clickDesiredRolePlusButton(): Promise<void> {
    await test.step('Click desired role plus button', async () => {
      await this.desiredRolePlusButton.click();
    });
  }

  async clickDesiredRoleMinusButton(): Promise<void> {
    await test.step('Click desired role minus button', async () => {
      await this.desiredRoleMinusButton.click();
    });
  }

  async waitForRoleIsVisible(role: string): Promise<void> {
    await test.step('Wait for role is visible', async () => {
      await this.getRoleLocator(role).waitFor();
    });
  }

  async selectDesiredRole(role: string): Promise<void> {
    await test.step('Select desired role', async () => {
      await this.getRoleLocator(role).click();
    });
  }

  async clickTechnologiesFieldLabel(): Promise<void> {
    await test.step('Click technologies field label', async () => {
      await this.technologiesFieldLabel.click();
    });
  }

  async fillTechnologiesField(value: string): Promise<void> {
    await test.step('Fill technologies field', async () => {
      await this.technologiesField.fill(value);
    });
  }

  async selectTechnology(technology: string): Promise<void> {
    await test.step('Select technology', async () => {
      await this.dropdownField.selectOption(technology);
    });
  }

  async addTechnology(options: {
    inputValue: string;
    technologyName: string;
  }): Promise<void> {
    await test.step('Add technology', async () => {
      const { inputValue, technologyName } = options;

      await this.fillTechnologiesField(inputValue);
      await this.selectTechnology(technologyName);
    });
  }

  async addTechnologies(options: {
    inputValue: string;
    technologies: string[];
  }): Promise<void> {
    await test.step('Add multiple technologies', async () => {
      const { inputValue, technologies } = options;

      for (const technology of technologies) {
        await this.addTechnology({ inputValue, technologyName: technology });
      }
    });
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.formControlsComponent.clickSaveAndContinueButton();
  }
}
