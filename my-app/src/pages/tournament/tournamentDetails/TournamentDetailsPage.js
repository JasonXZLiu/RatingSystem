import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import NavBar from "../../../components/NavBar";
import { fetchTournamentById } from "../TournamentAction";
import longPhoto from "../../../resources/longPhoto.jpg";

const style = {
  headerDiv: {
    marginTop: "-1rem",
    width: "100%",
    height: "40rem",
    overflow: "hidden",
    position: "relative",
    background: "black",
    marginBottom: "2rem"
  },
  headerImg: { width: "100%", minHeight: "100%", opacity: "0.7" },
  headerContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center"
  },
  headerText: { color: "white" }
};

class TournamentDetailsPage extends Component {
  constructor(props) {
    super(props);

    const { match, fetchTournamentByIdAction } = this.props;
    const { tournamentId } = match.params;
    fetchTournamentByIdAction(tournamentId);
  }

  render = () => {
    const { classes, tournamentStore } = this.props;
    const { tournament } = tournamentStore;
    return (
      <div>
        <NavBar />
        <div className={classes.headerDiv}>
          <img className={classes.headerImg} src={longPhoto} />
          <div className={classes.headerContent}>
            <Typography
              variant="h2"
              className={classes.headerText}
              gutterBottom
            >
              {tournament.name}{" "}
            </Typography>
            <Typography variant="h5" className={classes.headerText}>
              {tournament.startDate} - {tournament.endDate}
            </Typography>
            <Typography variant="h5" className={classes.headerText}>
              {tournament.location.city}, {tournament.location.country}
            </Typography>
          </div>
        </div>
        <div className="container">
          <Typography variant="h5">
            <strong>Events:</strong> {tournament.events.join(", ")}
          </Typography>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ tournamentStore }) => ({
  tournamentStore: tournamentStore
});

export default connect(
  mapStateToProps,
  {
    fetchTournamentByIdAction: fetchTournamentById
  }
)(withStyles(style)(TournamentDetailsPage));
