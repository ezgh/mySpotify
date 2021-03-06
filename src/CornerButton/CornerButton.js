import React from "react";
import Spotify from "../util/Spotify";
import "./CornerButton.css";
import SpotityIcon from "../static/spotify_icon-white.png";

class CornerButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: [],
    };

    this.loginSpotify = this.loginSpotify.bind(this);
    this.getId = this.getId.bind(this);
    this.logoutSpotify = this.logoutSpotify.bind(this);

    // Checking the parent component, if there is a login cookie, change the state to loggedIn
    if (this.props.cookieLoginData) {
      this.state.loggedIn = true;
      this.getId();
    }
  }
  // Logging in to Spotify, changing states and getting the User ID & Picture
  loginSpotify() {
    if (!this.state.loggedIn) {
      this.setState({ loggedIn: true });
    }
    Spotify.getAccessToken();
    this.getId();
    this.props.loggedIn(true);
  }
  // Reverting login
  logoutSpotify() {
    Spotify.deleteCookie();
    this.setState({ loggedIn: false });
    this.setState({ usernema: [] });
    this.props.loggedIn(false);
  }
  // Async function to get user ID while making another API call
  async getId() {
    const token = Spotify.getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    this.setState({ username: [json.id, json.images[0].url] });
    Spotify.makeId(json.id);
  }
  // render method depending on the loggedIn state
  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <button
            type="button"
            className="btn btn-success my-2 my-sm-0 login-spotify"
            onClick={this.loginSpotify}
          >
            <span className="button-text">
              <img src={SpotityIcon} alt="Spotify" className="spotify-icon" />
              Login with Spotify
            </span>
          </button>
        </div>
      );
    } else {
      return (
        <div className="loggedIn">
          <img
            src={this.state.username[1]}
            className="roundedImage"
            alt="profile"
          ></img>
          <p className="username">{this.state.username[0]}</p>
          <button
            type="button"
            className="btn btn-success my-2 my-sm-0 login-spotify"
            onClick={this.logoutSpotify}
          >
            <span className="button-text">Logout</span>
          </button>
        </div>
      );
    }
  }
}

export default CornerButton;
