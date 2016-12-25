import React, {Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RotationController from './RotationControl';


const imageSource = {
	beginDrag(props){
		const {id, left, top, imagePreviewURL} = props;
		return {id, left, top, imagePreviewURL};
	}
};

function collect(connect, monitor){
	return{
		connectDragSource: connect.dragSource()
	}
}

export default class ImagePreview extends Component{
	constructor(props){
		super(props);
		this.state={
			rotToolVisibility:'hidden',
			textHighlightBorder:'black',
			angle:0,
      		scale:1
		};		
		this.handleAngleChange = this.handleAngleChange.bind(this);
		this.handleScaling = this.handleScaling.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
	}

	handleFocus(event){
		this.setState({
			rotToolVisibility:'visible'
		})
		this.props.onFocus(this.props.id);
	}

	handleAngleChange(angle){
		this.setState({angle: angle});
		this.picNode.focus();
	}

	handleScaling(scale){
		this.setState({scale:scale});
		this.picNode.focus();
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			rotToolVisibility:nextProps.rotateVisible
		});
	}
	
	render(){
		const { connectDragSource, left, top, id} = this.props;
		visibility=this.state.rotToolVisibility;
		if(id=='template'){
			visibility='hidden';
		}
		return connectDragSource(
			<div id="image_div" style={{transform:"rotate("+this.state.angle+"rad) scale("+this.state.scale+")",top:top,left:left,position:'absolute',zIndex:0,height:"350px",width:"550px"}}>
				<img ref={node => this.picNode = node} src={this.props.imagePreviewURL} style={{height:"350px",width:"550px",right:"400px",left:"280"}} onClick={this.handleFocus} />	

				<div style = {{position:"absolute", right:'21em', top:'26em', visibility:this.state.rotToolVisibility}}>
					<RotationController callbackParent={this.handleAngleChange}
									origin={this}
									angle={this.state.angle}
									function='rotate'/>
				</div>

				<div style = {{position:"absolute", top:'26em', right:'-1.3em', visibility:this.state.rotToolVisibility}}>
					<RotationController callbackParent={this.handleScaling}
									origin={this}
									scale={this.state.scale}
									function='resize'/>
				</div>
											
			</div>
		)
	}
}

ImagePreview.propTypes={
	imagePreviewURL: PropTypes.any.isRequired,
	left: PropTypes.number.isRequired,
	top: PropTypes.number.isRequired,
	id: PropTypes.any.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	onFocus: PropTypes.func.isRequired,
	rotateVisible: PropTypes.any.isRequired
};

export default DragSource('imagePre', imageSource, collect)(ImagePreview);