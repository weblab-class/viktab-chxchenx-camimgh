import React, { Component } from "react";
import { navigate } from "@reach/router";
import { post } from "../../utilities";

import TemplatesBlock from "./TemplatesBlock.js";
import "./NewBoard.css";

class NewBoard extends Component {
  constructor(props) {
		super(props);
		this.state = {
			template: ["done"]
		}
	}
	
	selectedTemplate = (columns) => {
		this.setState({
			template: columns
		});
	}
	
	clickedCreate = () => {
		const boardNameInput = document.getElementById("boardName");
		const boardName = boardNameInput.value;
		const userId = this.props.user._id;

		let colPromises = this.state.template.map((column) => {
			return post("/api/column", {name:column});
		});

		Promise.all(colPromises).then((columns) => {
			const columnIds = columns.map((column) => {
				return column._id;
			});
			const body = {
				name: boardName,
				user: userId,
				columns: columnIds
			};
			post("/api/board", body).then((board) => {
				navigate(`/board/${board._id}`);
			});
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
				<div>
					<input type="text" id="boardName" name="boardName" />
				</div>
				< TemplatesBlock selectedTemplate={this.selectedTemplate}/>
				<input type="submit" value="Create" onClick={this.clickedCreate}/>
      </div>
    );
  }
}

export default NewBoard;