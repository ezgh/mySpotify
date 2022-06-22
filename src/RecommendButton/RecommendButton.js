import React from "react";
import Spotify from "../util/Spotify";
import "../CornerButton/CornerButton.css";

const RecommendButton = ({ time, recommended, newSongs }) => {
  const handleRecommend = async () => {
    const artists = await Spotify.getArtists(time, 10);
    const tracks = await Spotify.getTracks(time, 10);
    let songs = await Spotify.getRecommendations(artists, tracks);
    let arrangedValues = [];
    songs.tracks.forEach((track) => {
      let dict = {
        id: track.id,
        name: track.name,
        image: track.album.images,
        link: track.external_urls.spotify,
        artists: track.artists,
        uri: track.uri,
      };
      arrangedValues.push(dict);
    });
    newSongs(arrangedValues);
  };

  let hiddenButton = "btn";
  if (!time) {
    hiddenButton += " hidden";
  }
  if (recommended) {
    hiddenButton += " active-button";
  }

  return (
    <button type="button" className={hiddenButton} onClick={handleRecommend}>
      Recommend Me
    </button>
  );
};

export default RecommendButton;
