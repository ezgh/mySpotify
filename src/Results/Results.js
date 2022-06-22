import React from "react";
import "./Results.css";

const Results = ({ results }) => {
  const checkType = (data) => {
    try {
      const genres = data[0].genres;
      if (genres) {
        return renderArtists(data);
      } else {
        return renderTracks(data);
      }
    } catch {
      return renderArtists(data);
    }
  };

  const renderArtists = (data) => {
    let new_results = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const number = index + 1;
      let additional = "";
      let genres = element.genres.slice(0, 3);
      genres.forEach((genre) => {
        additional += genre + " ";
      });
      try {
        let image = element.image[0].url;
        let obj = {
          name: element.name,
          image: image,
          link: element.link,
          number: number,
          additional: additional,
        };
        new_results.push(obj);
      } catch {
        let obj = {
          name: element.name,
          image: "https://pablik.s3.eu-west-3.amazonaws.com/no-image.jpg",
          link: element.link,
          number: number,
          additional: additional,
        };
        new_results.push(obj);
      }
    }

    return new_results;
  };

  const renderTracks = (data) => {
    let new_results = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const number = index + 1;
      let additional = "";
      const artistInfo = element.artists;
      if (artistInfo.length > 1) {
        artistInfo.forEach((artist) => {
          additional += artist.name + " & ";
        });
        additional = additional.substring(0, additional.length - 3);
      } else {
        artistInfo.forEach((artist) => {
          additional += artist.name;
        });
      }
      try {
        let image = element.image[0].url;
        let obj = {
          name: element.name,
          image: image,
          link: element.link,
          number: number,
          additional: additional,
        };
        new_results.push(obj);
      } catch {
        let obj = {
          name: element.name,
          image: "https://pablik.s3.eu-west-3.amazonaws.com/no-image.jpg",
          link: element.link,
          number: number,
          additional: additional,
        };
        new_results.push(obj);
      }
    }

    return new_results;
  };

  const newResults = checkType(results);

  return (
    <div className="mainResultDiv">
      {newResults.map((result) => (
        <div className="result" key={result.link}>
          <div className="card">
            <div className="row no-gutters">
              <div className="result-image">
                <img src={result.image} className="card-img" alt="result"></img>
              </div>
              <div className="card-body">
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  <h6 className="card-title">{result.name}</h6>
                  <p className="card-text">{result.additional}</p>
                </a>
                <h6 className="result-number">{result.number}</h6>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="message">
        <p>
          Check the source code{" "}
          <a
            href="https://github.com/ezgh/myspotify"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Results;
