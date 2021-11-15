import React from "react";
import Episode from "./Episode";

function SelectedShowContainer(props) {

  function mapSeasons() {
    if (!!props.allEpisodes) {
      let seasons = props.allEpisodes.map((e) => e.season).unique();
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
    return props.allEpisodes.map((e) => {
      if (e.season === parseInt(props.selectedSeason, 10)) {
        return <Episode myEpisode={e} key={e.id} />;
      }
      return true; //'expects value to be returned at end of arrow function
    });
  }

  function handleSelectionChange(e) {
    // console.log(e.target.value)
    props.setSelectedSeason(e.target.value);
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
      <select style={{ display: "block" }} onChange={handleSelectionChange} value={props.selectedSeason}>
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
