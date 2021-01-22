import React, { Component } from "react";
import { get, post } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import EditProfile from "../modules/EditProfile.js";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
	constructor(props) {
	super(props);
	this.state = {
			user: undefined,
			showEdit: false
		};
	}

	componentDidMount() {
		document.title = "Profile Page";
		get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
	}

	clickedEdit = (event) => {
		this.setState({
			showEdit: true
		});
	}

	updateUser = (updates) => {
		const body = {
			user: this.props.userId,
			bio: updates.bio,
			planet: updates.planet
		};
		post("/api/updateuser", body);
		this.setState({
			showEdit: false
		});
	}

	clickedCancel() {
		this.setState({
			showEdit: false
		});
	}

	render () {
		const userName = this.state.user ? this.state.user.name : "user.name";
		const points = this.state.user ? this.state.user.points : "user.points";
		const bio = this.state.user ? this.state.user.bio : "user.bio";
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
				<EditProfile 
          show={this.state.showEdit}
          user={this.state.user}
          updateUser={this.updateUser}
          clickedCancel={this.clickedCancel}
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
					Bio
				</div>
				<div>
					{bio}
				</div>
				<input type="submit" value="Edit" onClick={this.clickedEdit}/>
			</div>
		)
	}
}

export default Profile;