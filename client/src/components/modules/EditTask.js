import React, { Component } from "react";

import "./EditTask.css";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: undefined,
      gotTask: false,
      gotColumn: false,
      name: "",
      description: "",
      points: 1,
      date: "2000-01-01",
      assigned: false
    }
  }

  componentDidUpdate() {
    if (!this.state.gotTask && this.props.task) {
      this.setState({
        gotTask: true,
        name: this.props.task.name,
        description: this.props.task.description,
        points: this.props.task.points,
        assigned: this.props.task.assignees.indexOf(this.props.user._id) > -1
      })
    }
    if (!this.state.gotColumn && this.props.columns.length > 0 && this.props.task) {
      let currCol = "";
      for (const col of this.props.columns) {
        if (col.tasks.indexOf(this.props.task._id) > -1) {
          currCol = col._id;
        }
      }
      this.setState({
        gotColumn: true,
        column: currCol
      })
    }
  }

  clickedUpdate = () => {
    // create task and add to db then add it's id to this column and board
    const body = {
      name: this.state.name,
      description: this.state.description,
      assigned: this.state.assigned,
      column: this.state.column,
      points: this.state.points,
      date: this.state.date
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
      gotTask: false,
      gotColumn: false
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
          <select
            name="columns"
            id="columns"
            value={this.state.column}
            onChange={(event) => {
              console.log(event.target.value);
              this.setState({
                column: event.target.value
              })
            }}
          >
            {this.props.columns.map((column) => {
              return <option value={column._id}>{column.name}</option>
            })}
          </select>
        </div>
        <div className="taskField">
          <input
            type="number"
            id="points"
            name="points"
            value = {this.state.points}
            onChange={(event) => {
              this.setState({
                points: event.target.value
              });
            }}
          />
          <label>Points</label>
        </div>
        <div className="taskField">
					<input
            type="date"
            id="taskDate"
            name="taskDate"
            required=" "
            value = {this.state.date}
            onChange={(event) => {
              this.setState({
                date: event.target.value
              });
            }}
            onInput={(event) => {
              this.setState({
                date: event.target.value
              });
            }}
          />
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