import React, { Component } from "react";
import { get } from "../../utilities";

import Task from "./Task.js";

class Column extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.column);
    return (
      <div>
      <h1>
        {this.props.column.name}
      </h1>
      {this.props.column.tasks.map((task) => {
          return <Task taskId={task} />
      })}
      </div>
    );
  }
}

export default Column;