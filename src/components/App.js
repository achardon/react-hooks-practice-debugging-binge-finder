import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
//import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");

  useEffect(() => {
    // console.log(Adapter.getShows())
    // Adapter.getShows().then((shows) => setShows(shows));
    fetch("http://api.tvmaze.com/shows")
    .then(res => res.json())
    .then((shows) => setShows(shows));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  function handleFilter(e) {
    e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
  }

  function selectShow(show) {
    // Adapter.getShowEpisodes(show.id).then((episodes) => {
    //   setSelectedShow(show);
    //   setEpisodes(episodes);
    // });
    fetch(`https://hidden-eyrie-69734.herokuapp.com/http://api.tvmaze.com/shows/${show.id}/episodes`)
    .then(res => res.json())
    .then((episodes) => {
      setSelectedShow(show);
      setEpisodes(episodes);
      setSelectedSeason(1)
    })
  }

  console.log(selectedSeason)


  let displayShows = shows;
  if (filterByRating) {
    displayShows = displayShows.filter((s) => {
      return s.rating.average >= filterByRating;
    });
  }
  if (searchTerm) {
    displayShows = displayShows.filter((s) => {
      return s.name.toLowerCase().includes(searchTerm);
    })
  }

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {!!selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              allEpisodes={episodes}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={displayShows}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
