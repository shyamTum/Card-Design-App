import update from 'react/lib/update';

//@author:saurabhNsingh
//@required items for text element

export const ItemTypes = {
	TEXTBOX: 'tbox'
};

export const fontFamilyBackup = ["Roboto", "Calibri", "Open Sans", "Lato", "Oswald", "Roboto Condensed", "Source Sans Pro", "Montserrat", "Raleway", "PT Sans", "Lora", "Open Sans Condensed", "Roboto Slab"];
export const fontFamily = [];
export const alignList = ["center","right","left"];
export const fontSize = ["05","10","15","20","25","30","35","40","45","50","55","60"];

export function addFontList(response){
	//TODO: remove the hardcoding
	//Hardcoded number of fonts to be loaded as 30
	for(i=0;i<=30;i++){
		fontFamily.push(response.data.items[i].family);
	}
	loadFonts();
}

export function loadFonts(){

	WebFontConfig = {
    	google: { families: fontFamily}
  	};
  	
  	(function() {
	    var wf = document.createElement('script');
	    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	    wf.type = 'text/javascript';
	    wf.async = 'true';
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(wf, s);
	})();
}