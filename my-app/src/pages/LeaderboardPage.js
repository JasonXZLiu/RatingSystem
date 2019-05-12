import React from "react";
import { withStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Leaderboard from "../components/leaderboard/Leaderboard";
import LeaderboardFilter from "../components/leaderboardFilter/LeaderboardFilter";
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
    this.state = { searchValue: "", players };
  }

  handleSearchFieldChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSelectorChange = (e, title) => {
    switch (title) {
      case "Gender":
        this.setState({
          genderValue: e.target.value
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
    return (
      <div>
        <NavBar />
        <div className="container">
          <LeaderboardFilter
            handleSearchFieldChange={this.handleSearchFieldChange}
            handleSelectorChange={this.handleSelectorChange}
            genderValue={this.state.genderValue}
            provinceValue={this.state.provinceValue}
            categoryValue={this.state.categoryValue}
          />
          <h1 className={classes.leaderboardTitle}>Leaders</h1>
          <Leaderboard
            leaders={this.state.players}
            searchValue={this.state.searchValue}
            genderValue={this.state.genderValue}
            provinceValue={this.state.provinceValue}
            categoryValue={this.state.categoryValue}
          />
        </div>
      </div>
    );
  };
}

export default withStyles(style)(LeaderboardPage);
