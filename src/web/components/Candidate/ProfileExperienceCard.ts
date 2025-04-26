import { test, expect, Locator } from '@playwright/test';
import { BaseComponent } from '@/web/components/BaseComponent';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';

export class ProfileExperienceCard extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly profileExperienceCard = this.page.locator(
    '[class^="ProfileWorkPlaces_workPlaceContainer"]',
  );

  private getProfileExperienceCardByProfession(profession: string): Locator {
    return this.profileExperienceCard.filter({ hasText: profession });
  }

  private getEditButtonForProfessionCard(profession: string): Locator {
    return this.getProfileExperienceCardByProfession(profession).locator(
      '.icon-edit',
    );
  }

  private getDeleteButtonForProfessionCard(profession: string): Locator {
    return this.getProfileExperienceCardByProfession(profession).locator(
      '.icon-trash',
    );
  }

  async assertVisible(profession: string): Promise<void> {
    await test.step('Assert profile experience card is visible', async () => {
      await expect(
        this.getProfileExperienceCardByProfession(profession),
      ).toBeVisible();
    });
  }

  async assertProfessionCardScreenshot(options: {
    profession: string;
    fileName: string;
  }): Promise<void> {
    await test.step('Assert content screenshot', async () => {
      const { profession, fileName } = options;
      const message = this.getProfileExperienceCardByProfession(profession);

      await this.assertLocatorHasScreenshot(message, fileName);
    });
  }

  async clickEditButton(profession: string): Promise<void> {
    await test.step('Click edit button', async () => {
      await this.getEditButtonForProfessionCard(profession).click();
    });
  }

  async clickDeleteButton(profession: string): Promise<void> {
    await test.step('Click delete button', async () => {
      await this.getDeleteButtonForProfessionCard(profession).click();
    });
  }
}
