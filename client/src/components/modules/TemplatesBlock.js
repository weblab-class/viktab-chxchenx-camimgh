import React, { Component } from "react";

import Template from "./Template.js";
import './TemplatesBlock.css';

class TemplatesBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Template 1"
    }
  }

  selectedTemplate = (template, columns) => {
    this.setState({
      selected: template
    });
    this.props.selectedTemplate(columns);
  }

  render() {
    return (
      <div className="templatesBlock">
        < Template 
          selectedTemplate={this.selectedTemplate}
          name="Template 1"
          columns={["Unassigned", "Assigned", "Done"]}
          selected={this.state.selected === "Template 1"}
        />
        < Template 
          selectedTemplate={this.selectedTemplate}
          name="Template 2"
          columns={["To-do", "Urgent", "Done"]}
          selected={this.state.selected === "Template 2"}
        />
      </div>
    );
  }
}

export default TemplatesBlock;