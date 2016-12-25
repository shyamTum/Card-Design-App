import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {ItemTypes, fontFamily, fontFamilyBackup, fontSize, alignList} from './ItemTypes';
import RotationController from './RotationControl';

//@author:saurabhNsingh
//Text box element which user drags on the imageBox
//has hardcoded default value and id:TextParent

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

export default class TextBoxPlain extends Component{	
	constructor(props){
		super(props);
		this.state={
			textValue:'Drag and rotate !!', 
			angle:0,
			scale:1
		};
		this.handleAngleChange = this.handleAngleChange.bind(this);
		this.handleScaling = this.handleScaling.bind(this);
	}

	handleAngleChange(angle){
		this.setState({angle: angle});
	}

	handleScaling(scale){
		this.setState({scale:scale});
	}
	render(){
		const { connectDragSource, left, top, id} = this.props;
		return connectDragSource(
			<div className = 'textPlain' style= {{position:"absolute", top: top, left:left, transform:"rotate("+this.state.angle+"rad) scale("+this.state.scale+")"}}>
				<input type="text" id={id} defaultValue={this.state.textValue}/>
				{this.props.children}

				<div style = {{position:"absolute", top: top, left:left, visibility:'hidden'}}>
					<RotationController callbackParent={this.handleAngleChange}
										origin={this}
										angle={this.state.angle}
										function='rotate'/>
				</div>

				<div style = {{position:"absolute", top: top, left:left+35, visibility:'hidden'}}>
					<RotationController callbackParent={this.handleScaling}
										origin={this}
										scale={this.state.scale}
										function='resize'/>
				</div>
			</div>
		);
	}
}

TextBoxPlain.propTypes = {
	left: PropTypes.number.isRequired,
	top: PropTypes.number.isRequired,
	id: PropTypes.any.isRequired,
	connectDragSource: PropTypes.func.isRequired
}

export default DragSource('tboxP', textSource, collect)(TextBoxPlain);