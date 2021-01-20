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
          <h3>
            Assigned to:
          </h3>
          {this.props.task.assigneeNames.filter((name) => {
            return <div>{name}</div>
          })}
      </div>
    );
  }
}

export default Task;