import React, { Component } from "react";
import "./Planet.css";

class Planet extends Component {
  constructor(props) {
    super(props);
  }

  clicked = (event) => {
    if (!this.props.unlocked) {
      if (this.props.userPoints < this.props.points) {
        window.alert("You don't have enough points to get this planet yet! Complete more tasks to earn points and build your solar system.");
      } else if (window.confirm("Are you sure you want to buy " + this.props.planet + "? It'll cost you " + this.props.points + " points.")) {
        this.props.boughtPlanet(this.props.planet, this.props.userPoints - this.props.points);
      }
    } else if (this.props.planet != this.props.currPlanet) {
      if (window.confirm("Do you want to switch to this planet?")) {
        this.props.changePlanet(this.props.planet);
      }
    }
  }

  render() {
    const url = "../images/" + this.props.planet + ".png";
    const className = this.props.unlocked ? "Planet-unlocked" : "Planet-locked";
    const planet = (<img className = {className} src={url}></img>)
    return (
      <div onClick={this.clicked} className="planetContainer">
        {planet}<br />
        <span className="planetName">{this.props.planet}</span>
      </div>
    )
  }
}

export default Planet;