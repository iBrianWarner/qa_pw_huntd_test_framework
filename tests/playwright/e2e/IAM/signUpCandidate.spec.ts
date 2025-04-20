import {
  generateEmail,
  generatePassword,
} from '@/common/helpers/testDataGenerators.helpers';
import { SignUpPage } from '@/web/pages/Auth/SignUpPage';
import { ChooseProfilePage } from '@/web/pages/Auth/ChooseProfilePage';
import { test } from '@playwright/test';

test.describe('Sign Up', () => {
  let signUpPage: SignUpPage;
  let chooseProfilePage: ChooseProfilePage;

  const email = generateEmail();
  const password = generatePassword();

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    chooseProfilePage = new ChooseProfilePage(page);
  });

  test('should provide ability to sign up', async ({}) => {
    await signUpPage.visit();

    await signUpPage.fillEmail(email);
    await signUpPage.fillPassword(password);
    await signUpPage.fillRepeatPassword(password);
    await signUpPage.clickCreateAccountButton();

    await chooseProfilePage.assertOpened();
  });
});
