import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';
import { ProfileWorkplaceForm } from '@/web/components/Forms/ProfileWorkPlaceForm';
import { ProfileExperienceCard } from '@/web/components/Candidate/ProfileExperienceCard';
import { FormControlsComponent } from '@/web/components/Helpers/FormControlsComponents';

export class CandidateExperiencePage extends LoggedInBasePage {
  public readonly url = ROUTES.profile.experience;

  public readonly workplaceForm = new ProfileWorkplaceForm(this.page);

  public readonly experienceCard = new ProfileExperienceCard(this.page);

  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly formControlsComponent = new FormControlsComponent(this.page);

  private readonly addManuallyButton =
    this.elementsHelper.getButtonByName('Add manually');

  private readonly uploadFromLinkedInButton =
    this.elementsHelper.getButtonByName('Upload from LinkedIn');

  private readonly addExperienceButton =
    this.elementsHelper.getButtonByName('Add');

  private readonly reloadButton = this.elementsHelper.getButtonByName('reload');

  private readonly fetchButton = this.elementsHelper.getButtonByName('fetch');

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

  async assertAddExperienceButtonIsEnabled(): Promise<void> {
    await test.step('Assert "Add" button is enabled', async () => {
      await expect(this.addExperienceButton).toBeEnabled();
    });
  }

  async assertReloadButtonIsEnabled(): Promise<void> {
    await test.step('Assert "Reload" button is enabled', async () => {
      await expect(this.reloadButton).toBeEnabled();
    });
  }

  async assertFetchButtonIsEnabled(): Promise<void> {
    await test.step('Assert "Fetch" button is enabled', async () => {
      await expect(this.fetchButton).toBeEnabled();
    });
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.formControlsComponent.clickSaveAndContinueButton();
  }
}
