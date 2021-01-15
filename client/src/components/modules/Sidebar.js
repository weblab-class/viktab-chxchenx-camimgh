// how to create menu bar that slides out: https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm

import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const visibility = this.props.sidebarVisibility ? "Sidebar-show" : "Sidebar-hide";
    console.log(visibility);

    return (
      <div className={visibility}>
          Hi this is my sidebar lol
      </div>
    );
  }
}

export default Sidebar;