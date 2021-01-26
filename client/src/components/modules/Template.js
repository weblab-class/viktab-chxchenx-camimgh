import React, { Component } from "react";
import './Template.css';

class Template extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = this.props.selected ? "template-selected" : "template";
    return (
      <span onClick = {()=> {this.props.selectedTemplate(this.props.name, this.props.columns)}} >
          <div className={className}>
            {this.props.name} ({this.props.columns.join(", ")})
          </div>
      </span>
    );
  }
}

export default Template;