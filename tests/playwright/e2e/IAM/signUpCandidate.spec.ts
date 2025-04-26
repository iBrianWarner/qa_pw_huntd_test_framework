import {
  generateEmail,
  generateFirstName,
  generateLastName,
  generateParagraph,
  generatePassword,
} from '@/common/helpers/testDataGenerators.helpers';
import { SignUpPage } from '@/web/pages/Auth/SignUpPage';
import { ChooseProfilePage } from '@/web/pages/Auth/ChooseProfilePage';
import { test } from '@playwright/test';
import { CandidateRoleProfilePage } from '@/web/pages/Auth/CandidateRoleProfilePage';
import {
  CANDIDATE_SCREENSHOT_NAMES,
  COMPANY_NAME,
  DESIRED_POSITION,
  TECHNOLOGIES,
  WORK_ACHIEVEMENTS,
} from '@/common/constants/candidateInfo.constants';
import { CandidateJobExpectationsProfilePage } from '@/web/pages/Auth/CandidateJobExpectationsPage';
import { EnglishLevel } from '@/common/typedefs/englishLevel.typedefs';
import { Cities } from '@/common/typedefs/cities.typedefs';
import { JobExperience } from '@/common/typedefs/jobExperience.typedefs';
import { generateSalaryRange } from '@/common/helpers/generateSalary.helpers';
import { CandidateExperiencePage } from '@/web/pages/Auth/CandidateExperiencePage';
import { ProfileWorkplaceForm } from '@/web/components/Forms/ProfileWorkPlaceForm';
import { Months } from '@/common/typedefs/months.typedefs';
import { ProfileExperienceCard } from '@/web/components/Candidate/ProfileExperienceCard';
import { CandidateBioPage } from '@/web/pages/Auth/CandidateBioPage';
import { ProfileContactsPage } from '@/web/pages/Auth/ProfileContactsPage';
import { UserRole } from '@/common/typedefs/userRoles.typedefs';
import { ProfileFeedbackPage } from '@/web/pages/Auth/ProfileFeedbackPage';
import { CandidateProfilePreviewPage } from '@/web/pages/Profile_Preview/CandidateProfilePreviewPage';

test.describe('Sign Up page', () => {
  let signUpPage: SignUpPage;
  let chooseProfilePage: ChooseProfilePage;
  let candidateProfilePage: CandidateRoleProfilePage;
  let candidateJobExpectationsPage: CandidateJobExpectationsProfilePage;
  let candidateExperiencePage: CandidateExperiencePage;
  let workplaceForm: ProfileWorkplaceForm;
  let experienceCard: ProfileExperienceCard;
  let candidateBioPage: CandidateBioPage;
  let profileContactsPage: ProfileContactsPage;
  let profileFeedbackPage: ProfileFeedbackPage;
  let candidateProfilePreviewPage: CandidateProfilePreviewPage;

  const email = generateEmail();
  const password = generatePassword();
  const salary = generateSalaryRange();
  const { js, react, node, express, angular, vue } = TECHNOLOGIES;
  const achievements = generateParagraph(3);
  const workExpectations = generateParagraph(3);
  const firstName = generateFirstName();
  const lastName = generateLastName();

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    chooseProfilePage = new ChooseProfilePage(page);
    candidateProfilePage = new CandidateRoleProfilePage(page);
    candidateJobExpectationsPage = new CandidateJobExpectationsProfilePage(
      page,
    );
    candidateExperiencePage = new CandidateExperiencePage(page);
    ({ workplaceForm, experienceCard } = candidateExperiencePage);
    candidateBioPage = new CandidateBioPage(page);
    profileContactsPage = new ProfileContactsPage(page, UserRole.Candidate);
    profileFeedbackPage = new ProfileFeedbackPage(page, UserRole.Candidate);
    candidateProfilePreviewPage = new CandidateProfilePreviewPage(page);
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
    await candidateJobExpectationsPage.typeDesiredSalaryField(salary);
    await candidateJobExpectationsPage.selectJobExperienceFromDropdown(
      JobExperience.UpTo3Years,
    );
    await candidateJobExpectationsPage.selectEnglishLevelFromDropdown(
      EnglishLevel.UpperIntermediate,
    );
    await candidateJobExpectationsPage.selectCity(Cities.Kyiv);
    await candidateJobExpectationsPage.waitForCityFieldHasValue(Cities.Kyiv);
    await candidateJobExpectationsPage.assertIsRemoteCheckboxIsChecked();
    await candidateJobExpectationsPage.clickSaveAndContinueButton();

    await candidateExperiencePage.assertOpened();
    await candidateExperiencePage.assertUploadFromLinkedInButtonIsEnabled();
    await candidateExperiencePage.clickAddManuallyButton();
    await workplaceForm.fillRoleField(DESIRED_POSITION);
    await workplaceForm.fillCompanyNameField(COMPANY_NAME);
    await workplaceForm.selectStartDateMonthFromDropdown(Months.January);
    await workplaceForm.fillStartDateYearField(2020);
    await workplaceForm.assertImWorkingHereButtonIsActive();
    await workplaceForm.fillAchievementsField(WORK_ACHIEVEMENTS);
    await workplaceForm.clickSaveButton();

    await experienceCard.assertVisible(DESIRED_POSITION);
    await experienceCard.assertProfessionCardScreenshot({
      profession: DESIRED_POSITION,
      fileName: CANDIDATE_SCREENSHOT_NAMES.professionExperienceCard,
    });
    await candidateExperiencePage.assertAddExperienceButtonIsEnabled();
    await candidateExperiencePage.assertReloadButtonIsEnabled();
    await candidateExperiencePage.assertFetchButtonIsEnabled();
    await candidateExperiencePage.clickSaveAndContinueButton();

    await candidateBioPage.assertOpened();
    await candidateBioPage.fillAchievementsField(achievements);
    await candidateBioPage.fillWorkExpectationsField(workExpectations);
    await candidateBioPage.clickSaveAndContinueButton();

    await profileContactsPage.assertOpened();
    await profileContactsPage.fillFirstNameField(firstName);
    await profileContactsPage.fillLastNameField(lastName);
    await profileContactsPage.clickPreviewProfileButton();
    await profileContactsPage.previewProfileModal.assertOpened();
    await profileContactsPage.previewProfileModal.clickCloseButton();
    await profileContactsPage.clickActivateProfileButton();

    await profileFeedbackPage.assertOpened();
    await profileFeedbackPage.fillFeedbackField(achievements);
    await profileFeedbackPage.clickSendButton();

    await candidateProfilePreviewPage.assertOpened();
  });
});
