import React, { Component } from "react";

class Template extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span onClick = {()=> {this.props.selectedTemplate(this.props.columns)}} >
          <div>
            {this.props.name}
          </div>
          <div>
            {this.props.columns}
          </div>
      </span>
    );
  }
}

export default Template;