import React, { Component } from "react";

import Planet from "../modules/Planet.js";

import "./EditProfile.css";

const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
const points = [1, 5, 10, 15, 20, 25, 30, 35];

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      bio: "",
      planet: "",
      gotUser: false
    }
  }

  componentDidUpdate() {
    if (!this.state.gotUser && this.props.user) {
      this.setState({
        gotUser: true,
        user: this.props.user,
        bio: this.props.user.bio,
        planet: this.props.user.planet,
      });
    }
  }

  updatePlanet = (event) => {
    this.setState({
      planet: event.target.value
    });
  }

  clickedUpdate = () => {
    const body = {
      bio: this.state.bio,
      planet: this.state.planet
    };
    this.props.updateUser(body);
  };

  render() {
    const hasPlanets = this.state.user ? this.state.user.planets : [];
    const className = this.props.show ? "EditProfile-containerVisible" : "EditProfile-containerHidden";
    return (
      <div className={className}>
        <div className="ep-title">
					Edit Profile
				</div>
        <div className="editTitle">
          <label>Planet</label>
        </div>
        <div className="planetBuy">
          {planets.map((planet) => {
            return (
              <Planet
                planet={planet}
                points={points[planets.indexOf(planet)]}
                userPoints={this.props.points}
                unlocked={hasPlanets.indexOf(planet) > -1}
                boughtPlanet={this.props.boughtPlanet}
              />
            )
          })}
        </div>
					<div className="editTitle">Bio</div>
        <div className="editBio">
          <input
            type="text"
            id="bio"
            name="bio"
            value = {this.state.bio}
            onChange={(event) => {
              this.setState({
                bio: event.target.value
              });
            }}
            />
				</div>
        <br />
        <input type="submit" value="Save" onClick={this.clickedUpdate}/>
        <input type="submit" value="Cancel" onClick={this.props.clickedCancel} className="secondButton" />
      </div>
    );
  }
}

export default EditProfile;