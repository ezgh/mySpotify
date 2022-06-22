import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Spotify from "./util/Spotify";
import Results from "./Results/Results";
import Toggle from "react-toggle";
import CornerButton from "./CornerButton/CornerButton";
import SavePlaylist from "./SavePlaylist/SavePlaylist";
import RecommendButton from "./RecommendButton/RecommendButton";

const App = () => {
  const [results, setResults] = useState([]);
  const [artistOrTrack, setArtistOrTrack] = useState(false);
  const [loggedIn, setLoggedIn] = useState(Spotify.checkExists());
  const [timeRange, setTimeRange] = useState(null);
  const [recommended, setRecommended] = useState(false);

  // If the url contains access token, then reload to login
  // This solution is temporary, I don't like it personally but it just works at the moment
  if (Spotify.assignAccessToken()) {
    window.location.reload();
  }

  // deciding logic for the toggle
  const handleArtistOrTrack = () => {
    if (!timeRange) {
      setTimeRange("long_term");
    }
    setArtistOrTrack(!artistOrTrack);
    getResults(timeRange, artistOrTrack);
  };
  // checking results depending on the toggle's value and time range. default time_range is long_term
  const getResults = (time_range, artistOrTrack) => {
    if (artistOrTrack) {
      Spotify.getArtists(time_range).then((results) => {
        setResults(results);
        setRecommended(false);
      });
    } else {
      Spotify.getTracks(time_range).then((results) => {
        setResults(results);
        setRecommended(false);
      });
    }
  };
  // receiving informatin from CornerButton component
  const updateloggedIn = (val) => {
    setLoggedIn(val);
  };
  const updateSongs = (val) => {
    setResults(val);
    setRecommended(true);
  };
  // make separate API call to get time_range
  const changeTimeline = (time_range) => {
    setTimeRange(time_range);
    getResults(time_range, !artistOrTrack);
  };
  // 1 month
  const checkShortTerm = () => {
    changeTimeline("short_term");
  };
  // 6 months
  const checkMediumTerm = () => {
    changeTimeline("medium_term");
  };
  // Account all time
  const checkLongTerm = () => {
    changeTimeline("long_term");
  };

  // creating button classes as variables
  let button1 = "btn";
  let button2 = "btn";
  let button3 = "btn";
  // changes the active button depending on what the time range is
  if (timeRange === "short_term") {
    button1 += " active-button";
  } else if (timeRange === "medium_term") {
    button2 += " active-button";
  } else if (timeRange === "long_term") {
    button3 += " active-button";
  }

  return (
    <div>
      <nav className="navbar darkNavBar">
        <span className="navbar-brand">mySpotify</span>
        <CornerButton loggedIn={updateloggedIn} cookieLoginData={loggedIn} />
      </nav>
      <div className="myContainer">
        <div className="container">
          <div className="controls">
            <div className="artist-track-toggle">
              <p>Artists &larr; </p>
              <label>
                <Toggle
                  defaultChecked={artistOrTrack}
                  icons={false}
                  disabled={!loggedIn}
                  onChange={handleArtistOrTrack}
                />
              </label>
              <p> &rarr; Tracks</p>
            </div>
            <br></br>
            <div className="buttons">
              <button
                className={button1}
                onClick={checkShortTerm}
                disabled={!loggedIn}
                active="true"
              >
                1 month
              </button>
              <button
                className={button2}
                onClick={checkMediumTerm}
                disabled={!loggedIn}
              >
                6 months
              </button>
              <button
                className={button3}
                onClick={checkLongTerm}
                disabled={!loggedIn}
              >
                All time
              </button>
              <br></br>
              <RecommendButton
                newSongs={updateSongs}
                artistOrTrack={artistOrTrack}
                time={timeRange}
                recommended={recommended}
              ></RecommendButton>
              <SavePlaylist
                artistOrTrack={artistOrTrack}
                time={timeRange}
                trackUris={results}
                recommended={recommended}
              />
            </div>
          </div>
        </div>
        <Results results={results} />
      </div>
    </div>
  );
};

export default App;
