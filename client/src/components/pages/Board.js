import React, { Component } from "react";
import { post, get } from "../../utilities";
import { navigate } from "@reach/router";

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
    let colPromises = this.state.board.columns.map((column) => {
      return get("/api/column", {columnid:column});
    });
    Promise.all(colPromises).then((columns) => {
      this.setState({columns: columns});
    });
    let taskPromises = this.state.board.tasks.map((task) => {
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
      this.setState({columns: columns.filter((col,index,arr)=>arr.findIndex(t=>(t._id === col._id))===index)});
      let taskPromises = [];
      for (const column of columns) {
        for (const task of column.tasks) {
          taskPromises.push(get("/api/task", {taskid:task}))
        }
      }
      Promise.all(taskPromises).then((tasks) => {
        this.setState({tasks: tasks.filter((task,index,arr)=>arr.findIndex(t=>(t._id === task._id))===index), showCreate: false});
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
      showEditTask: false,
      currTask: undefined
    })
  }

  updateTask = (task, updates) => {
    let oldColumn = undefined;
    for (const col of this.state.columns) {
      if (col.tasks.indexOf(task._id) > -1) {
        oldColumn = col;
      }
    }
    const column = oldColumn._id === updates.column ? undefined : updates.column;

    const body = {
      task: task._id,
      name: updates.name,
      description: updates.description,
      date: updates.date,
      oldcolumn: oldColumn._id,
      newcolumn: column,
      assignUser: updates.assigned ? this.state.user._id : undefined
    }
    post("/api/updatetask", body).then(() => {
      this.madeTask();
      this.setState({
        showEditTask: false
      });
    })
  }

  deleteTask = (task) => {
    let column = undefined;
    for (const col of this.state.columns) {
      if (col.tasks.indexOf(task._id) > -1) {
        column = col;
      }
    }
    post("/api/deletetask", {
      task: task._id,
      board: this.props.boardId,
      column: column._id
    }).then(() => {
      this.updateBoard();
      this.setState({
        showEditTask: false
      });
    })
  }

  leaveBoard = () => {
    post("/api/leaveboard", {user: this.state.user._id, board: this.state.board._id}).then(() => {
      navigate(`/home/${this.state.user._id}`);
    });
  }

  removeBoard = () => {
    const users = this.state.board.users;
    post("/api/removeboard", {board: this.state.board._id, users: users}).then(() => {
      navigate(`/home/${this.state.user._id}`);
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
        <div>
          Invite your friends to join this board! Link: {`singularity-app.herokuapp.com/invite/${this.props.boardId}`}
        </div>
        <input type="submit" value="Leave board" onClick={this.leaveBoard}/>
        <input type="submit" value="Delete board" onClick={this.removeBoard}/>
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
