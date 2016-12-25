Meteor.publish('posts', function () {
  return Posts.find();
});

Meteor.publish('companies', function () {
  return Companies.find();
});

Meteor.publish('designs', function () {
  return Designs.find();
});

Meteor.publish('vouchers', function () {
  return Vouchers.find({
  	userId: this.userId
  });
});

Meteor.publish('images', function () {
  return Images.find();
});

Meteor.publish

//
//Meteor.publish('userData', function () {
//  return Meteor.users.find({}, {fields: {billingAddress: 1}});
//});

Meteor.publish('userData', function() {
  return Meteor.users.find({_id: this.userId}, {fields: {billingAddress: 1}});
});

// Give authorized users access to sensitive data by group
Meteor.publish('secrets', function (group) {
  if (Roles.userIsInRole(this.userId, ['view-secrets','admin'], group)) {

    return Meteor.secrets.find({group: group});

  } else {

    // user not authorized. do not publish secrets
    this.stop();
    return;

  }
});
