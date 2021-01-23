import React, { Component } from "react";
import "./Planet.css";

class Planet extends Component {
  constructor(props) {
    super(props);
  }

  clicked = (event) => {
    console.log(this.props.planet);
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