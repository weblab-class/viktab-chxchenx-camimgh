import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import Column from "../modules/Column.js";

class Board extends Component {
  constructor(props) {
		super(props);
		this.state = {
			board: undefined
		}
  }

  componentDidMount() {
    get(`/api/board`, { boardid: this.props.boardId }).then((board) => {
      this.setState({ board: board });
    });
  }

  render() {
    return (
        <>
        <Navbar 
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.userId}
          title={this.state.board ? this.state.board.name : "board.name"}
        />
        {this.state.board ? 
        	this.state.board.columns.map((column) => {
						<Column columnId={column} />
        }): <div> We could not find this board in the database :( </div>}
        </>
    );
  }
}

export default Board;
