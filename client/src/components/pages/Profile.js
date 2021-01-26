import React, { Component } from "react";
import { get, post } from "../../utilities";

import Navbar from "../modules/Navbar.js";
import EditProfile from "../modules/EditProfile.js";
import GetCode from "../modules/GetCode.js";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
	constructor(props) {
	super(props);
	this.state = {
			user: undefined,
			bio: "",
			planet: "Mercury",
			showEdit: false,
			showCode: false
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

	getCode() {
		get("/api/code", {}).then((url) => {
			this.setState({showCode: true});
			window.open(url.url, "_blank");
		});
	}

	sentCode = () => {
		this.setState({showCode: false});
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
			planet: updates.planet,
			addToCal: updates.addToCal
		};
		if (updates.addToCal && this.state.user.code.length == 0) this.getCode();
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
				<div className="profileContainer">
					<img src={img}/>
					<div className="userName">
						{userName}
					</div>
					<div className="infoLine">
						<div className="info left">
							<div>POINTS</div>
						</div>
						<div className="info right">
							<div>{points}</div>
						</div>
					</div>
					<div className="infoLine">
						<div className="info left">
							<div>PLANET</div>
						</div>
						<div className="info right">
							<div>{this.state.planet}</div>
						</div>
					</div>
					<div className="infoLine left">
						BIO
					</div>
					<div className="bio">
						{this.state.bio}
					</div>
					<div className="modalButtons">
						<input type="submit" value="Edit" onClick={this.clickedEdit} className="editButton" />
					</div>
					<EditProfile 
						show={this.state.showEdit}
						user={this.state.user}
						points={points}
						updateUser={this.updateUser}
						clickedCancel={this.clickedCancel}
						boughtPlanet={this.boughtPlanet}
						changePlanet={this.changePlanet}
					/>
					<GetCode 
						userId={this.props.userId}
						show={this.state.showCode}
						sentCode={this.sentCode}
					/>
				</div>
				<input
            type="text"
            id="simplecode"
            name="simplecode"
            onChange={(event) => {
              this.setState({
                code: event.target.value
              });
            }}
          />
				<input type="submit" value="Send" onClick={()=> {post("/api/usercode", {user: this.props.userId, code: this.state.code});}}/>
			</div>
		)
	}
}

export default Profile;