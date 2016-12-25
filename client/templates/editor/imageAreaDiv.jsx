import React, {Component, PropTypes} from 'react';
import ImageUpload from './UploadImage.jsx';

import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';

import NavigationBar from './NavigationBar';
import TextBoxPlain from './TextBoxPlain';
import SVGAppNew from './UploadSVGNew';
import TextBox from './TextBox';
import ImagePreview from './ImagePreview';

const imageTarget = {
	drop(props, monitor, component){
		const item = monitor.getItem();
		const delta = monitor.getDifferenceFromInitialOffset();
		const left = Math.round(item.left + delta.x);
		const top = Math.round(item.top + delta.y);
		
		let shape = "noShape";
		if(item.shape!=undefined){
			shape = item.shape;
		}
		let imageURL="";
		if(item.imagePreviewURL!=undefined){
			imageURL = item.imagePreviewURL;
		}
		component.moveItem(item.id, left, top, shape, imageURL);

	}
};

function collect(connect, monitor){
	return{
		connectDropTarget: connect.dropTarget()
	}
}

export default class ImageArea extends Component{
	
	constructor(props){
		super(props);	
		this.state = {
			items:{
			},
			selectedElementID:'',
      		nextID:1,
      		generatePDF:false,
      		generateEmail:false,
      		childImageDragged:false,
      		imageTop:100,
      		imageLeft:100,
      		templateTop:100,
      		templateLeft:100
		}
		this.handleFocus = this.handleFocus.bind(this);
    	this.handleBlur = this.handleBlur.bind(this);
    	this.handleDeletion = this.handleDeletion.bind(this);
	}

	handleBlur(){
	
	}
	
	handleDeletion(id){
		this.setState(update(this.state,{
			items:{$merge:{[id]: {}}
			}
		}));
	}
	
	handleFocus(id){
		this.setState({selectedElementID:id});
	}
	
	moveItem(id, left, top, shape, imageURL){

		if(id.startsWith("svgOriginal")){
			childId = "childSVG"+shape+this.state.nextID;
			this.setState(update(this.state,{
				items:{$merge:{[childId]:{top:top-340, left:left-340, shape:shape, parent:'SVGAppNew'}}
				}
			}));

			this.setState({
				selectedElementID:childId,
				nextID: this.state.nextID+1
			});
		}
		
		if(id==="TextParent"){
			childId = "childText"+this.state.nextID;
			this.setState(update(this.state,{
				items:{$merge:{[childId]: { top: top-341, left:left-340, value:"newBox", parent:'TextBox'}}
				}
			}));

			this.setState({
				selectedElementID:childId,
				nextID: this.state.nextID+1
			});
		}
		if(id==="imagePre"){
			this.setState({
				childImageDragged:true,
				selectedElementID:id,
				imageTop:top,
				imageLeft:left
			})
		}
		if(id==='template'){
			this.setState({
				selectedElementID:id,
				templateTop:top,
				templateLeft:left
			})
		}
		else{
			this.setState(update(this.state, {
				items: {
					[id]: {
						$merge: {
							left: left,
							top: top
						}
					}
				}
			}));
			this.setState({selectedElementID:id});
		}
	}

	componentWillReceiveProps(){
		console.log("now works");
	}

	componentWillUpdate(nextProps){
		if(nextProps.generatePdf){
			this.setState({
				selectedElementID:'pdfButton',
				generatePDF:true
			});
		}
	}

	componentDidUpdate(){
		if(this.state.generatePDF){
			event.preventDefault();
			let htmlString = this.node.innerHTML.toString();
			let newString = htmlString.replace(/style=\"transform/g,'style=\"-webkit-transform');
			newString = newString.replace(/&quot;/g,'\"');
			//console.log(newString.includes("style=\"-webkit-transform: rotate"));
			//console.log(newString);
			Meteor.call('pdfGen/generate',newString,function(err,res){
				if (err) {
					console.error(err);
				} else if (res) {
					window.open("data:application/pdf;base64, " + res);
				}
			})
			this.setState({generatePDF:false});
		}
	}

	render(){
		const {src, connectDropTarget} = this.props;
		const {items}= this.state==null?new Map():this.state;
		let uploadedImage;
		if(this.props.imagePreview){
			toolVisibility = 'visible';
			if(this.state.selectedElementID!='imagePre'){
				toolVisibility = 'hidden';
			}
			uploadedImage = <ImagePreview imagePreviewURL={this.props.imagePreview} top={this.state.imageTop} left={this.state.imageLeft} id='imagePre' onFocus={this.handleFocus} rotateVisible={toolVisibility}/>;
		}else{
			uploadedImage = (<div id="image_preview1" style = {{textAlign:"right"}}></div>);
		}

		let templateImage;
		if(this.props.source){
			templateImage = <ImagePreview imagePreviewURL={this.props.source} top={this.state.templateTop} left={this.state.templateLeft} id='template' onFocus={this.handleFocus}/>;
		}

		return connectDropTarget(
		<div ref={node => this.node = node} id="ImageDiv">	
			{/*<div class="Image_drop" id= "Image_drop" style={{marginLeft:"250px", border:"2px solid green",height:"180px",width:"650px",marginTop:"10px",background:"white",backgroundImage:'url(' + this.props.source + ')'}} onBlur={this.handleBlur}>*/}
			<div class="Image_drop" id = "Image_drop" style={{display:"flex",position:"relative",left:this.props.divLeft,right:"50",top:"30", height:this.props.divHeight, width:this.props.divWidth,marginTop:"-90px",backgroundColor:this.props.divColor,backgroundSize:"100% 100%",backgroundRepeat: "noRepeat"}}>
				<div class="Image_drop1" id = "Image_drop1" style={{display:"flex",position:"relative",marginBottom:"20",marginLeft:"20",marginRight:"20",marginTop:"20", height:this.props.divHeight-"5", width:this.props.divWidth,backgroundSize:"100% 100%",backgroundRepeat: "noRepeat",backgroundImage:'url(' + this.props.source + ')'}}>
					{
						items!=null?(Object.keys(items).map(key => {
							
							let visible = "hidden";
							let zIndex =1;
							if(this.state.selectedElementID==key){
								visible = "visible";
								zIndex =2;
							}

							const { left, top, parent } = items[key];
							if(parent!=undefined){
								if(parent.includes('Text')){
									return(
										<div className="TextDiv" key={key} id={key}>
											<TextBox
												key ={key} 
												id={key} 
												left={left} 
												top={top}
												showOptions={visible}
												onFocus={this.handleFocus}
												zIndex={zIndex}
												generatePDF={this.state.generatePDF}
												onDeletion={this.handleDeletion}
												>
											</TextBox>
										</div>	
									);
								}
								if(parent.includes('SVG')){
									const {shape} = items[key];
									return(
										<div className="svgChildDiv" key={key} id={key}>
											<SVGAppNew 
												key={key} 
												id={key} 
												left={left} 
												top={top} 
												shape={shape} 
												onFocus={this.handleFocus} 
												showOptions={visible}
												zIndex={zIndex}
												onDeletion={this.handleDeletion}
												>
											</SVGAppNew>
										</div>
									);
								}
							}
						})):console.log("option2")
					}
					{/*templateImage*/}
					{uploadedImage}
	        	
				</div>
			</div>	
		</div>
		);
	}
}

ImageArea. propTypes = {
	source: PropTypes.any.isRequired,
	imagePreview: PropTypes.any.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	generatePdf: PropTypes.any.isRequired,
	divHeight: React.PropTypes.any.isRequired,
	divWidth: React.PropTypes.any.isRequired,
	divColor: React.PropTypes.any.isRequired,
	divLeft:React.PropTypes.any
}

export default DropTarget(['svg','tboxP','tbox','imagePre'], imageTarget, collect)(ImageArea);