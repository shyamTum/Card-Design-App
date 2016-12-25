import React, {Component} from 'react';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ImageEditor from './ImageEditor';

export default class Editor extends Component{
	render(){
		return(
			<div class="container">
				<header>
					<h1>Editor</h1>
				</header>
				
				<fieldset class= "search_image" style={{border:"4px solid black",background:"#CCE5FF"}}>
					<ImageEditor/>
				</fieldset>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Editor);