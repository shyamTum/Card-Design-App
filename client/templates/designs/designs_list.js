Template.designsList.helpers({
  template: function () {
    var voucher = this.voucher;
    var design = Designs.findOne(voucher.designId);
    var templateName = 'design_' + design._id;
    if (!Template[templateName]) {
      Template[templateName] = Template.fromString(design.template); //template is html-string in db
      Template[templateName].events({
        'change #voucher_recipient': function (event) {
          Vouchers.update({_id: Bonbeo.getVoucherId()}, {$set: {recipient: $(event.target).val()}});
        },
        'change #voucher_description': function (event) {
          Vouchers.update({_id: Bonbeo.getVoucherId()}, {$set: {description: $(event.target).val()}});
        },
        'change #voucher_sender': function (event) {
          Vouchers.update({_id: Bonbeo.getVoucherId()}, {$set: {sender: $(event.target).val()}});
        }
      });
      Template[templateName].helpers({
        'imageURL': function () {
          if (!this.voucher.image) {
            return '/assets/images/pattern/patternWebBlue.png';
          }
          var image = Images.findOne(this.voucher.image._id);
          return image.url();
        }
      });
    }
    return templateName;
  },
  data: function () {
    return {
      rootURL: Meteor.absoluteUrl(),
      voucher: this.voucher
    }
  },
  images: function () {
    //return Images.find({}, {sort: {createdAt: 1}}).fetch().pop();
  }
});

Template.designsList.events({
  'change #uploadField': function (event, template) {
    var files = event.target.files;
    console.log('EVENT TARGET: ', files);



    for (var i = 0, ln = files.length; i < ln; i++) {

      Images.insert(files[i], function (err, fileObj) {
        console.log('FILE OBJECT UPLOAD', fileObj);
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        Vouchers.update({_id: Bonbeo.getVoucherId()}, {$set: {image: fileObj}});
      });
    }
  },
  'mousedown #firstDesignHeader': function (event, template) {
    event.preventDefault();

    var lastPositionX = undefined,
      lastPositionY = undefined;

    $(document).on('mousemove', moveImage);
    $(document).on('mouseup', function () {
      $(document).off('mousemove', moveImage);
    });

    function moveImage(event) {
      if (lastPositionX !== undefined && lastPositionY !== undefined) {
        var deltaX = event.screenX - lastPositionX;
        var deltaY = event.screenY - lastPositionY;
        Vouchers.update({_id: Bonbeo.getVoucherId()}, {
          $inc: {
            imagePositionX: deltaX,
            imagePositionY: deltaY
          }
        });
      }
      lastPositionX = event.screenX;
      lastPositionY = event.screenY;
    }
  },
  'click #saveCroppedImage': function (event, template) {
    console.log('CLICK SAVE CROPED IMAGE');

  },
  'click #grayscaleBtn': function (event, template) {
    console.log('Click');
    $('gs').val(100);
  }
});

Template.designsList.onRendered(function () {
  $("#firstDesignHeader").on('mousewheel', scaleImage.bind(this));
  //
  //
  //console.log('ON RENDERED');
  //
  //var $previews = $('.preview');
  //$('#image').cropper({
  //  build: function (e) {
  //    var $clone = $(this).clone();
  //
  //    $clone.css({
  //      display: 'block',
  //      width: '100%',
  //      minWidth: 0,
  //      minHeight: 0,
  //      maxWidth: 'none',
  //      maxHeight: 'none'
  //    });
  //
  //    $previews.css({
  //      width: '100%',
  //      overflow: 'hidden'
  //    }).html($clone);
  //  },
  //
  //  crop: function (e) {
  //    var imageData = $(this).cropper('getImageData');
  //    var previewAspectRatio = e.width / e.height;
  //
  //    $previews.each(function () {
  //      var $preview = $(this);
  //      var previewWidth = $preview.width();
  //      var previewHeight = previewWidth / previewAspectRatio;
  //      var imageScaledRatio = e.width / previewWidth;
  //
  //      $preview.height(previewHeight).find('img').css({
  //        width: imageData.naturalWidth / imageScaledRatio,
  //        height: imageData.naturalHeight / imageScaledRatio,
  //        marginLeft: -e.x / imageScaledRatio,
  //        marginTop: -e.y / imageScaledRatio
  //      });
  //    });
  //  }
  //});


  $('#colorpicker').colorpicker({align: 'left'}).on('changeColor.colorpicker', function(event){
    var firstDesignHeader = $('#firstDesignContent');
    firstDesignHeader.css('background-color', event.color.toHex());
  });

  var slider = document.getElementById("slider");

  noUiSlider.create(slider, {
    start: [ 0 ],
    range: {
      'min': [  0 ],
      'max': [ 100 ]
    }
  });


// adding an image via url box
  function addImage(e) {
    var imgUrl = $("#imgUrl").val();
    if (imgUrl.length) {
      $("#imageContainer img").attr("src", imgUrl);
    }
    e.preventDefault();
  }

//on pressing return, addImage() will be called
  $("#urlBox").submit(addImage);


// editing image via css properties
  function editImage() {
    var gs = $("#gs").val(); // grayscale
    var blur = $("#blur").val(); // blur
    var br = $("#br").val(); // brightness
    var ct = $("#ct").val(); // contrast
    var huer = $("#huer").val(); //hue-rotate
    var opacity = $("#opacity").val(); //opacity
    var invert = $("#invert").val(); //invert
    var saturate = $("#saturate").val(); //saturate
    var sepia = $("#sepia").val(); //sepia

    $("#imageContainer img").css("filter", 'grayscale(' + gs+
    '%) blur(' + blur +
    'px) brightness(' + br +
    '%) contrast(' + ct +
    '%) hue-rotate(' + huer +
    'deg) opacity(' + opacity +
    '%) invert(' + invert +
    '%) saturate(' + saturate +
    '%) sepia(' + sepia + '%)');

    $("#imageContainer img").css("-webkit-filter", 'grayscale(' + gs+
    '%) blur(' + blur +
    'px) brightness(' + br +
    '%) contrast(' + ct +
    '%) hue-rotate(' + huer +
    'deg) opacity(' + opacity +
    '%) invert(' + invert +
    '%) saturate(' + saturate +
    '%) sepia(' + sepia + '%)');

  }

//When sliders change image will be updated via editImage() function
  $("input[type=range]").change(editImage).mousemove(editImage);

// Reset sliders back to their original values on press of 'reset'
  $('#imageEditor').on('reset', function () {
    setTimeout(function() {
      editImage();
    },0);
  });





//  var rangeSliderValueElement = document.getElementById('slider-range-value');
//  console.log('RANGE SLIDER', rangeSliderValueElement);
//
//  slider.noUiSlider.on('update', function( values, handle ) {
//    console.log('Slider Value', value);
//    console.log('Values', values[handle]);
//
//    var imgToFilter = document.getElementById('img-to-filter');
//    imgToFilter.setAttribute('data-pb-blur-amount', values[handle])
//
//    rangeSliderValueElement.innerHTML = values[handle];
//  });
//
////  // 'Getting' data-attributes using getAttribute
////  var filterVal = imgToFilter.getAttribute('data-pb-blur-amount');
////
////  console.log('Filtered Value', filterVal);
////
////// 'Setting' data-attributes using setAttribute
////  plant.setAttribute('data-fruit','7'); // Pesky birds



});


Template.designsList.onDestroyed(function () {
  $("#firstDesignHeader").off('mousewheel', scaleImage.bind(this));
});

Template.designsList.onCreated(function () {
  this.subscribe('images');
})

function scaleImage(event, delta) {
  event.preventDefault();
  console.log('delta', delta);
  Vouchers.update({_id: Bonbeo.getVoucherId()}, {$inc: {imageScale: delta * 50}});
}
