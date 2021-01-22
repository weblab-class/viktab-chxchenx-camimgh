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
    let finishBy = "";
    if (this.props.task.finishBy && this.props.task.finishBy.substring(0, 10) != "2000-01-01") {
      finishBy = (
        <div>
          <h3>
            Finish by:
          </h3>
          <div>
            {this.props.task.finishBy.substring(0, 10)}
          </div>
        </div>
      )
    }
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
          {finishBy}
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
          {finishBy}
          <input type="submit" value="Done" onClick={this.props.clickedDone}/>
      </div>
      );
    }
    return div;
  }
}

export default Task;