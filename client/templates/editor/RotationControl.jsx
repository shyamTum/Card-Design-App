import React, { Component, PropTypes } from 'react';
import ReactDom  from 'react-dom';

//@author:saurabhNsingh
//a component written from scratch which can be used to both rotate and resize an element/div
//uses css transform
//returns the angle and scale

let startX = 0, startY =0;
let endX = 0, endY =0;
let diffX=0, diffY=0;
let rotationInProgress = false;

export default class RotationController extends Component {
	constructor(props){
		super(props);
		this.state = {
			base : this.props.angle||0,
			angle : 0,
			baseScale: this.props.scale || 1,
			scale:1,
			activated: false,
			active: false,
			x:0,
			y:0,
			xMark: 0,
			yMark: 0,
			xDiff: 0,
			yDiff: 0		
		}	
		this.reposition = this.reposition.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.startReposition = this.startReposition.bind(this);
		this.stopReposition = this.stopReposition.bind(this);
		this.stopListening = this.stopListening.bind(this);
		this.handleTransform = this.handleTransform.bind(this);
	}

	componentWillMount(){

	}

	componentDidMount(){
		let thisNode = ReactDOM.findDOMNode(this);
		thisNode.addEventListener("mousedown", this.startReposition);
	}

	componentWillUnmount(){
		this.stopListening();
		let thisNode = ReactDOM.findDOMNode(this);
		thisNode.removeEventListener("mousedown", this.startReposition);
	}

	startReposition(event){
		this.setState({
			active:true,
			xMark: event.clientX,
			yMark: event.clientY,
			xDiff: 0,
			yDiff: 0
		});

		document.addEventListener("mousemove", this.reposition);
		document.addEventListener("mouseup", this.stopReposition);
	}

	reposition(event){
		event.preventDefault();
		event.stopPropagation();

		this.setState({
			xDiff: event.clientX - this.state.xMark,
			yDiff: event.clientY - this.state.yMark
		}, function(){
			if(this.handleTransform ){
				this.handleTransform();
			}
		});
		//this.setState({angle: angle});
		//this.props.callBackParent(angle);
	}

	stopReposition(event){
		event.preventDefault();
		event.stopPropagation();

		this.stopListening();

		this.setState({
			active:false,
			x: this.state.x + this.state.xDiff,
			y: this.state.y + this.state.yDiff,
			xDiff : 0,
			yDiff : 0
		});

		if(this.handleTransformEnd){
			this.handleTransformEnd();
		}
	}

	stopListening(){
		document.removeEventListener("mousemove", this.reposition);
		document.removeEventListener("mouseup", this.stopReposition);
	}

	handleTransform(){
		let s = this.state, p = this.props;
		
		if(p.origin && p.callbackParent){
			let node = ReactDOM.findDOMNode(p.origin);
			let dims = node.getBoundingClientRect();
			let xOffset = dims.left + (dims.right - dims.left)/2;
			let yoffset = dims.top + (dims.bottom - dims.top)/2;

			let x1 = s.xMark - xOffset,
				y1 = s.yMark - yoffset;
			

			let x2 = (s.xMark + s.xDiff) - xOffset,
				y2 = (s.yMark + s.yDiff) - yoffset;

			if(p.function=='rotate'){
				let	m1 = Math.sqrt(x1*x1 + y1*y1);
				x1 /= m1;
				y1 /= m1;

				let	m2 = Math.sqrt(x2*x2 + y2*y2);
				x2 /= m2;
				y2 /= m2;

				let cross = x1*y2 - y1*x2;
				let dot = x1*x2 + y1*y2;
				let angle = Math.atan2(cross, dot);

				this.setState(
					{angle: angle},
					function(){this.props.callbackParent(this.state.base + angle);}
				);
			}
			else{

				let m1 = Math.sqrt(x1*x1 + y1*y1),
					nx1 = x1/m1,
					ny1 = y1/m1;

				let scale = (x2*nx1 + y2*ny1)/m1;
				this.setState(
					{scale: scale},
					function(){this.props.callbackParent(this.state.baseScale * scale);}	
				);
			}
		}
	}

	handleTransformEnd(){
		if(this.props.function=='rotate'){
				this.setState({
				base: this.state.base + this.state.angle
			});
		}else{
			this.setState({
				baseScale: this.state.baseScale * this.state.scale,
				scale: 1
			})
		}
	}

	render(){
		if(this.props.function=='rotate'){
			return(
				<div id="rotate">
					↻
				</div>
			)
		}else{
			return(
				<div id="rotate">
					⇲
				</div>
			)
		}
	}
}

RotationController.propTypes = {
	callbackParent : PropTypes.func.isRequired,
	origin : PropTypes.object,
	angle : PropTypes.any,
	function: PropTypes.oneOf(['rotate','resize']).isRequired,
	scale: PropTypes.any
}
