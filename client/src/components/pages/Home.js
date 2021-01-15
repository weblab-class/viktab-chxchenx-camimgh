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
      showBoards:false
    }
  }

  componentDidMount() {
    document.title = "Home";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  clickedShowBoard = () => {
    this.setState({
      showBoards: !this.state.showBoards
    });
  }

  render() {
    const userName = this.state.user ? this.state.user.name : "user.name";
    return (
      <>
      <Navbar 
        handleLogin={this.props.handleLogin}
        handleLogout={this.props.handleLogout}
        userId={this.state.user ? this.state.user._id : undefined}
        title={userName}
        handleClickProfile={this.clickedShowBoard}
        handleClickHome={this.props.handleClickHome}
      />
      <TasksBlock userId={this.userId} />
      <Sidebar 
        sidebarVisibility={this.state.showBoards}
        user={this.state.user} 
      />
      </>
    );
  }
}

export default Home;