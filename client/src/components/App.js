import React, { Component } from "react";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Home from "./pages/Home.js";
import Board from "./pages/Board.js";
import Invite from "./pages/Invite.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      showBoards:false
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
      navigate(`/home/${user._id}`);
    });
  };

  handleLoginBoard = (res, boardId) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id }).then(() => {
        post("/api/adduser", {board: boardId, user: user._id}).then(() => {
          navigate(`/board/${boardId}`);
        });
      })
    });
  }

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
    navigate("/")
  };

  handleClickHome = () => {
    navigate(`/home/${this.state.userId}`);
  }

  clickedShowBoard = () => {
    this.setState({
      showBoards: !this.state.showBoards
    });
  }

  render() {
    return (
      <>
        <Router>
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <Home 
            path="/home/:userId"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            handleClickHome={this.handleClickHome}
            handleShowBoards={this.clickedShowBoard}
            userId={this.state.userId}
            showBoards={this.state.showBoards}
          />
          <Board 
            path="/board/:boardId"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            handleClickHome={this.handleClickHome}
            handleShowBoards={this.clickedShowBoard}
            userId={this.state.userId}
            showBoards={this.state.showBoards}
          />
          <Invite 
            path="/invite/:boardId"
            handleLogin={this.handleLoginBoard}
            handleLogout={this.handleLogout}
            handleClickHome={this.handleClickHome}
            handleShowBoards={this.clickedShowBoard}
            userId={this.state.userId}
            showBoards={this.state.showBoards}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;