import React, { Component } from "react";

class BoardCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    get(`/api/board`, { boardid: this.props.boardid }).then((board) => this.setState({ board: board }));
  }

  render() {
    return (
      <div >
          Hi this is a board card lol
      </div>
    );
  }
}

export default BoardCard;