import React, { Component } from "react";

import "./EditTask.css";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: undefined,
      selectedCol: undefined,
      gotTask: false,
      name: "",
      description: "",
      assigned: false
    }
  }

  componentDidUpdate() {
    if (!this.state.gotTask && this.props.task) {
      this.setState({
        gotTask: true,
        name: this.props.task.name,
        description: this.props.task.description,
        assigned: this.props.task.assignees.indexOf(this.props.user._id) > -1
      })
    }
  }

  updateCol = (event) => {
    this.setState({
      selectedCol: event.target.value
    });
  }

  clickedUpdate = () => {
    // create task and add to db then add it's id to this column and board
    const column = this.state.selectedCol;

    const dateInput = document.getElementById("taskDate");
    const date = dateInput.value;

    const body = {
      name: this.state.name,
      description: this.state.description,
      assigned: this.state.assigned,
      column: column,
      date: date
    };
    this.props.updateTask(this.props.task, body);
    this.clickedCancel();
  };

  clickedDelete = () => {
    this.props.deleteTask(this.props.task);
    this.clickedCancel();
  }

  clickedCancel = () => {
    this.setState({
      gotTask: false
    });
    this.props.clickedCancel();
  }

  render() {
    const className = this.props.show ? "EditTask-containerVisible" : "EditTask-containerHidden";
    return (
      <div className={className}>
        <div className="u-textCenter">
					Edit task
				</div>
        <div className="taskField">
          <input
            type="text"
            id="taskName"
            name="taskName"
            value = {this.state.name}
            onChange={(event) => {
              this.setState({
                name: event.target.value
              });
            }}
            />
					<label>Task Name</label>
				</div>
        <div className="taskField">
          <input
            type="text"
            id="taskDescription"
            name="taskDescription"
            value = {this.state.description}
            onChange={(event) => {
              this.setState({
                description: event.target.value
              });
            }}
            />
					<label>Task Description</label>
				</div>
        <div className="taskField">
          <input 
            type="checkbox"
            id="taskAssigned"
            name="taskAssigned"
            checked = {this.state.assigned}
            onChange={(event) => {
              this.setState({
                assigned: event.target.checked
              });
            }}
            />
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
        <input type="submit" value="Cancel" onClick={this.clickedCancel}/>
      </div>
    );
  }
}

export default EditTask;