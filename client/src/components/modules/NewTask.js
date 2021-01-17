import React, { Component } from "react";

import "./NewTask.css";

class NewTask extends Component {
  constructor(props) {
    super(props);
  }

  clickedCreate() {
    console.log("clicked create")
  };

  render() {
    const className = this.props.show ? "NewTask-containerVisible" : "NewTask-containerHidden";
    console.log(this.props.show);
    return (
      <div className={className}>
        <div className="u-textCenter">
					New Task
				</div>
        <div className="boardField">
					<input type="text" id="boardName" name="boardName" required=" " />
					<label>Task Name</label>
				</div>
        <input type="submit" value="Create" onClick={this.clickedCreate}/>
      </div>
    );
  }
}

export default NewTask;