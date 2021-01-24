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
			bio: "",
			planet: "Mercury",
			showEdit: false
		};
	}

	componentDidMount() {
		document.title = "Profile Page";
		get(`/api/user`, { userid: this.props.userId }).then((user) => {
			this.setState({
				user: user,
				bio: user.bio,
				planet: user.planet
			});
		});
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
			showEdit: false,
			bio: updates.bio,
			planet: updates.planet
		});
	}

	clickedCancel = (event) => {
		this.setState({
			showEdit: false
		});
	}

	boughtPlanet = (planet, newPoints) => {
		const body = {
			user: this.props.userId,
			points: newPoints,
			planet: planet
		}
		post("/api/addplanet", body).then((user) => {
			this.setState({
				user: user,
				planet: planet
			});
		})
	}

	changePlanet = (planet) => {
		post("/api/setplanet", {user: this.props.userId, planet: planet}).then((user) => {
			this.setState({
				user: user,
				planet: planet
			});
		})
	}

	render () {
		const userName = this.state.user ? this.state.user.name : "user.name";
		const points = this.state.user ? this.state.user.points : "user.points";
		const img = "../images/" + this.state.planet + ".png";
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
					points={points}
          updateUser={this.updateUser}
					clickedCancel={this.clickedCancel}
					boughtPlanet={this.boughtPlanet}
					changePlanet={this.changePlanet}
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
						{this.state.planet}
					</span>
				</div>
				<div>
					Bio
				</div>
				<div>
					{this.state.bio}
				</div>
				<input type="submit" value="Edit" onClick={this.clickedEdit}/>
			</div>
		)
	}
}

export default Profile;