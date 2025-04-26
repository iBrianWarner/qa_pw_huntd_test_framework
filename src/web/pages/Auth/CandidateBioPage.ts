import { ROUTES } from '@/web/constants';
import { test } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';
import { FormControlsComponent } from '@/web/components/Helpers/FormControlsComponents';

export class CandidateBioPage extends LoggedInBasePage {
  public readonly url = ROUTES.profile.bio;

  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly formControlsComponent = new FormControlsComponent(this.page);

  private readonly achievementsField =
    this.elementsHelper.getTextareaById('achievements');

  private readonly workExpectationsField =
    this.elementsHelper.getTextareaById('workExpectations');

  async fillAchievementsField(achievements: string): Promise<void> {
    await test.step('Fill achievements field', async () => {
      await this.achievementsField.fill(achievements);
    });
  }

  async fillWorkExpectationsField(workExpectations: string): Promise<void> {
    await test.step('Fill work expectations field', async () => {
      await this.workExpectationsField.fill(workExpectations);
    });
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.formControlsComponent.clickSaveAndContinueButton();
  }
}
