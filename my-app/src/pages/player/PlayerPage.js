import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import NavBar from "../../components/NavBar";
import { fetchPlayerById } from "./PlayerAction";
import profile from "../../resources/profile.jpg";
import TableView from "../../components/tableView/TableView";
import PlayerRatingFilter from "./playerRatingFilter/PlayerRatingFilter";

const MATCH_HISTORY_HEADER = [
  "Date",
  "Tournament",
  "Opponent",
  "Opposing Rating",
  "Result",
  "Rating Change"
];

class PlayerPage extends Component {
  constructor(props) {
    super(props);

    const { match, fetchPlayerByIdAction } = this.props;
    const { playerId } = match.params;
    fetchPlayerByIdAction(playerId);

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render = () => {
    const { playerStore } = this.props;
    const { player } = playerStore;
    const headers = MATCH_HISTORY_HEADER;
    const rows = player.matchHistory || [];
    const table = {
      headers,
      rows
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
            <PlayerRatingFilter />
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
    fetchPlayerByIdAction: fetchPlayerById
  }
)(PlayerPage);
