import React, { Component } from "react";
import { navigate } from "@reach/router";
import { post } from "../../utilities";

import TemplatesBlock from "./TemplatesBlock.js";
import "./NewBoard.css";
import "./modal.css";

class NewBoard extends Component {
  constructor(props) {
		super(props);
		this.state = {
			template: [],
			name: ""
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
				post("/api/addboard", {user: userId, board: board._id}).then(() => {
					this.props.clickedCreate();
				});
				navigate(`/board/${board._id}`);
			});
		});
	}

	clickedCancel = () => {
		this.setState({
			name: ""
		});
		this.props.clickedCancel();
	}

  render() {
		const className = this.props.show ? "NewBoard-containerVisible" : "NewBoard-containerHidden";
    return (
		<div className={className}>
			<div>
				<div className="u-textCenter modalTitle">
					New Board
				</div>
				<div className="modalField">
					<input 
						placeholder="board name..."
						type="text" 
						id="boardName" 
						name="boardName" 
						required=" " 
						value={this.state.name}
						onChange={(event) => {
						this.setState({
							name: event.target.value
						});
						}}
						/>
				</div>
				<div className="modalSubtitle">
					Template
				</div>
				< TemplatesBlock selectedTemplate={this.selectedTemplate}/>
				<div className="modalButtons">
					<input type="submit" value="Create" onClick={this.clickedCreate}/>
					<input type="submit" value="Cancel" onClick={this.clickedCancel} className="secondButton" />
				</div>
			</div>
		</div>
    );
  }
}

export default NewBoard;