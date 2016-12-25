if (Meteor.isServer) {
  Accounts.onCreateUser(function (options, user) {
    user.profile = options.profile,
    user.billingAddress = {};
    user.companyId = "";
    user.billingAddress.firstName = null;
    user.billingAddress.lastName = null;
    user.billingAddress.salutation = null;
    user.billingAddress.organization = null;
    user.billingAddress.address = null;
    user.billingAddress.street = null;
    user.billingAddress.streetAddition = null;
    user.billingAddress.zip = null;
    user.billingAddress.town = null;
    user.billingAddress.state = null;
    user.billingAddress.country = null;



    return user;
  });
}
