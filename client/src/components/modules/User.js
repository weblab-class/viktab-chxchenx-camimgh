import React, { Component } from "react";
import { get } from "../../utilities";
import { navigate } from "@reach/router";

import "./User.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    }
  }

  componentDidMount() {
    get(`/api/user`, { userid: this.props.userId }).then((user) => {
      this.setState({
        user: user
      });
    });
  }

  clicked = (event) => {
    const editable = this.props.myUserId === this.props.userId;
    navigate(`/profile/${this.props.userId}`, {state: {editable: editable, myUserId: this.props.myUserId}});
  }

  render() {
    const url = "../images/" + (this.state.user ? this.state.user.planet : "Mercury") + ".png";
    const planet = (<img src={url}></img>)
    const name = this.state.user ? this.state.user.name : "User.name";
    return (
      <span onClick={this.clicked}>
        {planet}
        {name}
      </span>
    )
  }
}

export default User;