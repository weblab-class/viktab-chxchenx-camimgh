// how to create menu bar that slides out: https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm

import React, { Component } from "react";

import BoardCard from "./BoardCard.js";
import NewBoard from "./NewBoard.js";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
		super(props);
		this.state = {
			showCreate: false
		}
	}

	clickedCreateBoard = () => {
    this.setState({
      showCreate: true
    });
	}
	
	clickedCancel = () => {
		this.setState({
      showCreate: false
    });
	}

  render() {
		const visibility = this.props.sidebarVisibility ? "Sidebar-show" : "Sidebar-hide";

    return (
			<>
			<div className={visibility}>
				<div className="sideContainer">
					{this.props.user ? 
					this.props.user.boards.map((boardid) => {
						return <BoardCard boardid={boardid} handleClickBoard={this.props.handleClickBoard} />
					}) : <div> Could not find user :( </div>}
					<div onClick={this.clickedCreateBoard} className="createBoard">
							+ Create a new board
					</div>
				</div>
      		</div>
			<NewBoard 
				show={this.state.showCreate}
				user={this.props.user}
				clickedCreate={this.props.handleClickBoard}
				clickedCancel={this.clickedCancel}
				/>
			</>
    );
  }
}

export default Sidebar;