import React, { Component } from "react";

import { post } from "../../utilities";

import "./NewTask.css";
import "./modal.css";

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: undefined
    }
  }

  clickedCreate = () => {
    // create task and add to db then add it's id to this column and board (?)
    const nameInput = document.getElementById("newTaskName");
    const name = nameInput.value;

    const columnInput = document.getElementById("columns");
    const column = columnInput.value;

    const board = this.props.board._id;

    post("/api/task", {name: name}).then((task) => {
      post("/api/addtask", {column: column, task: task._id, board: board}).then(() => {
        this.props.madeTask();
      });
    });
  };

  render() {
    const className = this.props.show ? "NewTask-containerVisible" : "NewTask-containerHidden";
    return (
      <div className={className}>
        <div className="modalTitle">
					CREATE A NEW TASK
				</div>
        <div className="modalField">
					<input placeholder="task name..." type="text" id="newTaskName" name="newTaskName" required=" " />
				</div>
        <div>
          <label className="modalSubtitle">Column</label>
          <div className="columnSelect">
            <select name="columns" id="columns">
              {this.props.columns ? this.props.columns.map((column) => {
                return <option value={column._id}>{column.name}</option>
              }) : <option value={"0"}>No options found :(</option>}
            </select>
          </div>
        </div>
        <div className="modalButtons">
          <input type="submit" value="Create" onClick={this.clickedCreate}/>
          <input type="submit" value="Cancel" onClick={this.props.clickedCancel} className="secondButton" />
        </div>
      </div>
    );
  }
}

export default NewTask;