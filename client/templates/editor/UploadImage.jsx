import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RotationController from './RotationControl';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ButtonExample from './ColorPicker';

import ImageArea from './imageAreaDiv';
import ImagePreview from './ImagePreview';

export default class ImageUpload extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
			file: '',
			imagePreviewUrl: '',
			angle:0,
			scale:1,
			source:0,
			objElem:0,
			imagePreview:0,
			generatePdf:false,
			editorHeight:"80",
			editorWidth:"50",
			editorColor:'white',
			editorLeft:"110px",
			isPortrait:"false",
			isA4:"false",
			isA5:"false",
			isDefault:"false",
			tempRatio:0.625,
		};

	    this._handleImageChange = this._handleImageChange.bind(this);
	    this._handleSubmit = this._handleSubmit.bind(this);
		this.handleAngleChange = this.handleAngleChange.bind(this);
		this.handleScaling = this.handleScaling.bind(this);
		this.handlePDF = this.handlePDF.bind(this);		
		this.changeSizeToDefault = this.changeSizeToDefault.bind(this);
		this.changeSizeToA4 = this.changeSizeToA4.bind(this);
		this.changeSizeToA5 = this.changeSizeToA5.bind(this);
		this.handleTemplateColorChange = this.handleTemplateColorChange.bind(this);
		this.handleSlider = this.handleSlider.bind(this);
		this.changeToPortrait = this.changeToPortrait.bind(this);
	}
	
	_handleSubmit(e){
		e.preventDefault();
	}

	_handleImageChange(e) {
		e.preventDefault();
	    let reader = new FileReader();
	    let file = e.target.files[0];

	    reader.onloadend = () => {
	      this.setState({
	        file: file,
	        imagePreviewUrl: reader.result
	      });
	    }
	    reader.readAsDataURL(file);
  	}
  
	handleAngleChange(angle){
		this.setState({angle: angle});
	}

	handleScaling(scale){
		this.setState({scale:scale});
	}
	
	placeImage(image){
		ReactDOM.render(image,document.getElementById('Image_drop'));
	}

	handlePDF(event){
		this.setState({
			generatePdf:true
		});
	}

	/* handleSlider(value){
		this.setState({editorHeight:document.getElementById("slider").value+"vh"});
		this.setState({editorWidth:document.getElementById("slider").value/1.5+"vw"});
		/* this.setState({editorHeight:value}); */
  	/*} */
	
	handleSlider(value){
		if (this.state.isPortrait=="false"){
				
		this.setState({editorHeight:document.getElementById("slider").value});
		this.setState({editorWidth:document.getElementById("slider").value/1.5}); 
		}
		
		else {
			var tmp = this.state.editorHeight;
			this.setState({editorHeight:document.getElementById("slider").value}); 
			this.setState({editorWidth:this.state.editorHeight/this.state.tempRatio});
		console.log(this.state.editorHeight);
		}
		
		 	}

	componentDidUpdate(){
		if(this.state.generatePdf){
			this.setState({
				generatePdf:false
			});
		}
	}

	changeSizeToA4(){
    	this.setState({editorHeight:"77.47"});
		this.setState({editorWidth:"61.64"});
		this.setState({editorLeft:"50px"});
		document.getElementById("slider").value="77";
		this.setState({isPortrait:"false"});
		this.setState({isA4:"true"});
		this.setState({isA5:"false"});
		this.setState({isDefault:"false"});
	}
	
	changeSizeToA5(){
    	this.setState({editorHeight:"54.68"});
		this.setState({editorWidth:"43.56"});
		this.setState({editorLeft:"110px"});
		this.setState({isPortrait:"false"});
		
			this.setState({isA4:"false"});
		this.setState({isA5:"true"});
		this.setState({isDefault:"false"});
		
		this.setState({isPortrait:"false"});
		document.getElementById("slider").value= "55";
	}
	
	changeSizeToDefault(){
    	this.setState({editorHeight:"80"});
		this.setState({editorWidth:"50"});
		this.setState({editorLeft:"110px"});
		this.setState({isPortrait:"false"});
		document.getElementById("slider").value="78";
		this.setState({isPortrait:"false"});
		
		this.setState({isA4:"false"});
		this.setState({isA5:"false"});
		this.setState({isDefault:"true"});
	}

	handleTemplateColorChange(returnColor){
		this.setState({
			editorColor:returnColor
		});
	}
	
	changeToPortrait(){
		if (this.state.isA4=="true"){
		var tmph = this.state.editorHeight;
		var tmpw = this.state.editorWidth;
		this.setState({editorWidth:"35.78"});
		this.setState({editorHeight:"90"});
		//this.setState({editorLeft:"180px"});
		this.setState({isPortrait:"true"});
		document.getElementById("slider").value= "90";
		this.setState({tempRatio:"2.5153"});
		}
		
		else if (this.state.isA5=="true"){
			var tmph = this.state.editorHeight;
		var tmpw = this.state.editorWidth;
		this.setState({editorWidth:"21.72"});
		this.setState({editorHeight:"65.17"});
		//this.setState({editorLeft:"180px"});
		this.setState({isPortrait:"true"});
		document.getElementById("slider").value= "65.17";
		this.setState({tempRatio:"3"});
		}
		
		else if (this.state.isDefault=="true"){
			var tmph = this.state.editorHeight;
		var tmpw = this.state.editorWidth;
		this.setState({editorWidth:"27.81"});
		this.setState({editorHeight:"83.44"});
		//this.setState({editorLeft:"180px"});
		this.setState({isPortrait:"true"});
		document.getElementById("slider").value= "83.44";
		this.setState({tempRatio:"3"});
		}
		
		else{
			var tmph = this.state.editorHeight;
		var tmpw = this.state.editorWidth;
		this.setState({editorWidth:"27.81"});
		this.setState({editorHeight:"83.44"});
		//this.setState({editorLeft:"180px"});
		this.setState({isPortrait:"true"});
		document.getElementById("slider").value= "83.44";
		this.setState({tempRatio:"3"});
		}
		
		
	}
	
	

  	render(){ 
		let {imagePreviewUrl} = this.state;
		let imagePreview = null;
		
		if(imagePreviewUrl){	
			imagePreview = (
				<ImagePreview imagePreviewURL={imagePreviewUrl} top={100} left={100} id='imagePre'/>
			); 	
		}
	    else{
			imagePreview = (<div id="image_preview1" style = {{textAlign:"right"}}>Image preview/drop here</div>);
	  	} 
			
		return(	      
	        <table style = {{height:"10px",width:"180px",marginRight:"20px"}}>
				<tbody>
			  		<tr>
			    		<td>
			  				<div id="image_form" style={{border:"1px solid black",width:"190px"}}>
			     				Upload image file
	            				<form onSubmit={this._handleSubmit}>
	            					<input type="file" onChange={this._handleImageChange}/>
	            				</form>

	            				<div style={{visibility:'visible'}}>
									<button className="btn btn-primary" type="button" ref="buttonTest" onClick={this.handlePDF} id="pdfButton">PDF</button>
									<button className="btn btn-primary" onClick={this.changeSizeToA4}>A4</button>
							  		<button className="btn btn-primary" onClick={this.changeSizeToA5}>A5</button>
							  		<button className="btn btn-primary" onClick={this.changeSizeToDefault}>Default</button>
									<button className="btn btn-primary" onClick={this.changeToPortrait}>Portrait</button>
							  		<ButtonExample callbackParent={this.handleTemplateColorChange} top={160} left={220} id="Color"/>
							  		<input type="range" id="slider" name="points" min="40" max="95" onChange={this.handleSlider}/>
						  		</div>

			  				</div>
	            		</td>
				
						<td>
							<ImageArea source={this.props.templateSource} imagePreview={imagePreviewUrl} generatePdf={this.state.generatePdf} divHeight={this.state.editorHeight+"vh"} divWidth={this.state.editorWidth+"vw"} divColor={this.state.editorColor} divLeft={this.state.editorLeft}/>				 
						</td>
					</tr>
						  
				</tbody>
			</table>
		)
	}
}

ImageUpload.propTypes={
	templateSource: PropTypes.any.isRequired	
};
