import React, { Component } from "react";
import { get } from "../../utilities";

import Task from "./Task.js";

class TasksBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    get(`/api/userTasks`, { userid: this.props.userId }).then((tasks) => this.setState({ tasks: tasks }));
  }

  render() {
    return (
      <div >
          {this.state.tasks.map((task) => (
            <Task taskId={task}/>
          ))}
      </div>
    );
  }
}

export default TasksBlock;