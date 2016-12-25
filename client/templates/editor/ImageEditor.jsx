import React, {Component} from 'react';
import ImageUpload from './UploadImage.jsx';
import NavigationBar from './NavigationBar';

export default class ImageEditor extends Component{
	constructor(props){
		super(props);
		this.state={
			templateSource:0
		}
		this.handleTemplateSource = this.handleTemplateSource.bind(this);
	}

	handleTemplateSource(source){
		this.setState({
			templateSource:source
		});
	}

	componentDidUpdate(){
		console.log(this.state.templateSource);
	}

	render(){
		return(
			<table class= "search_image" style={{height:"500px"}}>
			    <legend id = "image_Header" style={{textAlign:"left"}}>
			    	Image
		        </legend>
				
				<tr>
					<td>
						<ImageUpload templateSource={this.state.templateSource}/>
					</td>
				</tr>
				
				<tr>
					<td>
						<NavigationBar setTemplateSource={this.handleTemplateSource}/>
					</td>
				</tr>		
			</table>
		);
	}
}