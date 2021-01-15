// how to create menu bar that slides out: https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm

import React, { Component } from "react";

import BoardCard from "./BoardCard.js";
import NewBoard from "./NewBoard.js";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
		super(props);
	}

  render() {
		const visibility = this.props.sidebarVisibility ? "Sidebar-show" : "Sidebar-hide";
		console.log(this.props.user);

    return (
      <div className={visibility}>
				{this.props.user ? 
				this.props.user.boards.map((boardid) => {
					<BoardCard boardid={boardid} />
				}) : <div> Could not find user :( </div>}
				<div>
						Create a new board
				</div>
      </div>
    );
  }
}

export default Sidebar;