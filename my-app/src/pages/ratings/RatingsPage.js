import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import NavBar from "../../components/NavBar";
import RatingsFilter from "./ratingsFilter/RatingsFilter";
import RatingsTable from "./ratingsTable/RatingsTable";
import { fetchPlayers } from "./RatingsAction";
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";

const style = {
  ratingTitle: {
    color: "#005cb2",
    margin: "2rem 0 1rem 0"
  }
};

class RatingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: "" };
    props.fetchPlayersAction();
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
    const { classes, playersStore } = this.props;
    const { players, isFetching } = playersStore;
    const { searchValue, sexValue, provinceValue, categoryValue } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          {isFetching && <LoadingIndicator />}
          {!isFetching && (
            <Grid item>
              <RatingsFilter
                handleSearchFieldChange={this.handleSearchFieldChange}
                handleSelectorChange={this.handleSelectorChange}
                sexValue={sexValue}
                provinceValue={provinceValue}
                categoryValue={categoryValue}
              />
              <h1 className={classes.ratingTitle}>Ratings</h1>
              <RatingsTable
                filteredPlayers={players}
                searchValue={searchValue}
                sexValue={sexValue}
                provinceValue={provinceValue}
                categoryValue={categoryValue}
              />
            </Grid>
          )}
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ playersStore }) => ({
  playersStore
});

export default connect(
  mapStateToProps,
  {
    fetchPlayersAction: fetchPlayers
  }
)(withStyles(style)(RatingsPage));
