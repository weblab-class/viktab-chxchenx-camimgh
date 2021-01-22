import React, { Component } from "react";
import { get } from "../../utilities";

import Navbar from "../modules/Navbar.js";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
	constructor(props) {
	super(props);
	this.state = {
			user: undefined,
		};
	}

	componentDidMount() {
		document.title = "Profile Page";
		get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
	}

	render () {
		const userName = this.state.user ? this.state.user.name : "user.name";
		return (
			<div>
				<Navbar 
					handleLogin={this.props.handleLogin}
					handleLogout={this.props.handleLogout}
					userId={this.state.user ? this.state.user._id : undefined}
					title={userName}
					handleClickHome={this.props.handleClickHome}
				/>
				<div>
					Hi!
				</div>
			</div>
		)
	}
}

export default Profile;