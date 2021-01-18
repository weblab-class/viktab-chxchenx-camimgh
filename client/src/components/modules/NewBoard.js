import React, { Component } from "react";
import { navigate } from "@reach/router";
import { post } from "../../utilities";

import TemplatesBlock from "./TemplatesBlock.js";
import "./NewBoard.css";

class NewBoard extends Component {
  constructor(props) {
		super(props);
		this.state = {
			template: []
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
				post("/api/addboard", {user: userId, board: board._id});
				navigate(`/board/${board._id}`);
			});
		});
	}

  render() {
		const className = this.props.show ? "NewBoard-containerVisible" : "NewBoard-containerHidden";
    return (
		<div className={className}>
			<div>
				<div className="u-textCenter">
					New Board
				</div>
				<div className="boardField">
					<input type="text" id="boardName" name="boardName" required=" " />
					<label>Board Name</label>
				</div>
				< TemplatesBlock selectedTemplate={this.selectedTemplate}/>
				<input type="submit" value="Create" onClick={this.clickedCreate}/>
				<input type="submit" value="Cancel" onClick={this.props.clickedCancel}/>
			</div>
		</div>
    );
  }
}

export default NewBoard;