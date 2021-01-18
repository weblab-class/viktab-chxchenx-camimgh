import React, { Component } from "react";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="task">
          {this.props.task.name}
      </div>
    );
  }
}

export default Task;