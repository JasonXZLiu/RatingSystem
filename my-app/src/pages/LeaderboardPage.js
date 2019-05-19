import React from "react";
import { withStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Leaderboard from "../components/leaderboard/Leaderboard";
import LeaderboardFilter from "../components/leaderboardFilter/LeaderboardFilter";
import { getPlayers } from "../controllers/playerController.js";

const style = {
  leaderboardTitle: {
    color: "#005cb2"
  }
};

class LeaderboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: "", players: [] };
    getPlayers().then(response => this.setState({ players: response }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      getPlayers().then(response => this.setState({ players: response }));
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
          <h1 className={classes.leaderboardTitle}>Top 50 Players</h1>
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
