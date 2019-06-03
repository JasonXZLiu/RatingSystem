import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import NavBar from "../../components/NavBar";
import { fetchTournaments } from "./TournamentAction";
import TournamentBoard from "./tournamentBoard/TournamentBoard";

const style = {
  tournamentTitle: {
    color: "#005cb2"
  }
};

class TournamentPage extends Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: "" };
    props.fetchTournamentsAction();
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
    const { classes, tournament } = this.props;
    const { tournaments } = tournament;
    const { searchValue, sexValue, provinceValue, categoryValue } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          <Grid item>
            <h1 className={classes.leaderboardTitle}>Tournaments</h1>
            <TournamentBoard
              tournaments={tournaments}
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

const mapStateToProps = ({ tournament }) => ({
  tournament: tournament
});

export default connect(
  mapStateToProps,
  {
    fetchTournamentsAction: fetchTournaments
  }
)(withStyles(style)(TournamentPage));
