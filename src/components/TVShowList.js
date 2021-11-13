import React from "react";
import { Grid } from "semantic-ui-react";
import TVShow from "./TVShow";

function TVShowList(props) {
  function mapAllShows() {
    if (!!props.searchTerm) {
      props.shows.map((s) => {
        if (s.name.toLowerCase().includes(props.searchTerm)) {
          return <TVShow show={s} key={s.id} selectShow={props.selectShow} />;
        }
        return true; //added this to satisfy '.map expects value returned at end of arrow function'
      });
    }
    return props.shows.map((s) => (
      <TVShow show={s} key={s.id} selectShow={props.selectShow} />
    ));
  }

  return (
    <div className="TVShowList">
      <Grid>{mapAllShows()}</Grid>
    </div>
  );
}

export default TVShowList;