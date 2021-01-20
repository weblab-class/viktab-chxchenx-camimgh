import React, { Component } from "react";
import { get } from "../../utilities";

import Task from "./Task.js";
import "./TasksBlock.css";

class TasksBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      gotUser: false,
      user: this.props.user
    }
  }

  componentDidUpdate() {
    if (this.props.user != this.state.user) {
      const taskIds = this.props.user.tasks;
      const promises = taskIds.map((taskId) => {
        return get(`/api/task`, {taskid: taskId});
      })
      Promise.all(promises).then((tasks) => {
        this.setState({
          tasks: tasks,
          gotUser: true,
          user: this.props.user
        })
      });
    }
  }

  render() {
    return (
      <div className="tasksBlock">
          {this.state.tasks.map((task) => (
            <Task
              task={task}
              boards={this.props.boards}
              clickedTask={()=>{}}
              clickedDone={(event) => {this.props.clickedDone(task)}}
              in="home"
            />
          ))}
      </div>
    );
  }
}

export default TasksBlock;