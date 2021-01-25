import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";
import { post } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

const GOOGLE_CLIENT_ID = "446929003533-4jh7789n5u1mg5iccv6mde8mhidunqkv.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidUpdate() {
    // Redirect to home page if logged in
    document.title = "Singularity";
    if (this.props.userId) {
      navigate(`/home/${this.props.userId}`);
    } 
  }

  render() {
    return (
      <div className="Skeleton-container">
        <div className="text-container">
          <img className="logo" src="images/logo.png" />
          <h1 className="textCenter">
            welcome to singularity.
          </h1>
          <div className="blurb">
            singularity is an easy-to-use collaborative event organizing platform. plan with your friends and grow your solar system!
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
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </>
      </div>
    );
  }
}

export default Skeleton;
