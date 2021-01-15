import React, { Component } from "react";
import { navigate } from "@reach/router";
import { post } from "../../utilities";

import "./NewBoard.css";

class NewBoard extends Component {
  constructor(props) {
		super(props);
	}
	
	clickedCreate = () => {
		const boardNameInput = document.getElementById("boardName");
		const boardName = boardNameInput.value;
		const userId = this.props.user._id;
		const body = {
			name: boardName,
			user: userId
		};
		post("/api/board", body).then((board) => {
			navigate(`/board/${board._id}`);
		});
	}

  render() {
		const className = this.props.show ? "NewBoard-containerVisible" : "NewBoard-containerHidden";
    return (
      <div className={className}>
				<div>
					New Board
				</div>
				<div>
					Board name: 
				</div>
				<input type="text" id="boardName" name="boardName" />
				<input type="submit" value="Create" onClick={this.clickedCreate}/>
      </div>
    );
  }
}

export default NewBoard;