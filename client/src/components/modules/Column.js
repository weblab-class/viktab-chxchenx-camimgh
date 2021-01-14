import React, { Component } from "react";
import { get } from "../../utilities";

import Task from "./Task.js";

class Column extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    get(`/api/column`, { columnid: this.props.columnId }).then((column) => this.setState({ column: column }));
  }

  render() {
    return (
      <>
      {this.state.column ? 
        this.state.column.tasks.map((task) => {
          <Task taskId={task} />
      }): <div> Loading... </div>}
      </>
    );
  }
}

export default Column;