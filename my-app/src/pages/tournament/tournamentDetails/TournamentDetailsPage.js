import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Grid, Input } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import NavBar from "../../../components/NavBar";
import { fetchTournamentById, verifyMatches } from "../TournamentAction";
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

  handleImportMatches = evt => {
    const { verifyMatchesAction, match } = this.props;
    const { tournamentId } = match.params;
    const files = evt.target.files;

    // only use the first uploaded file for now
    const file = files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile, tournamentId) {
      return function(e) {
        verifyMatchesAction({
          tournamentId: tournamentId,
          csv: e.target.result
        });
      };
    })(file, tournamentId);
    reader.readAsBinaryString(file);
  };

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
          <Grid container direction="row" justify={"space-between"}>
            <Grid item>
              <Typography variant="h5">
                <strong>Events:</strong> {tournament.events.join(", ")}
              </Typography>
            </Grid>
            <Grid item>
              <label for="file">Import Matches</label>
              <input
                type="file"
                name="file"
                id="file"
                style={{
                  opacity: 0,
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: "-1"
                }}
                onChange={this.handleImportMatches}
              />
            </Grid>
          </Grid>
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
    fetchTournamentByIdAction: fetchTournamentById,
    verifyMatchesAction: verifyMatches
  }
)(withStyles(style)(TournamentDetailsPage));
