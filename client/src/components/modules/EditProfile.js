import React, { Component } from "react";

import Planet from "../modules/Planet.js";

import "./EditProfile.css";

const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

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
        <div className="u-textCenter">
					Edit Profile
				</div>
        <div>
          <div className="taskField">
            <label>Planet</label>
          </div>
          {planets.map((planet) => {
            return (
              <Planet
                planet={planet}
                unlocked={hasPlanets.indexOf(planet) > -1}
                boughtPlanet={this.props.boughtPlanet}
              />
            )
          })}
        </div>
        <div className="taskField">
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
					<label>Bio</label>
				</div>
        <input type="submit" value="Save" onClick={this.clickedUpdate}/>
        <input type="submit" value="Cancel" onClick={this.props.clickedCancel}/>
      </div>
    );
  }
}

export default EditProfile;