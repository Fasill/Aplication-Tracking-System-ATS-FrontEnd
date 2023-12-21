import React from 'react';

export const LazyNotFound = React.lazy(() => import('./notFound/notFound.js'));
export const LazyAdminDashboard = React.lazy(() => import('./home/Home.js'));
export const LazySignupAsSupplier = React.lazy(() => import('./LoginAndSignUp/SignupAsSupplier.js'));
export const LazyOtpVerifier = React.lazy(() => import('./LoginAndSignUp/otpVerifier.js'));
export const LazyFront = React.lazy(() => import('./frontpage/frontpage.js'));
export const LazyProfile = React.lazy(() => import('./profile/profile.js'));
export const LazyJobs = React.lazy(() => import('./job/JobForm.js'));
export const LazyHomeLayout = React.lazy(() => import('./layout/HomeLayout.js'));

export const LazyJobDetail = React.lazy(() => import('./job/JobDetail.js'));
export const LazyAddJobs = React.lazy(() => import('./job/AddJobs.js'));
export const LazyEditJobs = React.lazy(() => import('./job/EditJobs.js'));
export const LazyMembers = React.lazy(() => import('./members/Members.js'));
export const LazyDashboard = React.lazy(() => import('./frontpage/Dashboard.js'));
export const LazyCandidateProfile = React.lazy(() => import('./profile/candidateProfile.js'));
export const LazyCandidateProfileClient = React.lazy(() => import('./profile/candidateProfileClient.js'));
export const LazyCandidates = React.lazy(() => import('./Candidates/Candidates.js'));
export const LazyYourComponent = React.lazy(() => import('./notFound/fastgateway.js'));
export const LazyVerificationPage = React.lazy(() => import('./verificationPage/verificationPage.js'));
export const LazyVerifySupplier = React.lazy(() => import('./verificationPage/VerifySupplier.js'));
export const LazyCandidatesForClient = React.lazy(() => import('./Candidates/CandidatesForClient.js'));
export const LazyVerifyClient = React.lazy(() => import('./verificationPage/VerifyClient.js'));
export const LazyCandidateLayout = React.lazy(() => import('./layout/CandidateLayout.js'));
export const LazyTest = React.lazy(() => import('./LoginAndSignUp/Login.jsx'));
export const LazyTestLogin = React.lazy(() => import('./layout/AuthLayout.jsx'));

