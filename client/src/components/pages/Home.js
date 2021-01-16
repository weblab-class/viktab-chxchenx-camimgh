import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import TasksBlock from "../modules/TasksBlock.js";
import Sidebar from "../modules/Sidebar.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    }
  }

  componentDidMount() {
    document.title = "Home";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  render() {
    const userName = this.state.user ? this.state.user.name : "user.name";
    return (
      <>
      <Navbar 
        handleLogin={this.props.handleLogin}
        handleLogout={this.props.handleLogout}
        handleShowBoards={this.props.handleShowBoards}
        userId={this.state.user ? this.state.user._id : undefined}
        title={userName}
        handleClickHome={this.props.handleClickHome}
      />
      <TasksBlock userId={this.userId} />
      <Sidebar 
        sidebarVisibility={this.props.showBoards}
        user={this.state.user} 
      />
      </>
    );
  }
}

export default Home;