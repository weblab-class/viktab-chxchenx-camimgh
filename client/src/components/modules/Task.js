import React, { Component } from "react";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  clicked = () => {
    this.props.clickedTask(this.props.task);
  }

  render() {
    return (
      <div className="task" onClick={this.clicked}>
          {this.props.task.name}
      </div>
    );
  }
}

export default Task;