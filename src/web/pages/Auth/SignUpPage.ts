import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { UiElementsHelper } from '@/web/components/Helpers/UiElementsHelpers';

export class SignUpPage extends BasePage {
  public readonly url = ROUTES.signUp;

  public readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly emailField = this.elementsHelper.getFieldById('email');

  private readonly passwordField = this.elementsHelper.getFieldById('password');

  private readonly repeatPasswordField =
    this.elementsHelper.getFieldById('repeatPassword');

  private readonly createAccountButton =
    this.elementsHelper.getButtonByName('Create account');

  async fillEmail(email: string): Promise<void> {
    await test.step('Fill email field', async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPassword(password: string): Promise<void> {
    await test.step('Fill password field', async () => {
      await this.passwordField.fill(password);
    });
  }

  async fillRepeatPassword(password: string): Promise<void> {
    await test.step('Fill repeat password field', async () => {
      await this.repeatPasswordField.fill(password);
    });
  }

  async clickCreateAccountButton(): Promise<void> {
    await test.step('Click create account button', async () => {
      await this.createAccountButton.click();
    });
  }

  async assertCreateAccountButtonIsEnabled(): Promise<void> {
    await test.step('Assert create account button is enabled', async () => {
      await expect(this.createAccountButton).toBeEnabled();
    });
  }
}
