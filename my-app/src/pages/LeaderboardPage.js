import React from "react";
import { withStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Leaderboard from "../components/leaderboard/Leaderboard";
import LeaderboardFilter from "../components/leaderboardFilter/LeaderboardFilter";
// import getPlayers from "../controllers/playerController.js";
import get from "../util/Repository";

const style = {
  leaderboardTitle: {
    color: "#005cb2"
  }
};

class LeaderboardPage extends React.Component {
  constructor(props) {
    super(props);

    const players = get("PLAYERS");
    // const players = getPlayers();
    // console.log(getPlayers());
    this.state = { searchValue: "", players };
  }

  componentWillReceiveProps(nextProps) {
    console.log(get("PLAYERS"));
    if (nextProps.state === "desiredState") {
      const players = get("PLAYERS");
      this.setState({
        players
      });
    }
  }

  handleSearchFieldChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSelectorChange = (e, title) => {
    switch (title) {
      case "Sex":
        this.setState({
          sexValue: e.target.value
        });
        break;
      case "Province":
        this.setState({
          provinceValue: e.target.value
        });
        break;
      case "Category":
        this.setState({
          categoryValue: e.target.value
        });
        break;
      default:
        break;
    }
  };

  render = () => {
    const { classes } = this.props;
    const {
      players,
      searchValue,
      sexValue,
      provinceValue,
      categoryValue
    } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          <LeaderboardFilter
            handleSearchFieldChange={this.handleSearchFieldChange}
            handleSelectorChange={this.handleSelectorChange}
            sexValue={sexValue}
            provinceValue={provinceValue}
            categoryValue={categoryValue}
          />
          <h1 className={classes.leaderboardTitle}>Leaders</h1>
          <Leaderboard
            leaders={players}
            searchValue={searchValue}
            sexValue={sexValue}
            provinceValue={provinceValue}
            categoryValue={categoryValue}
          />
        </div>
      </div>
    );
  };
}

export default withStyles(style)(LeaderboardPage);
