import React, { Component } from "react";
import "./Github.css";

class Github extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const url = "../images/github.png";
    return (
      <img
        className = "Github-container"
        src={url}
        onClick={() => {window.open("https://github.com/weblab-class/viktab-chxchenx-camimgh", "_blank");}}
      />
    )
  }
}

export default Github;