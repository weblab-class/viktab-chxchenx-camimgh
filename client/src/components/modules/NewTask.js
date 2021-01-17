import React, { Component } from "react";

import { get, post } from "../../utilities";

import "./NewTask.css";

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: undefined
    }
  }

  clickedCreate() {
    console.log("clicked create");
    // create task and add to db then add it's id to this column and board (?)
    const nameInput = document.getElementById("taskName");
    const name = nameInput.value;

    const columnInput = document.getElementById("columns");
    const column = columnInput.value;

    post("/api/task", {name: name}).then((task) => {
      post("api/column/addtask", {column: column, task: task._id});
    });
  };

  render() {
    const className = this.props.show ? "NewTask-containerVisible" : "NewTask-containerHidden";
    console.log(this.props.show);
    return (
      <div className={className}>
        <div className="u-textCenter">
					New Task
				</div>
        <div>
					<input type="text" id="taskName" name="taskName" required=" " />
					<label>Task Name</label>
				</div>
        <div>
          <select name="columns" id="columns">
            {this.props.columns ? this.props.columns.map((column) => {
              return <option value={column._id}>{column.name}</option>
            }) : <option value={"0"}>No options found :(</option>}
          </select>
          <label>Column</label>
        </div>
        <input type="submit" value="Create" onClick={this.clickedCreate}/>
      </div>
    );
  }
}

export default NewTask;