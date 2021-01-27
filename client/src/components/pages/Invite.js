import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";
import { post } from "../../utilities";

import Github from "../modules/Github.js";

import "../../utilities.css";
import "./Invite.css";

const GOOGLE_CLIENT_ID = "446929003533-4jh7789n5u1mg5iccv6mde8mhidunqkv.apps.googleusercontent.com";

class Invite extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidUpdate() {
    // Redirect to board page if already logged in
    if (this.props.userId) {
      post("/api/adduser", {board: this.props.boardId, user: this.props.userId}).then(() => {
        navigate(`/board/${this.props.boardId}`);
      });
    } 
  }

  handleLogin = (res) => {
    this.props.handleLogin(res, this.props.boardId);
  }

  render() {
    return (
      <div className="Skeleton-container">
        <div className="text-container">
          <div className="blurb">
            Someone has invited you to join their board! Please login to continue.
          </div>
        </div>
        <>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </>
      <Github/>
      </div>
    );
  }
}

export default Invite;
