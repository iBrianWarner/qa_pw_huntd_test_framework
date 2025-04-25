import { BaseComponent } from '@/web/components/BaseComponent';
import { Locator } from '@playwright/test';

export class CommonInputs extends BaseComponent {
  public getFieldById = (fieldId: string): Locator =>
    this.page.locator(`input#${fieldId}`);
}
