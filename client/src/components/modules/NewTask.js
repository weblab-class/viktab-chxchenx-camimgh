import React, { Component } from "react";


class NewTask extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <div className="u-textCenter">
					New Task
				</div>
        <div className="boardField">
					<input type="text" id="boardName" name="boardName" required=" " />
					<label>Task Name</label>
				</div>
      </div>
    );
  }
}

export default NewTask;