Router.route('/download/:voucherId', function () {
  var self = this;
  var pdf = Meteor.npmRequire('html-pdf');
  var voucher = Vouchers.findOne(this.params.voucherId);
  if (!voucher) {
    throw new Meteor.Error("Voucher with ID " + this.params.voucherId + " could not be found.");
  }
  var design = Designs.findOne(voucher.designId);
  if (!design) {
    throw new Meteor.Error("Design with ID " + voucher.designId + " could not be found.");
  }
  var templateName = 'design_' + design._id;
  SSR.compileTemplate(templateName, design.template);
  var html = SSR.render(templateName, {
    rootURL: Meteor.absoluteUrl(),
    voucher: voucher,
    imageURL: voucher.image.url()
  });
  var options = {format: 'Letter'};
  var filename = 'voucher_' + voucher._id + '.pdf';
  pdf.create(html, options).toBuffer(function (err, buffer) {
    if (err) {
      return console.log(err);
    }
    self.response.writeHead(200, {
      'Content-type': 'application/pdf',
      'Content-Disposition': "attachment; filename=" + filename
    });
    self.response.end(buffer);
  });
}, {where: 'server'});