import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import NavBar from "../../components/NavBar";
import LeaderboardTable from "./leaderboardTable/LeaderboardTable";
import LeaderboardFilter from "./leaderboardFilter/LeaderboardFilter";
import { fetchLeaders } from "./LeaderboardAction";
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";

const style = {
  leaderboardTitle: {
    color: "#005cb2"
  }
};

class LeaderboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: "" };
    props.fetchLeadersAction();
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
    const { classes, leaderboard } = this.props;
    const { leaders } = leaderboard;
    const { searchValue, sexValue, provinceValue, categoryValue } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          <Grid item>
            <LeaderboardFilter
              handleSearchFieldChange={this.handleSearchFieldChange}
              handleSelectorChange={this.handleSelectorChange}
              sexValue={sexValue}
              provinceValue={provinceValue}
              categoryValue={categoryValue}
            />
            <h1 className={classes.leaderboardTitle}>Top 50 Players</h1>
            <LeaderboardTable
              leaders={leaders}
              searchValue={searchValue}
              sexValue={sexValue}
              provinceValue={provinceValue}
              categoryValue={categoryValue}
            />
          </Grid>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ leaderboard }) => ({
  leaderboard: leaderboard
});

export default connect(
  mapStateToProps,
  {
    fetchLeadersAction: fetchLeaders
  }
)(withStyles(style)(LeaderboardPage));
