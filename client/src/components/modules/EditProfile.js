import React, { Component } from "react";

import Planet from "../modules/Planet.js";

import "./EditProfile.css";
import "./modal.css";

const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
const points = [1, 5, 10, 15, 20, 25, 30, 35];

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      bio: "",
      planet: "",
      planets: [],
      addToCal: false,
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
        planets: this.props.user.planets,
        addToCal: this.props.user.addToCal
      });
    }
  }

  boughtPlanet = (planet, newPoints) => {
    let planets = [...this.props.user ? this.props.user.planets : []];
    if (planets.indexOf(planet) == -1) {
      planets.push(planet);
      this.setState({
        planets: planets
      });
    }
    this.props.boughtPlanet(planet, newPoints);
  }

  changePlanet = (planet) => {
    this.setState({
      planet: planet
    });
    this.props.changePlanet(planet);
  }

  clickedUpdate = () => {
    const body = {
      bio: this.state.bio,
      planet: this.state.planet,
      addToCal: this.state.addToCal
    };
    this.props.updateUser(body);
  };

  render() {
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
                currPlanet={this.state.planet}
                points={points[planets.indexOf(planet)]}
                userPoints={this.props.points}
                unlocked={this.state.planets.indexOf(planet) > -1}
                boughtPlanet={this.boughtPlanet}
                changePlanet={this.changePlanet}
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
        <div className="modalInlines">
          <div className="inlineLabel">
            Add events to Google Calendar?
          </div>
          <div className="inlineRight">
            <input
              type="checkbox"
              id="gcal"
              name="gcal"
              checked = {this.state.addToCal}
              onChange={(event) => {
                this.setState({
                  addToCal: event.target.checked
                });
              }}
              />
          </div>
        </div>
        <div className="modalButtons">
          <input type="submit" value="Save" onClick={this.clickedUpdate}/>
          <input type="submit" value="Cancel" onClick={this.props.clickedCancel} className="secondButton" />
        </div>
      </div>
    );
  }
}

export default EditProfile;