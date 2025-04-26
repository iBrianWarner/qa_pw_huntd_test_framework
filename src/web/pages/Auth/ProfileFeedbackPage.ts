import { ROUTES } from '@/web/constants';
import { test, Page } from '@playwright/test';
import { LoggedInBasePage } from '@pages/LoggedInBasePage';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';
import { UserRole } from '@/common/typedefs/userRoles.typedefs';
import { PreviewProfileModal } from '@/web/components/Candidate/PreviewProfileModal';

export class ProfileFeedbackPage extends LoggedInBasePage {
  constructor(page: Page, userRole: UserRole) {
    super(page);

    this.url = ROUTES.profile.feedback(userRole);
  }

  public readonly previewProfileModal = new PreviewProfileModal(this.page);

  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly feedbackField =
    this.elementsHelper.getTextareaById('description');

  private readonly sendButton = this.elementsHelper.getButtonByName('Send');

  async fillFeedbackField(feedback: string): Promise<void> {
    await test.step('Fill feedback field', async () => {
      await this.feedbackField.fill(feedback);
    });
  }

  async clickSendButton(): Promise<void> {
    await test.step('Click "Send" button', async () => {
      await this.sendButton.click();
    });
  }
}
