import React, { Component } from "react";

import Navbar from "../modules/Navbar.js";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO make a tasksList like the storiesList in catbook
    return (
      <>
      <Navbar 
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        userId={this.userId}
      />
      <div >
          And your tasks will go here (when we get to that)
      </div>
      </>
    );
  }
}

export default Home;