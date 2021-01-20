import React, { Component } from "react";
import "./SidebarButton.css";

class SidebarButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = this.props.show ? "SidebarButton-containerShowing" : "SidebarButton-containerHidden";
    const img = this.props.show ? "../images/right.png" : "../images/left.png"
    return (
      <div className={className} onClick={this.props.clicked}>
        <img className="SidebarButton-img" src={img} />
      </div>
    );
  }
}

export default SidebarButton;