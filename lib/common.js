Bonbeo = {
  getVoucherId: function () {
    var voucher = Bonbeo.getVoucher();
    return voucher._id;
  },
  getVoucher: function () {
    var userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error("You have to be logged to create a new voucher!");
    }
    var voucherId = Session.get("voucherId$");
    var voucher;
    if (voucherId && (voucher = Vouchers.findOne(voucherId))) {
      return voucher;
    }
    var designId = Designs.findOne()._id;
    voucherId = Vouchers.insert({
      userId: userId,
      designId: designId
    });
    Session.setPersistent("voucherId$", voucherId);
    voucher = Vouchers.findOne({_id: voucherId, userId: userId});
    return voucher;
  },
  getCompanyName: function () {
    return Companies.findOne({_id: this.getVoucher().company}).companyName;
  },
  getValueOfVoucher: function () {
    console.log('VALUE', this.getVoucher().amount);
    return this.getVoucher().amount;
  }
}

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});