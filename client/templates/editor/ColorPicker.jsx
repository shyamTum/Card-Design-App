import React, { Component, PropTypes } from 'react';
import { SketchPicker } from 'react-color';

//@author:saurabhNsingh
//@new color picker component
//@callback function returns the new color to parent

export let returnColor = '';

export function getColor(){
  console.log("comes here in getcolor");
  return(returnColor);
};

export default class ButtonExample extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayColorPicker: false,
      colorState:'#4f38c3'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event){
    this.setState({ displayColorPicker: true })
  };

  handleClose(event){
    this.setState({ displayColorPicker: false })
  };

  handleChange(color){
    returnColor = color.hex;
    this.setState({colorState: color});
    this.props.callbackParent(returnColor);
  };

  render() {
    const { left, top, id} = this.props;
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div className={id + " floating-buttons"}>
        <button type="button" className="btn btn-primary" onClick={ this.handleClick } >{id}</button>
        {
          this.state.displayColorPicker ? <div style={ popover }>
                                            <div style={ cover } onClick={ this.handleClose }/>
                                            <SketchPicker color={this.state.colorState} onChange={this.handleChange}/>
                                          </div> : null 
        }
      </div>
    )
  }
}

ButtonExample.propTypes = {
  id: PropTypes.any.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  callbackParent : PropTypes.func.isRequired
}