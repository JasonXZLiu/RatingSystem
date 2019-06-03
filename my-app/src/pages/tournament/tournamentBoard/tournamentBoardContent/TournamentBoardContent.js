import React from "react";
import { Grid } from "@material-ui/core";
import "flag-icon-css/css/flag-icon.css";

class TournamentBoardContent extends React.Component {
  render = () => {
    const { tournament } = this.props;
    const flagType = "flag-icon flag-icon-" + tournament.location.countryCode;
    return (
      <Grid item>
        <div>
          <strong>Date: </strong>
          {tournament.startDate} - {tournament.endDate}
        </div>
        <div>
          <strong>Location: </strong>
          {tournament.location.city}, {tournament.location.country + " "}
          <span className={flagType.toLowerCase()} />
        </div>
      </Grid>
    );
  };
}

export default TournamentBoardContent;
