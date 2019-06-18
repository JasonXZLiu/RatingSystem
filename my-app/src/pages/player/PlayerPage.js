import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { toISODate } from "@date-io/luxon";
import NavBar from "../../components/NavBar";
import { fetchPlayerById, fetchPlayerMatchHistory } from "./PlayerAction";
import profile from "../../resources/profile.jpg";
import TableView from "../../components/tableView/TableView";
import PlayerRatingFilter from "./playerRatingFilter/PlayerRatingFilter";

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
    const { playerStore } = this.props;
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
            className="btn btn-secondary"
            onClick={this.goBack}
            style={{ marginBottom: "2rem" }}
          >
            Back
          </button>
          <Grid container direction="row" alignItems="center" spacing={12}>
            <Grid item xs={4}>
              <img
                src={profile}
                style={{ width: "20rem", borderRadius: "0.5rem" }}
              />
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
          <Grid item style={{ marginTop: "2rem" }}>
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
)(PlayerPage);
