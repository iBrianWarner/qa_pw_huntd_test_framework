import { ROUTES } from '@/web/constants';
import { test, Page } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';
import { FormControlsComponent } from '@/web/components/Helpers/FormControlsComponents';
import { UserRole } from '@/common/typedefs/userRoles.typedefs';
import { PreviewProfileModal } from '@/web/components/Candidate/PreviewProfileModal';

export class ProfileContactsPage extends LoggedInBasePage {
  constructor(page: Page, userRole: UserRole) {
    super(page);

    this.url = ROUTES.profile.contacts(userRole);
  }

  public readonly previewProfileModal = new PreviewProfileModal(this.page);

  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly formControlsComponent = new FormControlsComponent(this.page);

  private readonly previewProfileButton =
    this.elementsHelper.getButtonByName('Preview profile');

  private readonly activateProfileButton =
    this.elementsHelper.getButtonByName('Activate profile');

  async fillFirstNameField(firstName: string): Promise<void> {
    await this.formControlsComponent.fillFirstNameField(firstName);
  }

  async fillLastNameField(lastName: string): Promise<void> {
    await this.formControlsComponent.fillLastNameField(lastName);
  }

  async clickPreviewProfileButton(): Promise<void> {
    await test.step('Click "Preview profile" button', async () => {
      await this.previewProfileButton.click();
    });
  }

  async clickActivateProfileButton(): Promise<void> {
    await test.step('Click "Activate profile" button', async () => {
      await this.activateProfileButton.click();
    });
  }
}
