import React, { Component } from "react";

import "./EditTask.css";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: undefined,
      selectedCol: undefined
    }
  }

  updateCol = (event) => {
    this.setState({
      selectedCol: event.target.value
    });
  }

  clickedUpdate = () => {
    // create task and add to db then add it's id to this column and board (?)
    const nameInput = document.getElementById("taskName");
    const name = nameInput.value;

    const descriptionInput = document.getElementById("taskDescription");
    const description = descriptionInput.value;

    const assignedInput = document.getElementById("taskDescription");
    const assigned = assignedInput.value;

    const column = this.state.selectedCol;

    const dateInput = document.getElementById("taskDate");
    const date = dateInput.value;

    const body = {
      name: name,
      description: description,
      assigned: assigned,
      column: column,
      date: date
    };
    this.props.updateTask(this.props.task, body);
  };

  clickedDelete = () => {
    this.props.deleteTask(this.props.task);
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
        <div className="taskField">
					<input type="checkbox" id="taskAssigned" name="taskAssigned" required=" " />
					<label>Assign yourself</label>
				</div>
        <div>
          <label>Column</label>
          <select name="columns" id="columns" onChange={this.updateCol}>
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
        <input type="submit" value="Cancel" onClick={this.props.clickedCancel}/>
      </div>
    );
  }
}

export default EditTask;