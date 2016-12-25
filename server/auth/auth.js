Meteor.startup(function () {
  AccountsEntry.config({
    //showSignupCode: true,           // place it also on server for extra security
    waitEmailVerification: false,    // will not allow users to login until their email is verified.
    wrapLinks: true,                // wraps accounts-entry links in <li> for bootstrap compatability purposes
    homeRoute: '/',                 // MUST BE SET - redirect to this path after sign-out
    dashboardRoute: '/companies'    // MUST BE SET - redirect to this path after sign-in
  });
});