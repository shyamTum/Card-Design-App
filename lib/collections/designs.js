var Schemas = {};

Schemas.Design = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  template: {
    type: String,
    label: "Template"
  }
});

Designs = new Mongo.Collection("designs");
Designs.attachSchema(Schemas.Design);

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Insert sample data if the design collection is empty
    if (Designs.find().count() === 0) {
      Designs.insert({
        template: Assets.getText("designs/default.html")
      });
    }
  });
}