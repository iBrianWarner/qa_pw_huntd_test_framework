import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { DropdownField } from '@/web/components/Fields/DropdownField';
import { EnglishLevel } from '@/common/typedefs/englishLevel.typedefs';
import { Cities } from '@/common/typedefs/cities.typedefs';
import { JobExperience } from '@/common/typedefs/jobExperience.typedefs';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';
import { FormControlsComponent } from '@/web/components/Helpers/FormControlsComponents';
import { IS_ACTIVE_REGEXP } from '@/common/constants/regExp.constants';

export class CandidateJobExpectationsProfilePage extends LoggedInBasePage {
  public readonly url = ROUTES.profile.candidateJobExpectations;

  public readonly dropdownField = new DropdownField(this.page);

  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly formControlsComponent = new FormControlsComponent(this.page);

  private readonly annualButton = this.elementsHelper.getButtonByName('Annual');

  private readonly monthlyButton =
    this.elementsHelper.getButtonByName('Monthly');

  private readonly desiredSalaryFiled =
    this.elementsHelper.getFieldById('salary');

  private readonly jobExperienceField =
    this.elementsHelper.getDropdownFieldByName('Job experience');

  private readonly englishField =
    this.elementsHelper.getDropdownFieldByName('English level');

  private readonly jobExperiencePlusButton =
    this.dropdownField.getPlusIconForField(this.jobExperienceField);

  private readonly jobExperienceMinusButton =
    this.dropdownField.getMinusIconForField(this.jobExperienceField);

  private readonly englishPlusButton = this.dropdownField.getPlusIconForField(
    this.englishField,
  );

  private readonly cityField = this.elementsHelper.getFieldById('location');

  private readonly isRemoteCheckbox = this.page.getByRole('checkbox', {
    name: 'Remote',
  });

  async fillDesiredSalaryField(value: number): Promise<void> {
    await test.step('Fill desired salary field', async () => {
      await this.desiredSalaryFiled.fill(String(value));
    });
  }

  async typeDesiredSalaryField(value: number): Promise<void> {
    await test.step('Type desired salary field', async () => {
      await this.desiredSalaryFiled.pressSequentially(String(value));
    });
  }

  async assertAnnualButtonIsActive(): Promise<void> {
    await test.step('Assert annual button is active', async () => {
      await expect(this.annualButton).toHaveClass(IS_ACTIVE_REGEXP);
    });
  }

  async clickJobExperiencePlusButton(): Promise<void> {
    await test.step('Click job experience plus button', async () => {
      await this.jobExperiencePlusButton.click();
    });
  }

  async clickJobExperienceMinusButton(): Promise<void> {
    await test.step('Click job experience minus button', async () => {
      await this.jobExperienceMinusButton.click();
    });
  }

  async selectJobExperience(experience: JobExperience): Promise<void> {
    await test.step('Select technology', async () => {
      await this.dropdownField.selectOption(experience);
    });
  }

  async selectJobExperienceFromDropdown(
    experience: JobExperience,
  ): Promise<void> {
    await test.step('Select job experience from dropdown', async () => {
      await this.clickJobExperiencePlusButton();
      await this.selectJobExperience(experience);
    });
  }

  async clickEnglishPlusButton(): Promise<void> {
    await test.step('Click English plus button', async () => {
      await this.englishPlusButton.click();
    });
  }

  async selectEnglishLevel(englishLevel: EnglishLevel): Promise<void> {
    await test.step('Select English level', async () => {
      await this.dropdownField.selectOption(englishLevel);
    });
  }

  async selectEnglishLevelFromDropdown(
    englishLevel: EnglishLevel,
  ): Promise<void> {
    await test.step('Select English level from dropdown', async () => {
      await this.clickEnglishPlusButton();
      await this.selectEnglishLevel(englishLevel);
    });
  }

  async fillCityField(value: Cities): Promise<void> {
    await test.step('Fill city field', async () => {
      await this.cityField.fill(value);
    });
  }

  async selectCity(value: Cities): Promise<void> {
    await test.step('Select city', async () => {
      await this.fillCityField(value);
      await this.dropdownField.selectLocationOption(value);
    });
  }

  async waitForCityFieldHasValue(city: Cities): Promise<void> {
    await test.step('Wait for city field has value', async () => {
      const cityField = this.elementsHelper.getDropdownFieldByName(city);

      await cityField.waitFor();
    });
  }

  async assertIsRemoteCheckboxIsChecked(): Promise<void> {
    await test.step('Assert is remote checkbox is checked', async () => {
      await expect(this.isRemoteCheckbox).toBeChecked();
    });
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.formControlsComponent.clickSaveAndContinueButton();
  }
}
