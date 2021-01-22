import React, { Component } from "react";

import "./EditProfile.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      planet: "",
      gotUser: false
    }
  }

  componentDidUpdate() {
    if (!this.state.gotUser && this.props.user) {
      this.setState({
        gotUser: true,
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
    const className = this.props.show ? "EditProfile-containerVisible" : "EditProfile-containerHidden";
    return (
      <div className={className}>
        <div className="u-textCenter">
					Edit Profile
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