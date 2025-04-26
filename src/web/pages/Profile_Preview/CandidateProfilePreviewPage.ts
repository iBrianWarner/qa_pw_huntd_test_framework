import { ROUTES } from '@/web/constants';
import { test } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';

export class CandidateProfilePreviewPage extends LoggedInBasePage {
  public readonly url = ROUTES.profilePreview.candidate;

  private readonly editProfileLink = this.page
    .locator('a')
    .getByText('Edit profile');

  async clickEditProfileLink(): Promise<void> {
    await test.step('Click "Edit profile" link', async () => {
      await this.editProfileLink.click();
    });
  }
}
