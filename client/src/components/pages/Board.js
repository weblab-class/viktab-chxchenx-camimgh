import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import Column from "../modules/Column.js";
import Sidebar from "../modules/Sidebar.js";

class Board extends Component {
  constructor(props) {
		super(props);
		this.state = {
      board: undefined,
      user: undefined
		}
  }

  componentDidMount() {
    get(`/api/board`, { boardid: this.props.boardId }).then((board) => {
      this.setState({ board: board });
    });
    get(`/api/user`, { userid: this.props.userId }).then((user) => {
      this.setState({ user: user })
    });
  }

  render() {
    const columns = this.state.board ? this.state.board.columns.map((column) => {
      return (<Column columnId={column}/>)
    }) : (<div> We could not find this board in the database :( </div>);
    return (
        <>
        <Navbar 
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          handleClickHome={this.props.handleClickHome}
          handleShowBoards={this.props.handleShowBoards}
          userId={this.props.userId}
          title={this.state.board ? this.state.board.name : "board.name"}
        />
        {columns}
        <Sidebar 
          sidebarVisibility={this.props.showBoards}
          user={this.state.user} 
        />
        </>
    );
  }
}

export default Board;
