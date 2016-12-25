var hooksObject = {
  onSuccess: function(formType, result) {
    console.log('FORM Type', formType);
    console.log('RESULT', result);

    if (result === 1) {
      $('#userUpdatedSuccessfully').addClass('show').removeClass('hide');
      //$('#userUpdatedSuccessfully').switchClass( "hide", "show", 1000, "easeInOutQuad" );
      //$('#userUpdatedSuccessfully').show();
      console.log('SUCCESS');
    }
    else {
      $('#userUpdateError').addClass('show').removeClass('hide');
      //$('#userUpdateError').switchClass( "hide", "show", 1000, "easeInOutQuad" );
      //$('#userUpdateError').show();
    }


  }
}

AutoForm.addHooks(null, hooksObject);