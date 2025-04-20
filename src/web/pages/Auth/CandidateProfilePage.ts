import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';

export class CandidateProfilePage extends LoggedInBasePage {
  url = ROUTES.profile.candidate;

  private readonly desiredPositionField = this.page.locator(
    'input[name="position"]',
  );

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
}
