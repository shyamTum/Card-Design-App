Template.companyItem.rendered = function () {
  $(".thumbnail")
      .mouseenter(function () {
        $(this).find('.caption').removeClass("fadeOutUp").addClass("fadeInDown").show();
      })
      .mouseleave(function () {
        $(this).find('.caption').removeClass("fadeInDown").addClass("fadeOutUp");
      });
}

Template.companyItem.events({
  'click .company-item': function () {
    console.log('Company', this);
    var companyName = Companies.findOne(this._id).companyName;
    Vouchers.update({ _id: Bonbeo.getVoucherId() }, { $set: { company: companyName }});
    Vouchers.update({ _id: Bonbeo.getVoucherId() }, { $set: { company: this._id }});
    Router.go('value');
  }
});

