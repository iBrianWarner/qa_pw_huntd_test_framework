import { test, expect } from '@playwright/test';
import { BaseModal } from '@/web/components/BaseModal';

export class PreviewProfileModal extends BaseModal {
  private readonly modal = this.page.locator(
    '[class*="ProfileContactsForm_previewModal"]',
  );

  private readonly closeButton = this.page.getByRole('button').filter({
    has: this.page.locator('.icon-close'),
  });

  async assertOpened(): Promise<void> {
    await test.step('Assert preview profile modal is opened', async () => {
      await expect(this.modal).toBeVisible();
    });
  }

  async clickCloseButton(): Promise<void> {
    await test.step('Click "Close" button', async () => {
      await this.closeButton.click();
    });
  }
}
