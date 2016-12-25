import {Template} from 'meteor/templating';
import Editor from './Editor.jsx';
import {fontFamilyMap, addFontList} from './ItemTypes.jsx';

Template.editorBackBone.helpers({
	EditorFrame(){
		return Editor;

	}
})

Meteor.startup(function() {
  //Passing callback as the last parameter - hence the call is ASYNCHRONOUS !!
  HTTP.call( 'GET', 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDMeth-GcM-dRlETd4pwhccNAo18RvBOXg&sort=popularity'
    , {}, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        addFontList(response);
      }
    });
})