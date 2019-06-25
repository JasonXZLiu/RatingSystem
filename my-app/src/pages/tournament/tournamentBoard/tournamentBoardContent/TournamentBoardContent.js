import React from "react";
import { Grid } from "@material-ui/core";
import { format } from "date-fns";
import "flag-icon-css/css/flag-icon.css";

class TournamentBoardContent extends React.Component {
  render = () => {
    const { tournament } = this.props;
    const flagType = "flag-icon flag-icon-" + tournament.location.countryCode;
    return (
      <Grid item>
        <div>
          <strong>Date: </strong>
          {format(new Date(tournament.startDate), "MM/DD/YYYY")} -{" "}
          {format(new Date(tournament.endDate), "MM/DD/YYYY")}
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
