import React from "react";
import Spotify from "../util/Spotify";
import "./SavePlaylist.css";

const SavePlaylist = ({ artistOrTrack, recommended, time, trackUris }) => {
  const savePlaylist = () => {
    if (artistOrTrack || recommended) {
      const trackUris = createTrackUris();
      Spotify.savePlaylist(trackUris, time, recommended);
    }
  };

  const createTrackUris = () => {
    return trackUris.map((element) => element.uri);
  };

  let hiddenButton = "btn";
  if (!artistOrTrack) {
    hiddenButton += " hidden";
  }
  if (recommended) {
    hiddenButton = "btn";
  }

  return (
    <button type="button" onClick={savePlaylist} className={hiddenButton}>
      Save as a Playlist
    </button>
  );
};

export default SavePlaylist;
