import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import TasksBlock from "../modules/TasksBlock.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
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
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        userId={this.userId}
        title={userName}
      />
      <TasksBlock userId={this.userId} />
      </>
    );
  }
}

export default Home;