import React, { Component } from "react";
import "./Column.css"

import Task from "./Task.js";

class Column extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="column">
        <div className="columnTitle">
          {this.props.column.name}
        </div>
        <div className="taskBox">
          {this.props.tasks.map((task) => {
              return <Task
                task={task}
                column={this.props.column}
                clickedTask={this.props.clickedTask}
                clickedDone={(event) => {this.props.clickedDone(task)}}
                in="column"
                />
          })}
        </div>
      </div>
    );
  }
}

export default Column;