Template.userProfile.helpers({
  billingAddress: function () {
    return Meteor.user().billingAddress;
  },

  firstName: function() {
    console.log('METEOR USER', Meteor.user());
    return Meteor.user().emails[0].address;
  },

  getVouchers: function () {
    return Vouchers.find( {companyId: Meteor.user().companyId} );
  }
});

//
//Template.userProfile.helpers({
// getAllVouchersOfCompany: function () {
//
//
//   if (user.companyId == Vouchers.companyId) {
//     Vouchers.findAll()
//   }
// }
//
//
//
//  var userId = Meteor.userId();
//if (!userId) {
//  throw new Meteor.Error("You have to be logged to create a new voucher!");
//}
//
//});