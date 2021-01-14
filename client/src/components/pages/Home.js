import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";

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
    // TODO make a tasksList like the storiesList in catbook
    return (
      <>
      <Navbar 
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        userId={this.userId}
        title={userName}
      />
      <div >
          And your tasks will go here (when we get to that)
      </div>
      </>
    );
  }
}

export default Home;