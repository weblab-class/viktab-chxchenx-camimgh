import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "446929003533-4jh7789n5u1mg5iccv6mde8mhidunqkv.apps.googleusercontent.com";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="Navbar-countainer">
        <span>
				{this.props.userId ? (
					<GoogleLogout
						clientId={GOOGLE_CLIENT_ID}
						buttonText="Logout"
						onLogoutSuccess={this.props.handleLogout}
						onFailure={(err) => console.log(err)}
						className="NavBar-link NavBar-login"
					/>
				) : (
					<GoogleLogin
						clientId={GOOGLE_CLIENT_ID}
						buttonText="Login"
						onSuccess={this.props.handleLogin}
						onFailure={(err) => console.log(err)}
						className="NavBar-link NavBar-login"
					/>
				)}
        </span>
				<span>
					Insert logo here
				</span>
				<span>
					Insert title here
				</span>
				<span>
					Insert profile pic here
				</span>
      </nav>
    );
  }
}

export default Navbar;