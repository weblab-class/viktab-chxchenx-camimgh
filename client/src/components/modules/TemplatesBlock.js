import React, { Component } from "react";

import Template from "./Template.js";
import './TemplatesBlock.css';

class TemplatesBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="templatesBlock">
        < Template 
          selectedTemplate={this.props.selectedTemplate}
          name="name_1"
          columns={["Unassigned", "Assigned", "Done"]}
        />
        < Template 
          selectedTemplate={this.props.selectedTemplate}
          name="name_2"
          columns={["To-do", "Urgent", "Done"]}
        />
      </div>
    );
  }
}

export default TemplatesBlock;