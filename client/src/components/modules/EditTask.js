import React, { Component } from "react";

import { post } from "../../utilities";

import "./EditTask.css";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: undefined
    }
  }

  clickedUpdate = () => {
    // create task and add to db then add it's id to this column and board (?)
    const nameInput = document.getElementById("taskName");
    const name = nameInput.value;

    const descriptionInput = document.getElementById("taskDescription");
    const description = descriptionInput.value;

    const columnInput = document.getElementById("columns");
    const column = columnInput.value;

    const dateInput = document.getElementById("taskDate");
    const date = dateInput.value;

    const board = this.props.board._id;

    post("/api/task", {name: name}).then((task) => {
      post("/api/addtask", {column: column, task: task._id, board: board}).then(() => {
        this.props.madeTask();
      });
    });
  };

  clickedDelete = () => {

  }

  render() {
    const className = this.props.show ? "EditTask-containerVisible" : "EditTask-containerHidden";
    return (
      <div className={className}>
        <div className="u-textCenter">
					Edit task
				</div>
        <div className="taskField">
					<input type="text" id="taskName" name="taskName" required=" " placeholder = {this.props.task ? this.props.task.name : "task.name"} />
					<label>Task Name</label>
				</div>
        <div className="taskField">
					<input type="text" id="taskDescription" name="taskDescription" required=" " placeholder = {this.props.task ? this.props.task.description : "task.description"} />
					<label>Task Description</label>
				</div>
        <div>
          <label>Column</label>
          <select name="columns" id="columns">
            {this.props.columns.map((column) => {
              return <option value={column._id}>{column.name}</option>
            })}
          </select>
        </div>
        <div className="taskField">
					<input type="datetime-local" id="taskDate" name="taskDate" required=" " />
					<label>Finish By</label>
				</div>
        <input type="submit" value="Save" onClick={this.clickedUpdate}/>
        <input type="submit" value="Delete Task" onClick={this.clickedDelete}/>
      </div>
    );
  }
}

export default EditTask;