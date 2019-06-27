import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Grid, withStyles } from "@material-ui/core";
import NavBar from "../../components/NavBar";
import { fetchPlayerById, fetchPlayerMatchHistory } from "./PlayerAction";
import profile from "../../resources/profile.jpg";
import TableView from "../../components/tableView/TableView";
import PlayerRatingFilter from "./playerRatingFilter/PlayerRatingFilter";

const style = {
  backButton: { marginBottom: "2rem" },
  profilePhoto: { width: "20rem", borderRadius: "0.5rem" },
  ratingFilterContainer: { marginTop: "2rem" }
};

const MATCH_HISTORY_HEADER = [
  "Date",
  "Tournament",
  "Opponent",
  "Opposing Rating",
  "Result"
];

class PlayerPage extends Component {
  constructor(props) {
    super(props);

    const {
      match,
      fetchPlayerByIdAction,
      fetchPlayerMatchHistoryAction
    } = this.props;
    const { playerId } = match.params;
    fetchPlayerByIdAction(playerId);
    fetchPlayerMatchHistoryAction({ playerId });

    this.state = {
      playerId,
      resultValue: "",
      dateValue: null
    };
  }

  goBack = () => {
    this.props.history.goBack();
  };

  handleSearchFieldChange = e => {
    const { playerId, resultValue } = this.state;
    const searchValue = e.target.value;
    this.props.fetchPlayerMatchHistoryAction({
      playerId,
      searchValue,
      resultValue: resultValue
    });
    this.setState({
      searchValue
    });
  };

  handleDateChange = target => {
    const { playerId, searchValue, resultValue } = this.state;
    const dateValue = target && target.toISODate();
    this.props.fetchPlayerMatchHistoryAction({
      playerId,
      searchValue,
      resultValue: resultValue
    });
    this.setState({
      dateValue
    });
  };

  handleSelectorChange = (e, title) => {
    const { playerId, searchValue } = this.state;
    switch (title) {
      case "Result":
        const newResultValue = e.target.value;
        this.props.fetchPlayerMatchHistoryAction({
          playerId,
          searchValue: searchValue,
          resultValue: newResultValue
        });
        this.setState({
          resultValue: newResultValue
        });
        break;
      default:
        break;
    }
  };

  render = () => {
    const { playerStore, classes } = this.props;
    const { resultValue, dateValue } = this.state;
    const { player, matchHistory } = playerStore;
    const headers = MATCH_HISTORY_HEADER;
    const table = {
      headers,
      rows: matchHistory
    };
    return (
      <div>
        <NavBar />
        <div className="container">
          <button
            type="button"
            className={classNames("btn btn-secondary", classes.backButton)}
            onClick={this.goBack}
          >
            Back
          </button>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={4}>
              <img alt="" src={profile} className={classes.profilePhoto} />
            </Grid>
            <Grid item xs={8}>
              <h1>{player.name}</h1>
              <hr />
              <h4>Age: {player.age}</h4>
              <h4>Sex: {player.sex === "M" ? "Male" : "Female"}</h4>
              <h4>Rating: {player.rating}</h4>
              <h4>Province: {player.province}</h4>
            </Grid>
          </Grid>
          <Grid item className={classes.ratingFilterContainer}>
            <PlayerRatingFilter
              handleSearchFieldChange={this.handleSearchFieldChange}
              handleSelectorChange={this.handleSelectorChange}
              handleDateChange={this.handleDateChange}
              resultValue={resultValue}
              dateValue={dateValue}
            />
            <TableView {...table} />
          </Grid>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ playerStore }) => ({
  playerStore
});

export default connect(
  mapStateToProps,
  {
    fetchPlayerByIdAction: fetchPlayerById,
    fetchPlayerMatchHistoryAction: fetchPlayerMatchHistory
  }
)(withStyles(style)(PlayerPage));
