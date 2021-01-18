import React, { Component } from "react";

import { get } from "../../utilities";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: undefined
    }
  }

  componentDidMount() {
    get(`/api/task`, { taskid: this.props.taskId }).then((task) => {
      this.setState({ task: task })
    });
  }

  render() {
    return (
      <div >
          {this.state.task ? this.state.task.name : "Hi this is a task lol"}
      </div>
    );
  }
}

export default Task;