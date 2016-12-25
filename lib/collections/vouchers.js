var Schemas = {};

Schemas.Voucher = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function () {
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
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  userId: {
    type: String,
    label: "User ID"
  },
  designId: {
    type: String,
    label: "Design ID"
  },
  company: {
    type: String,
    label: "Company ID",
    optional: true
  },
  amount: {
    type: String,
    label: "Amount",
    //decimal: true,
    optional: true
  },
  sender: {
    type: String,
    label: "Schenker(in)",
    max: 20,
    optional: true
  },
  recipient: {
    type: String,
    label: "Beschenkte(r)",
    max: 20,
    optional: true
  },
  image: {
    type: FS.File,
    label: "Image",
    optional: true
  },
  imagePositionX: {
    type: Number,
    label: "Image Position X",
    optional: false,
    defaultValue: 0
  },
  imagePositionY: {
    type: Number,
    label: "Image Position Y",
    optional: false,
    defaultValue: 0
  },
  imageScale: {
    type: Number,
    decimal: true,
    label: "Image Scale (in %)",
    optional: false,
    defaultValue: 100
  },
  description: {
    type: String,
    label: "Description",
    optional: true,
    max: 1024
  },
  color: {
    type: String,
    label: "Color",
    optional: true,
    max: 24
  },
  companyId: {
    type: String,
    label: "Company Id",
    optional: true
  }
});

Vouchers = new Mongo.Collection("vouchers");
Vouchers.attachSchema(Schemas.Voucher);