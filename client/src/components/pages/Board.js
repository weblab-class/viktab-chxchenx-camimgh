import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import Column from "../modules/Column.js";
import Sidebar from "../modules/Sidebar.js";
import NewTask from "../modules/NewTask.js";

class Board extends Component {
  constructor(props) {
		super(props);
		this.state = {
      board: undefined,
      columns: [],
      tasks: [],
      user: undefined,
      showCreate: false
		}
  }

  componentDidMount() {
    get(`/api/board`, { boardid: this.props.boardId }).then((board) => {
      this.setState({ board: board });
      let colPromises = board.columns.map((column) => {
        return get("/api/column", {columnid:column});
      });
      Promise.all(colPromises).then((columns) => {
        this.setState({columns: columns});
      });
      let taskPromises = board.tasks.map((task) => {
        return get("/api/task", {taskid:task});
      });
      Promise.all(taskPromises).then((tasks) => {
        this.setState({tasks: tasks});
      });
    });
    get(`/api/user`, { userid: this.props.userId }).then((user) => {
      this.setState({ user: user })
    });
  }

  showDiffBoard = () => {
    get(`/api/board`, { boardid: this.props.boardId }).then((board) => {
      this.setState({ board: board, showBoards: false });
    });
  }

  newTask = () => {
    this.setState({showCreate: true});
  }

  madeTask = () => {
    let colPromises = this.state.columns.map((column) => {
      return get("/api/column", {columnid:column});
    });
    Promise.all(colPromises).then((columns) => {
      this.setState({columns: columns});
    });
    let taskPromises = board.tasks.map((task) => {
      return get("/api/task", {taskid:task});
    });
    Promise.all(taskPromises).then((tasks) => {
      this.setState({tasks: tasks});
    });
  }

  render() {
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
        <img src="../images/add.png" onClick={this.newTask}>
        </img>
        {this.state.columns.map((column) => {
          return (<Column 
            column={column}
            tasks={this.state.tasks.filter(task => column.tasks.indexOf(task._id) > -1)}
          />)
        })}
        <Sidebar 
          sidebarVisibility={this.props.showBoards}
          handleClickBoard={this.showDiffBoard}
          user={this.state.user} 
        />
        < NewTask 
          show={this.state.showCreate}
          user={this.state.user}
          board={this.state.board}
          columns={this.state.columns}
          madeTask={this.madeTask}
				/>
        </>
    );
  }
}

export default Board;
