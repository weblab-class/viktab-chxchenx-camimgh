import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import TasksBlock from "../modules/TasksBlock.js";
import Sidebar from "../modules/Sidebar.js";
import SidebarButton from "../modules/SidebarButton.js";

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
        <TasksBlock 
          user={this.state.user}
          boards={this.state.boards}
        />
        <Sidebar 
          sidebarVisibility={this.props.showBoards}
          handleClickBoard={() => {}}
          user={this.state.user} 
        />
        <SidebarButton
          show={this.props.showBoards}
          clicked={this.props.handleShowBoards}
        />
      </div>
    );
  }
}

export default Home;