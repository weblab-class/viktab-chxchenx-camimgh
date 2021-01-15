import React, { Component } from "react";
import { get } from "../../utilities";

import Task from "./Task.js";

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: undefined
    };
  }

  componentDidMount() {
    get(`/api/column`, { columnid: this.props.columnId }).then((column) => this.setState({ column: column }));
  }

  render() {
    return (
      <div>
      <h1>
        {this.state.column ? this.state.column.name : "column.name"}
      </h1>
      {this.state.column ? 
        this.state.column.tasks.map((task) => {
          <Task taskId={task} />
      }): <div> Loading... </div>}
      </div>
    );
  }
}

export default Column;