import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class ChooseProfilePage extends BasePage {
  url = ROUTES.chooseProfile;

  private readonly candidateOptionTile = this.page.getByText('Candidate');

  private readonly recruiterOptionTile = this.page.getByText('Recruiter');

  async clickCandidateOptionTile(): Promise<void> {
    await test.step('Click candidate option tile', async () => {
      await this.candidateOptionTile.click();
    });
  }

  async clickRecruiterOptionTile(): Promise<void> {
    await test.step('Click recruiter option tile', async () => {
      await this.recruiterOptionTile.click();
    });
  }

  async assertCandidateOptionTileIsVisible(): Promise<void> {
    await test.step('Assert candidate option tile is visible', async () => {
      await expect(this.candidateOptionTile).toBeVisible();
    });
  }

  async assertRecruiterOptionTileIsVisible(): Promise<void> {
    await test.step('Assert recruiter option tile is visible', async () => {
      await expect(this.recruiterOptionTile).toBeVisible();
    });
  }
}
