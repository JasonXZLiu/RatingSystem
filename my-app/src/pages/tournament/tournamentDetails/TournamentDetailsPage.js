import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import NavBar from "../../../components/NavBar";
import { fetchTournamentById, verifyMatches } from "../TournamentAction";
import longPhoto from "../../../resources/longPhoto.jpg";
import toast from "../../../components/toast/toast";
import ReviewMatchesTable from "../reviewMatchesTable/ReviewMatchesTable";
import ViewMatchesTable from "../viewMatchesTable/ViewMatchesTable";

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
    this.state = { tournamentId };
  }

  handleImportMatches = evt => {
    const { verifyMatchesAction, match } = this.props;
    const { tournamentId } = match.params;
    const files = evt.target.files;

    // only use the first uploaded file for now
    const file = files[0];
    var reader = new FileReader();

    if (file.name.split(".").pop() !== "csv")
      return toast.error("Submitted file is not a csv");

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

  onBack = () => {
    const { idx, MIN } = this.state;
    if (idx - MIN >= 0) {
      const newIdx = idx - MIN;
      const newNextIdx = newIdx + MIN;
      this.setState({
        idx: newIdx,
        nextIdx: newNextIdx
      });
    }
  };

  onNext = () => {
    const { idx, MIN, filteredRatings } = this.state;
    if (idx + MIN < filteredRatings.length) {
      const newIdx = idx + MIN;
      const newNextIdx = newIdx + MIN;
      this.setState({
        idx: newIdx,
        nextIdx: newNextIdx
      });
    }
  };

  render = () => {
    const { tournamentId } = this.state;
    const { classes, tournamentStore } = this.props;
    const { tournament, currentStep } = tournamentStore;
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
          <Grid
            container
            direction="row"
            justify={"space-between"}
            style={{ marginBottom: "2rem" }}
          >
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
          <Grid item>
            <Grid item style={{ marginBottom: "1rem" }} />
            {currentStep === 1 && (
              <ViewMatchesTable tournamentId={tournamentId} />
            )}
            {currentStep === 2 && (
              <ReviewMatchesTable tournamentId={tournamentId} />
            )}
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
