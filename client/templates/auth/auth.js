Meteor.startup(function () {
  AccountsEntry.config({
    privacyUrl: '/privacy-policy',             // if set adds link to privacy policy and 'you agree to ...' on sign-up page
    termsUrl: '/terms-of-use',                 // if set adds link to terms  'you agree to ...' on sign-up page
    homeRoute: '/',                            // mandatory - path to redirect to after sign-out
    dashboardRoute: '/companies',              // mandatory - path to redirect to after successful sign-in
    profileRoute: 'profile',                   // if set adds link to User Profile
    passwordSignupFields: 'EMAIL_ONLY',        // One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
    //showSignupCode: true,                      // when true you need to set the 'signupCode' setting in the server (see below)
    showOtherLoginServices: true,              // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
    passwordminLength: 8,                      // Password minimun lenght
    requireOneAlpha: true,                     // enforce the use of at least 1 char [a-z] while building the password
    requireOneDigit: true,                     // enforce the use of at least 1 digit while building the password
    requirePasswordConfirmation: true,         // enforce user to confirm password on signUp and resetPassword templates
    waitEmailVerification: false                // Set to true to wait until newly created user's email has been verified.
  });
});