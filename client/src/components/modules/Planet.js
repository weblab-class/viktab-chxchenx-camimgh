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
      } else if (window.confirm("Are you sure you want to buy this planet?")) {
        this.props.boughtPlanet(this.props.planet, this.props.userPoints - this.props.points);
      }
    }
  }

  render() {
    let planet = this.props.unlocked ? (<img src={"../images/" + this.props.planet + ".png"}></img>) :
        (<img src="../images/add.png"></img>);
    return (
      <span onClick={this.clicked}>
        {planet}
        {this.props.planet}
      </span>
    )
  }
}

export default Planet;