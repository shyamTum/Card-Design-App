import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {ItemTypes, fontFamily, fontFamilyBackup, fontSize, alignList} from './ItemTypes';
import ButtonExample from './ColorPicker';
import RotationController from './RotationControl';

//@author:saurabhNsingh
//Dragged text box on image
//has a lot of features, all set using state. 
//functions/handler have generic names for better readability

const textSource = {
	beginDrag(props){
		const {id, left, top} = props;
		return {id, left, top};
	}
};

function collect(connect, monitor){
	return{
		connectDragSource: connect.dragSource()
	}
}

export default class TextBox extends Component{	
	constructor(props){
		super(props);
		this.state={
			fontSize: '12px',
			visibility: "visible",
			fontAlignment: "center",
			fontFamilyRenderList:fontFamily,
      		fontFamilyRendered:false,
      		fontFamily: 'Ariel',
      		textValue:'',
      		fontColor:'black', 
      		transparentChecked:true,
      		backgroundColor:'transparent',
      		borderColor:'black',
      		hideTextOptions:false,
      		angle:0,
      		scale:1, 
      		rotToolVisibility:'hidden',
      		textHighlightBorder:'transparent'
		};

		this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
		this.handleFontAlign = this.handleFontAlign.bind(this);
		this.handleFontFamilyLoad = this.handleFontFamilyLoad.bind(this);
    	this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);
    	this.handleTextChange = this.handleTextChange.bind(this);
    	
    	this.handleBackgroundColorChange = this.handleBackgroundColorChange.bind(this);
    	this.handleTextColorChange = this.handleTextColorChange.bind(this);
    	this.handleBorderColorChange = this.handleBorderColorChange.bind(this);
    	this.handleToggle = this.handleToggle.bind(this);
    	this.handleCheckClick = this.handleCheckClick.bind(this);

    	this.handleFocus = this.handleFocus.bind(this);
    	this.handleTextBlur = this.handleTextBlur.bind(this);

    	this.handleAngleChange = this.handleAngleChange.bind(this);
    	this.handleScaling = this.handleScaling.bind(this);
    	this.handleRemoveBg = this.handleRemoveBg.bind(this);
    	this.handleRemoveBorder = this.handleRemoveBorder.bind(this);
    	this.handleDeletion = this.handleDeletion.bind(this);
	}

	handleDeletion(){
		this.props.onDeletion(this.props.id)
	}

	handleRemoveBg(){
		this.setState({
			backgroundColor:'transparent'
		});
	}

	handleRemoveBorder(){
		this.setState({
			borderColor:'transparent'
		});
	}

	handleFocus(event){
		this.setState({
			hideTextOptions:false,
			rotToolVisibility:'visible',
			textHighlightBorder:'black'
		});
		this.props.onFocus(this.props.id);
	}

	handleTextColorChange(returnColor){
		this.setState({fontColor:returnColor});
	}

	handleTextBlur(event){
		this.setState({
			rotToolVisibility:'hidden',
			textHighlightBorder:'transparent'
		})
	}

	handleBackgroundColorChange(returnColor){
		this.setState({
			backgroundColor:returnColor,
			transparentChecked:false
		});
	}

	handleBorderColorChange(returnColor){
		this.setState({
			borderColor:returnColor
		});
	}
	handleCheckClick(event){
		this.setState({transparentChecked:!this.state.transparentChecked});
	}

	handleToggle(event){
		if(!this.state.transparentChecked){
			this.setState({backgroundColor:'transparent'});
		}
	}

	handleTextChange(event){
		this.setState({textValue:event.target.value});
	}

	handleFontSizeChange(event){
		this.setState({fontSize:event.target.value+'px'});
	}

	handleFontAlign(event){
		this.setState({fontAlignment:event.target.value});
	}

	handleFontFamilyLoad(event){
		if(!this.state.fontFamilyRendered && fontFamily.length>1){
			this.setState({
				fontFamilyRenderList: fontFamily,
				fontFamilyRendered: true
			});
		}
	}
	
	handleFontFamilyChange(event){
		this.setState({
			fontFamily:event.target.value
		});	
	}
	
	handleAngleChange(angle){
		this.setState({
			angle: angle
		});
		this.textNode.focus();
	}

	handleScaling(scale){
		this.setState({
			scale:scale
		});
		this.textNode.focus();
	}

	componentDidMount(){
  		$('.selectpicker').selectpicker();
	}

	render(){
		const{ connectDragSource, left, top, children, id, showOptions, zIndex, generatePDF} = this.props;
		const alignDetail = this.props.align||'left';
		let value = this.state.textValue;

		if(this.props.generatePDF){
			showBox = 'visible';
			showText = 'hidden';
		}else{
			showBox = 'hidden';
			showText = 'visible';
		}
		return connectDragSource(
			<div className = 'textBox' style= {{position:"absolute",top: top, left:left, zIndex:zIndex}}>
				
				<div style={{transform:"rotate("+this.state.angle+"rad) scale("+this.state.scale+")"}}>
					<div style={{borderColor:this.state.textHighlightBorder ,padding:'6px', borderWidth:'1px', borderStyle:'dotted', visibility:showText}}>
						<input ref={node => this.textNode = node} type="text" id={id} style={{fontSize: this.state.fontSize, textAlign:this.state.fontAlignment, fontFamily: this.state.fontFamily, color:this.state.fontColor, background:this.state.backgroundColor, border:'1px solid '+ this.state.borderColor}} value={value} className="editorTextBox" onChange={this.handleTextChange} onFocus={this.handleFocus} onBlur={this.handleTextBlur}></input>
						{this.props.children}
					</div>

					<div className="rotateTool" style = {{position:"absolute", right:'6em', visibility:this.state.rotToolVisibility}}>
						<RotationController callbackParent={this.handleAngleChange}
											origin={this}
											angle={this.state.angle}
											function='rotate'/>
					</div>

					<div style = {{position:"absolute", bottom:'-0.9em', right:'-1.3em', visibility:this.state.rotToolVisibility, transform:"scale(1)"}}>
						<RotationController callbackParent={this.handleScaling}
										origin={this}
										scale={this.state.scale}
										function='resize'/>
					</div>
				
					<div style={{position:"absolute",visibility:showBox}}>
						<div className='box' style={{padding:"6px", borderStyle:"solid", minWidth:"150px", backgroundColor:this.state.backgroundColor, borderColor: this.state.borderColor, borderWidth:'1px', visibility:showBox}}>
							<p ref="copyText" style={{fontSize: this.state.fontSize, textAlign:this.state.fontAlignment, fontFamily: this.state.fontFamily, color:this.state.fontColor}} onChange={this.handleTextChange} onFocus={this.handleFocus} >{this.state.textValue}</p>
						</div>
					</div>

					<div className = 'textOptions' style ={{transform:"rotate("+(0-this.state.angle)+"rad) scale("+(1/this.state.scale)+")", visibility: showOptions, position:"absolute", bottom:6/this.state.scale + 'em',right:'2.5em'}} >

						<div className="fontSelTest floating-box " id="fontSelTest" onChange={this.handleFontSizeChange}>
							<select name="fontSize" className="selectpicker" data-style="btn-primary" data-width="auto">
								<option selected disabled hidden>FontSize</option>
								{fontSize.map((size, index)=>(
									<option value={size} key={index}>{size}</option>
									))}
							</select>
						</div>

						<div className="fontAlign floating-box" id="fontAlign" onChange={this.handleFontAlign} >
							<select name="fontAlign" className="selectpicker" data-style="btn-primary" data-width="auto">
								<option selected disabled hidden>Align</option>
								{alignList.map((alignment, index)=>(
									<option value={alignment} key={index} style={{textAlign:alignment}}>{alignment}</option>
									))}
							</select>
						</div>

						<div className = "fontFam floating-box" id="fontFam" onClick={this.handleFontFamilyLoad} onChange={this.handleFontFamilyChange} >
							<select name="fontFamily" className="selectpicker" data-style="btn-primary" data-width="auto">
								<option selected disabled hidden>Font</option>
								{this.state.fontFamilyRenderList.map((font, index)=>(
									<option value={font} key={index} style={{fontFamily: font}}>{font}</option>
									))}
							</select>
						</div>

						<div >

							<ButtonExample callbackParent={this.handleTextColorChange} top={160} left={220} id="Clr"/>

							<ButtonExample callbackParent={this.handleBackgroundColorChange} top={240} left={220} id="BgClr"/>

							<ButtonExample callbackParent={this.handleBorderColorChange} top={280} left={220} id="BrdrClr"/>

						</div>

						<div>
							<button className="btn btn-primary" onClick={this.handleRemoveBg}>RmBg</button>
							<button className="btn btn-primary" onClick={this.handleRemoveBorder}>RmBrdr</button>
							<button className="btn btn-primary" onClick={this.handleDeletion}>
      							<span className="glyphicon glyphicon-trash"></span>
    						</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TextBox.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	id: PropTypes.any.isRequired,
	left: PropTypes.number.isRequired,
	top: PropTypes.number.isRequired,
	children: PropTypes.node,
	onFocus: PropTypes.func.isRequired,
	showOptions: PropTypes.any.isRequired,
	zIndex: PropTypes.number.isRequired,
	generatePDF: PropTypes.bool.isRequired
};

export default DragSource('tbox', textSource, collect)(TextBox);