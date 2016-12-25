import { Email } from 'meteor/email';


Meteor.methods({
	'pdfGen/generate':function(html){
		if(Meteor.isServer){

			// code with html5-to-pdf
	      	//doesn't work
	      	/*var html5pdf = Meteor.npmRequire("html5-to-pdf");
	      	var outputPath = "H:\\doc.pdf"
	      	html5pdf().from.string(html).to(outputPath, function(){
	      		console.log("Created", outputPath);
	      	});*/

	      	//code with html-pdf
	      	//works but does not support rotation
	      	/*var pdf = Meteor.npmRequire("html-pdf");
	      	var opt = {format:'A4'};
	      	pdf.create(html, options).toFile('H:\\test.pdf',function(err, res){
	      		if(err) return console.log("2nd ==>> " + err);
	      		console.log(res);
	      	});*/

	      	//----- Old code from here, most of it is commented out ------------//

			var webshot = Meteor.npmRequire('webshot');
		  	var fs      = Npm.require('fs');
		  	var Future = Npm.require('fibers/future');

		 	var fut = new Future();

		  	var fileName = "coupon.pdf";

		  	var options = {
	          "paperSize": {

	              format: "A4",
	              orientation: "landscape",
	              margin: "1cm",
	          },
	          siteType: 'html',
	          renderDelay: 500
	      	};

	      	webshot(html, fileName, options, function(err) {
	        	fs.readFile(fileName, function (err, data) {
	            	if (err) {
	                	return console.log(err);
	            	}

	              	fs.unlinkSync(fileName);
	              	fut.return(data);

	          	});
	      	});
	      
	      	let pdfData = fut.wait();
	      	let base64String = new Buffer(pdfData).toString('base64');

	      	return base64String;
		}
	},
	'pdfGen/sendEmail': function (to, from, subject, text){
		if(Meteor.isServer){
			    //check([to, from, subject, text], [String]);
			    // Let other method calls from the same client start running,
			    // without waiting for the email sending to complete.
			    this.unblock();
			    Email.send({
				    to: to,
				    from: from,
				    subject: subject,
				    text: text
			    });
			
		}
	}
});