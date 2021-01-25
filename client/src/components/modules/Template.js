import React, { Component } from "react";
import './Template.css';

class Template extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span onClick = {()=> {this.props.selectedTemplate(this.props.columns)}} >
          <div className="template">
            {this.props.name} ({this.props.columns})
          </div>
      </span>
    );
  }
}

export default Template;