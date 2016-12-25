import React, {Component, PropTypes} from 'react';
import ImageUpload from './UploadImage.jsx';
import ReactDOM from 'react-dom';
import RotationController from './RotationControl';
import ButtonExample from './ColorPicker';
import {DragSource} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const svgSource = {
	beginDrag(props){
		const{id, left, top, shape}=props;
		return{id, left, top, shape};
	}
}

function collect(connect, monitor){
	return{
		connectDragSource: connect.dragSource()
	}
}

  export default class SVGAppNew extends Component{
	
	constructor(props){
		super(props);
		this.state={
			shape: 0,
            size: 0,
            color: 0,
			elem:0,
			angle:0,
			scale:1
		}
		this.handleScaling = this.handleScaling.bind(this);
		this.handleAngleChange = this.handleAngleChange.bind(this);
		this.handleSVGColor = this.handleSVGColor.bind(this);
		this.svgFocus = this.svgFocus.bind(this);
		this.handleDeletion = this.handleDeletion.bind(this);
		this.handleScaling = this.handleScaling.bind(this);
	}

	handleDeletion(){
		this.props.onDeletion(this.props.id)
	}
	
	handleAngleChange(angle){
		this.setState({angle: angle});
	}
	
	handleSVGColor(color){
		this.setState({color:color});
	}
	
	svgFocus(){
	    this.props.onFocus(this.props.id);
	}
	
	handleScaling(scale){
		this.setState({
			scale:scale
		});
	}
	
	render() {
		var size = (this.state.size * 10) + 10;
		const {connectDragSource, left, top, id, zIndex} = this.props;
		switch (this.props.shape) {
            case 'circle':
                elem =
                    <svg id={id} width={size*Math.sqrt(this.state.scale)} height={size*Math.sqrt(this.state.scale)}>
						<circle
						cx={size/2}
						cy={size/2}
						r={size / 2}
						fill={this.state.color} 
						id={id}
						transform={"scale("+Math.sqrt(this.state.scale)+")"}/>					
					</svg>;
                break;
			
			case 'rect':
                elem =
                    <svg id={id} width={size*Math.sqrt(this.state.scale)} height={size*Math.sqrt(this.state.scale)}>
					<rect
                        width={size}
                        height={size}
                        fill={this.state.color} 
                        id={id}
                        transform={"scale("+Math.sqrt(this.state.scale)+")"}/>
						</svg>;
                break;
				
			case 'ellipse':
                elem =
                    <svg id={id} width={size*Math.sqrt(this.state.scale)} height={size*0.75*Math.sqrt(this.state.scale)}>
					<ellipse
						cx={size/2}
						cy={size/2 * 0.75}
                        rx={size / 2}
                        ry={size / 2 * 0.75}
                        fill={this.state.color} 
                        id={id}
                        transform={"scale("+Math.sqrt(this.state.scale)+")"}/>
						</svg>;
                break;
		}
		
		return connectDragSource(
			<div id={id} style={{transform:"scale("+this.state.scale+")", top:top, left:left, position:'absolute', zIndex:zIndex, width:size, height:size}} onClick={this.svgFocus}>
			   	{elem}
			   	
			   	<div style = {{transform:"scale("+ 1/this.state.scale+")", position:"absolute", bottom:'-0.9em', right:'-1.3em', visibility:this.props.showOptions}}>
					<RotationController callbackParent={this.handleScaling}
									origin={this}
									scale={this.state.scale}
									function='resize'/>
				</div>
			   	
			   	<div style={{transform:"scale("+ 1/this.state.scale +")",visibility:this.props.showOptions, bottom:1/this.state.scale -1 + 'em', right:1.5/this.state.scale -1 + 'em', position:'absolute'}}>
			   		<ButtonExample callbackParent={this.handleSVGColor} top={160} left={220} id="Color"/>
					<button className="btn btn-primary" onClick={this.handleDeletion}>
						<span className="glyphicon glyphicon-trash"></span>
					</button>
				</div>
			</div>
		)
	}	
}

SVGAppNew. propTypes = {
	left: PropTypes.number.isRequired,
	top: PropTypes.number.isRequired,
	id: PropTypes.any.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	shape: PropTypes.any.isRequired,
	onFocus: PropTypes.func,
	showOptions: PropTypes.any.isRequired,
	zIndex: PropTypes.number.isRequired
}

export default DragSource('svg', svgSource, collect)(SVGAppNew);