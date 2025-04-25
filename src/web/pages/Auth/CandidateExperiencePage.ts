import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';
import { ProfileWorkplaceForm } from '@/web/components/Forms/ProfileWorkPlaceForm';

export class CandidateExperiencePage extends LoggedInBasePage {
  public readonly url = ROUTES.profile.experience;

  public readonly workplaceForm = new ProfileWorkplaceForm(this.page);

  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly addManuallyButton =
    this.elementsHelper.getButtonByName('Add manually');

  private readonly uploadFromLinkedInButton =
    this.elementsHelper.getButtonByName('Upload from LinkedIn');

  async clickAddManuallyButton(): Promise<void> {
    await test.step('Click "Add manually" button', async () => {
      await this.addManuallyButton.click();
    });
  }

  async assertUploadFromLinkedInButtonIsEnabled(): Promise<void> {
    await test.step('Assert "Upload from LinkedIn" button is enabled', async () => {
      await expect(this.uploadFromLinkedInButton).toBeEnabled();
    });
  }
}
