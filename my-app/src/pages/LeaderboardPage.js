import React from "react";
import NavBar from "../components/NavBar";
import Leaderboard from "../components/leaderboard/Leaderboard";
import LeaderboardFilter from "../components/leaderboardFilter/LeaderboardFilter";
import getPlayers from "../util/Repository";

class LeaderboardPage extends React.Component {
  render = () => {
    const { classes } = this.props;
    const players = getPlayers();
    return (
      <div>
        <NavBar />
        <div className="container">
          <LeaderboardFilter />
          <Leaderboard leaders={players} />
        </div>
      </div>
    );
  };
}

export default LeaderboardPage;
