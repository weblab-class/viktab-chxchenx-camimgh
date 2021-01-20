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
    let div = "";
    if (this.props.in === "column") {
      div = (
        <div className="task" onClick={this.clicked}>
          {this.props.task.name}
          <h3>
            Assigned to:
          </h3>
          {this.props.task.assigneeNames.filter((name) => {
            return <div>{name}</div>
          })}
          {this.props.column.name != "Done" ? (<input type="submit" value="Done" onClick={this.props.clickedDone}/>) : ""}
        </div>
      )
    } else {
      let boardName = "board";
      for (const board of this.props.boards) {
        if (board.tasks.indexOf(this.props.task._id) > -1) {
          boardName = board.name;
        }
      }
      div = (
        <div className="task">
          <h3>
          {boardName}
          </h3>
          <div>
          {this.props.task.name}
          </div>
          <input type="submit" value="Done" onClick={this.props.clickedDone}/>
      </div>
      );
    }
    return div;
  }
}

export default Task;