import React, { Component } from "react";
import { post } from "../../utilities";

import "./GetCode.css";
import "./modal.css";

class GetCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    }
  }

  sendCode = () => {
    post("/api/usercode", {user: this.props.userId, code: this.state.code});
    this.props.sentCode();
  }

  render() {
    const className = this.props.show ? "GetCode-containerVisible" : "GetCode-containerHidden";
    return (
      <div className={className}>
        <div className="ep-title">
          To give singularity permission to add events to your google calendar, open the popup in another tab, follow the instructions, and then paste your code below.
				</div>
        <div className="modalField">
          <input
            type="text"
            id="code"
            name="code"
            onChange={(event) => {
              this.setState({
                code: event.target.value
              });
            }}
            />
				</div>
        <div className="modalButtons">
          <input type="submit" value="Send" onClick={()=>this.sendCode()}/>
        </div>
      </div>
    );
  }
}

export default GetCode;