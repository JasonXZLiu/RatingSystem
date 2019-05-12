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
    this.state = { searchValue: "", players };
  }

  handleSearchFieldChange = e => {
    this.setState({
      filterValue: e.target.value
    });
  };

  render = () => {
    const { classes } = this.props;
    return (
      <div>
        <NavBar />
        <div className="container">
          <LeaderboardFilter
            handleSearchFieldChange={this.handleSearchFieldChange}
          />
          <h1 className={classes.leaderboardTitle}>Leaders</h1>
          <Leaderboard
            leaders={this.state.players}
            filterValue={this.state.filterValue}
          />
        </div>
      </div>
    );
  };
}

export default withStyles(style)(LeaderboardPage);
