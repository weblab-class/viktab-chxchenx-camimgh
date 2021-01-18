import React, { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
          {this.props.task.name}
      </div>
    );
  }
}

export default Task;