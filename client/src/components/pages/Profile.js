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
		const points = this.state.user ? this.state.user.points : "user.points";
		const planet = this.state.user ? this.state.user.planet : "Mercury";
		const img = "../images/" + planet + ".png";
		return (
			<div>
				<Navbar 
					handleLogin={this.props.handleLogin}
					handleLogout={this.props.handleLogout}
					userId={this.state.user ? this.state.user._id : undefined}
					title={userName}
					handleClickHome={this.props.handleClickHome}
				/>
				<img src={img}/>
				<div>
					{userName}
				</div>
				<div>
					<span>
						Points
					</span>
					<span>
						{points}
					</span>
				</div>
				<div>
					<span>
						Planet
					</span>
					<span>
						{planet}
					</span>
				</div>
				<div>
					<span>
						Bio
					</span>
				</div>
			</div>
		)
	}
}

export default Profile;