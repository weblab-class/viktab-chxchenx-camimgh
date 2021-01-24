import React, { Component } from "react";
import { post, get } from "../../utilities";
import { navigate } from "@reach/router";

import Navbar from "../modules/Navbar.js";
import Column from "../modules/Column.js";
import Sidebar from "../modules/Sidebar.js";
import SidebarButton from "../modules/SidebarButton.js";
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
      document.title = board.name;
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
    const unassign = (!updates.assigned && task.assignees.indexOf(this.state.user._id) > -1);

    const body = {
      task: task._id,
      name: updates.name,
      description: updates.description,
      points: updates.points,
      date: updates.date,
      oldcolumn: oldColumn._id,
      newcolumn: column,
      user: this.state.user._id,
      assignUser: updates.assigned ? this.state.user._id : undefined,
      assignUsername: updates.assigned ? this.state.user.name : undefined,
      unassignUser: unassign ? this.state.user._id : undefined,
      unassignUsername: unassign ? this.state.user.name : undefined,
    }
    post("/api/updatetask", body).then((user) => {
      this.madeTask();
      this.setState({
        showEditTask: false
      });
    });
    if (this.state.user.addToCal && updates.date.substring(0, 10) != "2000-01-01") {
      const body = {
        auth: this.state.user.auth,
        name: updates.name,
        description: updates.description,
        date: updates.date.substring(0, 10)
      };
      post("/api/addToCal", body);
    }
  }

  doneTask = (task) => {
    let doneColumn = "";
    for (const col of this.state.columns) {
      if (col.name === "Done") {
        doneColumn = col._id;
      }
    }

    const updates = {
      name: task.name,
      description: task.description,
      date: task.date,
      assigned: false,
      column: doneColumn
    }
    this.updateTask(task, updates);

    post("/api/userpoints", {user: this.props.userId, points: this.state.user.points + task.points}).then((user) => {
      this.setState({
        user: user
      });
    });
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
    if (window.confirm("Are you sure you want to leave this board?")) {
      post("/api/leaveboard", {user: this.state.user._id, board: this.state.board._id}).then(() => {
        navigate(`/home/${this.state.user._id}`);
      });
    }
  }

  removeBoard = () => {
    if (window.confirm("Are you sure you want to remove this board?")) {
      const users = this.state.board.users;
      post("/api/removeboard", {board: this.state.board._id, users: users}).then(() => {
        navigate(`/home/${this.state.user._id}`);
      });
    }
  }

  render() {
    return (
      <div className="boardBody">
        <Navbar 
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          handleClickHome={this.props.handleClickHome}
          userId={this.props.userId}
          title={this.state.board ? this.state.board.name : "board.name"}
        />
        <div className="buttonBox">
          <div className="inviteLink">
            <span className="inviteMessage">INVITE YOUR FRIENDS TO JOIN THIS BOARD:</span>
            <br />
            {`singularity-app.herokuapp.com/invite/${this.props.boardId}`}
          </div>
          <input type="submit" value="LEAVE BOARD" onClick={this.leaveBoard}/>
          <input type="submit" value="DELETE BOARD" onClick={this.removeBoard} className="middleButton"/>
          <input type="submit" value="ADD TASK" onClick={this.newTask} />
        </div>
        <div className="columnContainer">
          {this.state.columns.map((column) => {
            return (<Column 
              column={column}
              tasks={this.state.tasks.filter(task => column.tasks.indexOf(task._id) > -1)}
              clickedTask={this.clickedTask}
              clickedDone={this.doneTask}
            />)
          })}
        </div>
        <Sidebar 
          sidebarVisibility={this.props.showBoards}
          handleClickBoard={this.showDiffBoard}
          user={this.state.user} 
        />
        <SidebarButton
          show={this.props.showBoards}
          clicked={this.props.handleShowBoards}
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
          user={this.state.user}
          task={this.state.currTask}
          columns={this.state.columns}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}
          clickedCancel={this.clickedCancelNew}
        />
      </div>
    );
  }
}

export default Board;
