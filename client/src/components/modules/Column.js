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
        <h1>
          {this.props.column.name}
        </h1>
        {this.props.tasks.map((task) => {
            return <Task
              task={task}
              clickedTask={this.props.clickedTask}
              in="column"
              />
        })}
      </div>
    );
  }
}

export default Column;