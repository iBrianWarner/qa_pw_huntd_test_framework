import {
  generateEmail,
  generateParagraph,
  generatePassword,
  generatePhrase,
} from '@/common/helpers/testDataGenerators.helpers';
import { SignUpPage } from '@/web/pages/Auth/SignUpPage';
import { ChooseProfilePage } from '@/web/pages/Auth/ChooseProfilePage';
import { test } from '@playwright/test';
import { CandidateRoleProfilePage } from '@/web/pages/Auth/CandidateRoleProfilePage';
import {
  DESIRED_POSITION,
  TECHNOLOGIES,
} from '@/common/constants/candidateInfo.constants';
import { CandidateJobExpectationsProfilePage } from '@/web/pages/Auth/CandidateJobExpectationsPage';
import { EnglishLevel } from '@/common/typedefs/englishLevel.typedefs';
import { Cities } from '@/common/typedefs/cities.typedefs';
import { JobExperience } from '@/common/typedefs/jobExperience.typedefs';
import { generateSalaryRange } from '@/common/helpers/generateSalary.helpers';
import { CandidateExperiencePage } from '@/web/pages/Auth/CandidateExperiencePage';
import { ProfileWorkplaceForm } from '@/web/components/Forms/ProfileWorkPlaceForm';
import { Months } from '@/common/typedefs/months.typedefs';

test.describe('Sign Up page', () => {
  let signUpPage: SignUpPage;
  let chooseProfilePage: ChooseProfilePage;
  let candidateProfilePage: CandidateRoleProfilePage;
  let candidateJobExpectationsPage: CandidateJobExpectationsProfilePage;
  let candidateExperiencePage: CandidateExperiencePage;
  let workplaceForm: ProfileWorkplaceForm;

  const email = generateEmail();
  const password = generatePassword();
  const salary = generateSalaryRange();
  const { js, react, node, express, angular, vue } = TECHNOLOGIES;
  const companyName = generatePhrase(2);
  const achievements = generateParagraph(3);

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    chooseProfilePage = new ChooseProfilePage(page);
    candidateProfilePage = new CandidateRoleProfilePage(page);
    candidateJobExpectationsPage = new CandidateJobExpectationsProfilePage(
      page,
    );
    candidateExperiencePage = new CandidateExperiencePage(page);
    ({ workplaceForm } = candidateExperiencePage);
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
    await candidateProfilePage.selectDesiredRoleFromDropdown(DESIRED_POSITION);
    await candidateProfilePage.clickTechnologiesFieldLabel();
    await candidateProfilePage.addTechnologies({
      inputValue: js,
      technologies: [react, node, express, angular, vue],
    });
    await candidateProfilePage.clickSaveAndContinueButton();

    await candidateJobExpectationsPage.assertOpened();
    await candidateJobExpectationsPage.assertAnnualButtonIsActive();
    await candidateJobExpectationsPage.fillDesiredSalaryField(salary);
    await candidateJobExpectationsPage.selectJobExperienceFromDropdown(
      JobExperience.UpTo3Years,
    );
    await candidateJobExpectationsPage.selectEnglishLevelFromDropdown(
      EnglishLevel.UpperIntermediate,
    );
    await candidateJobExpectationsPage.selectCity(Cities.Kyiv);
    await candidateJobExpectationsPage.assertIsRemoteCheckboxIsChecked();
    await candidateJobExpectationsPage.clickSaveAndContinueButton();

    await candidateExperiencePage.assertOpened();
    await candidateExperiencePage.assertUploadFromLinkedInButtonIsEnabled();
    await candidateExperiencePage.clickAddManuallyButton();
    await workplaceForm.fillRoleField(DESIRED_POSITION);
    await workplaceForm.fillCompanyNameField(companyName);
    await workplaceForm.selectStartDateMonthFromDropdown(Months.January);
    await workplaceForm.fillStartDateYearField(2020);
    await workplaceForm.assertImWorkingHereButtonIsActive();
    await workplaceForm.fillAchievementsField(achievements);
    await workplaceForm.clickSaveButton();
  });
});
