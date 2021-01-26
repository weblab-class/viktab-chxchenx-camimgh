import React, { Component } from "react";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  clicked = (event) => {
    if (event.target.value != "Done") {
      this.props.clickedTask(this.props.task);
    }
  }

  render() {
    let finishBy = "";
    if (this.props.task.finishBy && this.props.task.finishBy.substring(0, 10) != "2000-01-01") {
      finishBy = (
        <div>
          <div className="labelText">
            Finish by:
          </div>
          <div className="descriptorText">
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
          <br />
          <div className="labelText">
            Assigned to:
          </div>
          <div className="descriptorText">
            {this.props.task.assigneeNames.filter((name) => {
              return <div>{name}</div>
            })}
          </div>
          {finishBy}
          {this.props.column.name != "Done" ? (<input type="submit" value="Done" onClick={this.props.clickedDone} className="doneBlock" />) : ""}
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
          <div className="flexleft">
            <div className="taskBoard">
              {boardName}
            </div>
            <div>
              {this.props.task.name}
            </div>
            {finishBy}
          </div>
          <div className="flexright">
            <input type="submit" value="Done" onClick={this.props.clickedDone} className="doneBlock" />
          </div>
      </div>
      );
    }
    return div;
  }
}

export default Task;