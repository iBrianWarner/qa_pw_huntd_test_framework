import { UserRole } from '@/common/typedefs/userRoles.typedefs';

export const ROUTES = {
  signUp: '/sign-up',
  chooseProfile: '/choose-profile',
  home: '/',
  profile: {
    candidate: '/profile/candidate',
    candidateJobExpectations: '/profile/candidate/job-expectations',
    recruiter: '/profile/recruiter',
    experience: '/profile/candidate/experience',
    bio: '/profile/candidate/bio',
    contacts: (userRole: UserRole): string =>
      `/profile/contacts?preview=${userRole}`,
    feedback: (userRole: UserRole): string =>
      `/profile/feedback?preview=${userRole}`,
  },
  profilePreview: {
    candidate: '/profile-preview/candidate',
    recruiter: '/profile-preview/recruiter',
  },
};
