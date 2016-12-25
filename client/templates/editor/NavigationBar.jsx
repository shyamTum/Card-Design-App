import React, {Component, PropTypes} from 'react';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SVGAppNew from './UploadSVGNew';
import TextBoxPlain from './TextBoxPlain';

export default class NavigationBar extends Component{	
	constructor(props){
		super(props);
		this.state={
		}
		this.onTemplateLoad = this.onTemplateLoad.bind(this);
	}

	onTemplateLoad(source){
		this.props.setTemplateSource(source);
	}

	render(){
		const source1='https://w3layouts.com/wp-content/uploads/2015/07/MyTemplate.jpg';
		const source2='/assets/images/template2.png';
		return (
			<div>
				<TextBoxPlain top={650} left={12} id='TextParent'/>
				
				<SVGAppNew top={697} left={150} zIndex={1} id='svgOriginalCircle' shape='circle' showOptions='hidden'/>
				<SVGAppNew top={697} left={96} zIndex={1} id='svgOriginalRect' shape='rect' showOptions='hidden'/>
				<SVGAppNew top={697} left={30} zIndex={1} id='svgOriginalEllipse' shape='ellipse' showOptions='hidden'/>

				<button onClick={this.onTemplateLoad.bind(this, source1)}><img src={source1} width="28" height="28"/>Template1</button>
	        	<button onClick={this.onTemplateLoad.bind(this, source2)}><img src={source2} width="28" height="28"/>Template2</button>
			</div>	
		);
	}
}

NavigationBar.propTypes={
	setTemplateSource: PropTypes.func.isRequired
}