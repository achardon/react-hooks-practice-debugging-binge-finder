import React, { useState } from "react";
import Episode from "./Episode";

function SelectedShowContainer(props) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  // console.log(props.allEpisodes)

  function mapSeasons() {
    if (!!props.allEpisodes) {
      let seasons = props.allEpisodes.map((e) => e.season).unique();
      console.log(seasons)
      return seasons.map((s) => {
        return (
          <option value={s} key={s}>
            Season {s}
          </option>
        );
      });
    }
  }

  function mapEpisodes() {
    console.log(selectedSeason)
    return props.allEpisodes.map((e) => {
      if (e.season === selectedSeason) {
        return <Episode myEpisode={e} key={e.id} />;
      }
      return true; //'expects value to be returned at end of arrow function
    });
  }

  function handleSelectionChange(e) {
    console.log(e.target.value)
    setSelectedSeason(e.target.value);
  }

  const selectedShow = props.selectedShow;
  // console.log(selectedShow)

  return (
    <div style={{ position: "static" }}>
      <h2>{selectedShow.name}</h2>
      <img src={selectedShow.image.medium} alt="" />
      <p dangerouslySetInnerHTML={{ __html: selectedShow.summary }}></p>
      <p>Premiered: {selectedShow.premiered}</p>
      <p>Status: {selectedShow.status}</p>
      <p>Average Rating: {selectedShow.rating.average}</p>
      <select style={{ display: "block" }} onChange={handleSelectionChange}>
        {mapSeasons()}
      </select>
      {mapEpisodes()}
    </div>
  );
}

export default SelectedShowContainer;

Array.prototype.unique = function () {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
