import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { DropdownField } from '@/web/components/Fields/DropdownField';

export class CandidateJobExpectationsProfilePage extends LoggedInBasePage {
  url = ROUTES.profile.candidateJobExpectations;

  public readonly dropdownField = new DropdownField(this.page);

  private readonly annualButton = this.page.getByRole('button', {
    name: 'Annual',
  });

  private readonly monthlyButton = this.page.getByRole('button', {
    name: 'Monthly',
  });

  private readonly desiredSalaryFiled = this.page.locator(
    'input[name="salary"]',
  );

  private readonly jobExperienceField = this.page
    .locator('.select__control')
    .filter({ hasText: 'Job experience' });
  
  private readonly jobExperiencePlusButton = this.dropdownField
    .getPlusIconForField(this.jobExperienceField);

  private readonly jobExperienceMinusButton = this.jobExperienceField.locator(
    '.icon-minus',
  );

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
      await this.dropdownField.getPlusIconForField(this.jobExperienceField).click();
      await this.jobExperienceMinusButton.click();
    });
  }

  async selectJobExperience(experience: string): Promise<void> {
    await test.step('Select technology', async () => {
      await this.dropdownField.selectOption(experience);
    });
  }
}
