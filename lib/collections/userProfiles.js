Schema = {};

Schema.BillingAddress = new SimpleSchema({
  salutation:{
    type: String,
    optional: true
  },
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/,
    optional: true
  },
  organization: {
    type: String,
    optional: true
  },
  street: {
    type: String,
    optional: true
  },
  streetAddition: {
    type: String,
    optional: true
  },
  zip: {
    type: Number,
    min: 5,
    optional: true
  },
  town: {
    type: String,
    optional: true
  },
  state: {
    type: String,
    optional: true
  },
  country: {
    type: String,
    optional: true
  }
});

Schema.User = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  createdAt: {
    type: Date
  },
  billingAddress: {
    type: Schema.BillingAddress
  },
  services: {
    type: Object,
    optional: true,
    blackbox: false
  }
});

//Meteor.users.attachSchema(Schema.User);

Meteor.users.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});