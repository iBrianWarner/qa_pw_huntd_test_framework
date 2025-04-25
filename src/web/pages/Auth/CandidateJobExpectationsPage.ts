import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { DropdownField } from '@/web/components/Fields/DropdownField';
import { Cities, EnglishLevel } from '@/common/typedefs/candidateInfo.typedefs';
import { CommonInputs } from '@/web/components/Fields/CommonInputs';

export class CandidateJobExpectationsProfilePage extends LoggedInBasePage {
  url = ROUTES.profile.candidateJobExpectations;

  public readonly dropdownField = new DropdownField(this.page);

  public readonly commonInputs = new CommonInputs(this.page);

  private readonly annualButton = this.page.getByRole('button', {
    name: 'Annual',
  });

  private readonly monthlyButton = this.page.getByRole('button', {
    name: 'Monthly',
  });

  private readonly desiredSalaryFiled =
    this.commonInputs.getFieldById('salary');

  private readonly jobExperienceField = this.page
    .locator('.select__control')
    .filter({ hasText: 'Job experience' });

  private readonly englishField = this.page
    .locator('.select__control')
    .filter({ hasText: 'English level' });

  private readonly jobExperiencePlusButton =
    this.dropdownField.getPlusIconForField(this.jobExperienceField);

  private readonly jobExperienceMinusButton =
    this.dropdownField.getMinusIconForField(this.jobExperienceField);

  private readonly englishPlusButton = this.dropdownField.getPlusIconForField(
    this.englishField,
  );

  private readonly cityField = this.commonInputs.getFieldById('location');

  private readonly isRemoteCheckbox = this.page.getByRole('checkbox', {
    name: 'Remote',
  });

  private readonly saveAndContinueButton = this.page.getByRole('button', {
    name: 'Save and continue',
  });

  async fillDesiredSalaryField(value: number): Promise<void> {
    await test.step('Fill desired salary field', async () => {
      await this.desiredSalaryFiled.fill(String(value));
    });
  }

  async assertAnnualButtonIsActive(): Promise<void> {
    await test.step('Assert annual button is active', async () => {
      await expect(this.annualButton).toHaveClass(/is-active/);
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

  async selectJobExperience(experience: string): Promise<void> {
    await test.step('Select technology', async () => {
      await this.dropdownField.selectOption(experience);
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

  async assertIsRemoteCheckboxIsChecked(): Promise<void> {
    await test.step('Assert is remote checkbox is checked', async () => {
      await expect(this.isRemoteCheckbox).toBeChecked();
    });
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await test.step('Click save and continue button', async () => {
      await this.saveAndContinueButton.click();
    });
  }
}
