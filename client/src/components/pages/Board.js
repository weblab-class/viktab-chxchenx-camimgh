import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import Column from "../modules/Column.js";
import Sidebar from "../modules/Sidebar.js";
import NewTask from "../modules/NewTask.js";
import EditTask from "../modules/EditTask.js";

import "./Board.css";

class Board extends Component {
  constructor(props) {
		super(props);
		this.state = {
      board: undefined,
      user: undefined,
      columns: [],
      tasks: [],
      currTask: undefined,
      showCreate: false,
      showEditTask: false
		}
  }

  componentDidMount() {
    get(`/api/board`, { boardid: this.props.boardId }).then((board) => {
      this.setState({ board: board });
      this.updateBoard(board);
    });
    get(`/api/user`, { userid: this.props.userId }).then((user) => {
      this.setState({ user: user })
    });
  }

  showDiffBoard = () => {
    get(`/api/board`, { boardid: this.props.boardId }).then((board) => {
      this.setState({ board: board, showBoards: false });
      this.updateBoard(board);
    });
  }

  updateBoard = (board) => {
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
  }

  newTask = () => {
    this.setState({showCreate: true});
  }

  madeTask = () => {
    let colPromises = this.state.board.columns.map((column) => {
      return get("/api/column", {columnid:column});
    });
    Promise.all(colPromises).then((columns) => {
      this.setState({columns: columns});
      let taskPromises = [];
      for (const column of columns) {
        for (const task of column.tasks) {
          taskPromises.push(get("/api/task", {taskid:task}))
        }
      }
      Promise.all(taskPromises).then((tasks) => {
        this.setState({tasks: tasks, showCreate: false});
      });
    });
  }

  clickedTask = (task) => {
    this.setState({
      currTask: task,
      showEditTask: true
    })
  }

  clickedCancelEdit = () => {
    this.setState({
      showCreate: false
    })
  }

  clickedCancelNew = () => {
    this.setState({
      showEditTask: false
    })
  }

  updateTask = (task, updates) => {

  }

  deleteTask = (task) => {

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
        <div>
          Invite your friends to join this board! Link: {`singularity-app.herokuapp.com/invite/${this.props.boardId}`}
        </div>
        <img src="../images/add.png" onClick={this.newTask}>
        </img>
        <div className="columnContainer">
          {this.state.columns.map((column) => {
            return (<Column 
              column={column}
              tasks={this.state.tasks.filter(task => column.tasks.indexOf(task._id) > -1)}
              clickedTask={this.clickedTask}
            />)
          })}
        </div>
        <Sidebar 
          sidebarVisibility={this.props.showBoards}
          handleClickBoard={this.showDiffBoard}
          user={this.state.user} 
        />
        <NewTask 
          show={this.state.showCreate}
          user={this.state.user}
          board={this.state.board}
          columns={this.state.columns}
          madeTask={this.madeTask}
          clickedCancel={this.clickedCancelEdit}
				/>
        <EditTask 
          show={this.state.showEditTask}
          task={this.state.currTask}
          columns={this.state.columns}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}
          clickedCancel={this.clickedCancelNew}
        />
        </>
    );
  }
}

export default Board;
