import { ROUTES } from '@/web/constants';
import { test, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class SignUpPage extends BasePage {
  url = ROUTES.signUp;

  private readonly emailField = this.page.locator('input[name="email"]');

  private readonly passwordField = this.page.locator('input[name="password"]');

  private readonly repeatPasswordField = this.page.locator(
    'input[name="repeatPassword"]',
  );

  private readonly createAccountButton = this.page.locator(
    'button[type="submit"]',
  );

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
