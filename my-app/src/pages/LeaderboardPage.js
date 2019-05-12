import React from "react";
import { withStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Leaderboard from "../components/leaderboard/Leaderboard";
import LeaderboardFilter from "../components/leaderboardFilter/LeaderboardFilter";
import getPlayers from "../util/Repository";

const style = {
  leaderboardTitle: {
    color: "#005cb2"
  }
};

class LeaderboardPage extends React.Component {
  constructor(props) {
    super(props);

    const players = getPlayers();
    this.state = { searchValue: "", players, filteredPlayers: players };
  }

  handleSearchFieldChange = e => {
    const curPlayers = this.state.players;
    const filteredPlayers = curPlayers.filter(player =>
      this.handleSearch(player.name, e.target.value)
    );
    this.setState({
      filteredPlayers
    });
  };

  handleSearch = (value, target) => {
    return target === "" || value.toLowerCase().includes(target.toLowerCase());
  };

  render = () => {
    const { classes } = this.props;
    const { filteredPlayers } = this.state;
    console.log(filteredPlayers);
    return (
      <div>
        <NavBar />
        <div className="container">
          <LeaderboardFilter
            handleSearchFieldChange={this.handleSearchFieldChange}
          />
          <h1 className={classes.leaderboardTitle}>Leaders</h1>
          <Leaderboard leaders={this.state.filteredPlayers} />
        </div>
      </div>
    );
  };
}

export default withStyles(style)(LeaderboardPage);
