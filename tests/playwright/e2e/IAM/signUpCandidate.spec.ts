import {
  generateEmail,
  generateNumber,
  generatePassword,
} from '@/common/helpers/testDataGenerators.helpers';
import { SignUpPage } from '@/web/pages/Auth/SignUpPage';
import { ChooseProfilePage } from '@/web/pages/Auth/ChooseProfilePage';
import { test } from '@playwright/test';
import { CandidateRoleProfilePage } from '@/web/pages/Auth/CandidateRoleProfilePage';
import {
  DESIRED_POSITION,
  MIN_ANNUAL_SALARY_USD,
  TECHNOLOGIES,
} from '@/common/constants/candidateInfo.constants';
import { CandidateJobExpectationsProfilePage } from '@/web/pages/Auth/CandidateJobExpectationsPage';
import { EnglishLevel } from '@/common/typedefs/englishLevel.typedefs';
import { Cities } from '@/common/typedefs/cities.typedefs';
import { JobExperience } from '@/common/typedefs/jobExperience.typedefs';

test.describe('Sign Up page', () => {
  let signUpPage: SignUpPage;
  let chooseProfilePage: ChooseProfilePage;
  let candidateProfilePage: CandidateRoleProfilePage;
  let candidateJobExpectationsPage: CandidateJobExpectationsProfilePage;

  const email = generateEmail();
  const password = generatePassword();
  const salary = generateNumber({
    min: MIN_ANNUAL_SALARY_USD,
    max: MIN_ANNUAL_SALARY_USD * 2,
  });
  const { js, react, node, express, angular, vue } = TECHNOLOGIES;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    chooseProfilePage = new ChooseProfilePage(page);
    candidateProfilePage = new CandidateRoleProfilePage(page);
    candidateJobExpectationsPage = new CandidateJobExpectationsProfilePage(
      page,
    );
  });

  test('should provide ability to sign up and create a candidate profile', async ({}) => {
    await signUpPage.visit();

    await signUpPage.fillEmail(email);
    await signUpPage.fillPassword(password);
    await signUpPage.fillRepeatPassword(password);
    await signUpPage.clickCreateAccountButton();

    await chooseProfilePage.assertOpened();
    await chooseProfilePage.clickCandidateOptionTile();

    await candidateProfilePage.assertOpened();
    await candidateProfilePage.fillDesiredPositionField(DESIRED_POSITION);

    await candidateProfilePage.clickDesiredRolePlusButton();
    await candidateProfilePage.waitForRoleIsVisible(DESIRED_POSITION);
    await candidateProfilePage.selectDesiredRole(DESIRED_POSITION);
    await candidateProfilePage.clickDesiredRoleMinusButton();

    await candidateProfilePage.clickTechnologiesFieldLabel();
    await candidateProfilePage.addTechnologies({
      inputValue: js,
      technologies: [react, node, express, angular, vue],
    });
    await candidateProfilePage.clickSaveAndContinueButton();

    await candidateJobExpectationsPage.assertOpened();
    await candidateJobExpectationsPage.assertAnnualButtonIsActive();
    await candidateJobExpectationsPage.fillDesiredSalaryField(salary);
    await candidateJobExpectationsPage.clickJobExperiencePlusButton();
    await candidateJobExpectationsPage.selectJobExperience(
      JobExperience.UpTo3Years,
    );
    await candidateJobExpectationsPage.clickEnglishPlusButton();
    await candidateJobExpectationsPage.selectEnglishLevel(
      EnglishLevel.UpperIntermediate,
    );
    await candidateJobExpectationsPage.selectCity(Cities.Kyiv);
    await candidateJobExpectationsPage.assertIsRemoteCheckboxIsChecked();
    await candidateJobExpectationsPage.clickSaveAndContinueButton();
  });
});
