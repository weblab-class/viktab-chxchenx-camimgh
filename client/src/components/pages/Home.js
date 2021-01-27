import React, { Component } from "react";
import { get, post } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import TasksBlock from "../modules/TasksBlock.js";
import Sidebar from "../modules/Sidebar.js";
import SidebarButton from "../modules/SidebarButton.js";
import Github from "../modules/Github.js";

import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      boards: []
    }
  }

  componentDidMount() {
    document.title = "Home";
    get(`/api/user`, { userid: this.props.userId }).then((user) => {
      const promises = user.boards.map((board) => {
        return get(`/api/board`, {boardid: board});
      })
      Promise.all(promises).then((boards) => {
        this.setState({
          user: user,
          boards: boards
        })
      });
    });
  }

  clickedDone = (task) => {
    let currBoard = undefined;
    for (const board of this.state.boards) {
      if (board.tasks.indexOf(task._id) > -1) {
        currBoard = board;
      }
    }

    const promises = currBoard.columns.map((column) => {
      return get(`/api/column`, {columnid: column});
    })
    Promise.all(promises).then((columns) => {
      let doneColumn = "";
      let oldColumn = "";
      for (const column of columns) {
        if (column.name === "Done") {
          doneColumn = column._id;
        }
        if (column.tasks.indexOf(task._id) > -1) {
          oldColumn = column._id;
        }
      }

      const body = {
        task: task._id,
        name: task.name,
        description: task.description,
        date: task.finishBy,
        oldcolumn: oldColumn,
        newcolumn: doneColumn,
        user: this.state.user._id,
        assignUser: undefined,
        assignUsername: undefined,
        unassignUser: this.state.user._id,
        unassignUsername: this.state.user.name,
      }
      post("/api/updatetask", body).then((user) => {
        this.setState({
          user: user
        })
      });
    });
  }

  render() {
    const userName = this.state.user ? this.state.user.name : "user.name";
    return (
      <div className="home">
        <Navbar 
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.state.user ? this.state.user._id : undefined}
          title={userName}
          handleClickHome={this.props.handleClickHome}
        />
        <div className="welcomeMessage">
          Welcome back to Singularity! Here are your assigned tasks:
        </div>
        <div>
          <TasksBlock 
            user={this.state.user}
            boards={this.state.boards}
            clickedDone={this.clickedDone}
          />
        </div>
        <Sidebar 
          sidebarVisibility={this.props.showBoards}
          handleClickBoard={() => {}}
          user={this.state.user} 
        />
        <SidebarButton
          show={this.props.showBoards}
          clicked={this.props.handleShowBoards}
        />
        <Github/>
      </div>
    );
  }
}

export default Home;