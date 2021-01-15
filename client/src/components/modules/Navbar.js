import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Navbar.css";

const GOOGLE_CLIENT_ID = "446929003533-4jh7789n5u1mg5iccv6mde8mhidunqkv.apps.googleusercontent.com";

class Navbar extends Component {
  constructor(props) {
    super(props);
	}

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-linkContainer u-inlineBlock">
			{this.props.userId ? (
				<GoogleLogout
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Logout"
				onLogoutSuccess={this.props.handleLogout}
				onFailure={(err) => console.log(err)}
				className="NavBar-link NavBar-login"
				/>
			) : (
				<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Login"
				onSuccess={this.props.handleLogin}
				onFailure={(err) => console.log(err)}
				className="NavBar-link NavBar-login"
				/>
			)}
			<span className="NavBar-text">
				Home
			</span>
		</div>
		<div className="title u-inlineBlock">
			{this.props.title}
		</div>
		<div className="NavBar-linkContainer u-inlineBlock">
			{this.props.userId && (
					<Link to={`/profile/${this.props.userId}`} className="NavBar-link">
						Profile
					</Link>
				)}
		</div>
		<span className="NavBar-link" onClick={this.props.handleClickProfile}>
			Toggle Boards
		</span>
      </nav>
    );
  }
}

export default Navbar;