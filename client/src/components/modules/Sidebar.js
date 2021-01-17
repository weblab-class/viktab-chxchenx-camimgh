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

  render() {
		const visibility = this.props.sidebarVisibility ? "Sidebar-show" : "Sidebar-hide";

    return (
			<>
			<div className={visibility}>
				{this.props.user ? 
				this.props.user.boards.map((boardid) => {
					return <BoardCard boardid={boardid} handleClickBoard={this.props.handleClickBoard} className="createBoard" />
				}) : <div> Could not find user :( </div>}
				<div onClick={this.clickedCreateBoard} className="createBoard">
						+ Create a new board
				</div>
      </div>
			< NewBoard 
				show={this.state.showCreate}
				user={this.props.user}
				/>
			</>
    );
  }
}

export default Sidebar;