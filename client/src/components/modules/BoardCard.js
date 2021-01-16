import React, { Component } from "react";
import { navigate } from "@reach/router";

import { get } from "../../utilities";

class BoardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: undefined
    }
  }

  componentDidMount() {
    console.log("boardid: " + this.props.boardid);
    get(`/api/board`, { boardid: this.props.boardid }).then((board) => this.setState({ board: board }));
  }

  clicked = () => {
    navigate(`/board/${this.props.boardid}`);
  }

  render() {
    return (
      <div onClick={this.clicked}>
          {this.state.board ? this.state.board.name : "board.name"}
      </div>
    );
  }
}

export default BoardCard;