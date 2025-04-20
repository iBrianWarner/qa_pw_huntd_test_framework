import { SignUpPage } from '@/web/pages/Auth/SignUpPage';
import { test } from '@playwright/test';

test.describe('Sign Up', () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async () => {
    signUpPage = new SignUpPage();
  });

  test('should provide ability to sign up', async ({}) => {
    await signUpPage.visit();
  });
});
