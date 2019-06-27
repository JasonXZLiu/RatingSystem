import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";
import "typeface-roboto";
import NavBar from "../../../components/NavBar";
import { fetchTournamentById, verifyMatches } from "../TournamentAction";
import longPhoto from "../../../resources/longPhoto.jpg";
import toast from "../../../components/toast/toast";
import ReviewMatchesTable from "../reviewMatchesTable/ReviewMatchesTable";
import ViewMatchesTable from "../viewMatchesTable/ViewMatchesTable";
import BillboardHeader from "../../../components/billboardHeader/BillboardHeader";

const style = {
  importMatchesButton: {
    background: "#005CB2",
    color: "white",
    margin: "0rem 0.5rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer"
  }
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
      return toast.error("submitted file is not a csv");

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
        <BillboardHeader
          photoSrc={longPhoto}
          title={tournament.name}
          details={[
            `${tournament.startDate} - ${tournament.endDate}`,
            `${tournament.location.city}, ${tournament.location.country}`
          ]}
        />
        <div className="container">
          <Grid
            container
            direction="row"
            alignItems="center"
            justify={"space-between"}
            style={{ marginBottom: "2rem" }}
          >
            <Grid item>
              <Typography variant="h5">
                <strong>Events:</strong> {tournament.events.join(", ")}
              </Typography>
            </Grid>
            <Grid item>
              <label for="file">
                <div className={classes.importMatchesButton}>
                  Import Matches
                </div>
              </label>
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
