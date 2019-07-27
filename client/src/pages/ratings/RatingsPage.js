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

    this.state = {
      searchValue: "undefined"
    };
    props.fetchPlayersAction();
  }

  handleSearchFieldChange = e => {
    const { sexValue, provinceValue, categoryValue } = this.state;
    const searchValue = e.target.value;
    this.props.fetchPlayersAction({
      searchValue,
      sexValue: sexValue,
      provinceValue: provinceValue,
      categoryValue: categoryValue
    });
    this.setState({
      searchValue
    });
  };

  handleSelectorChange = (e, title) => {
    const { searchValue, sexValue, provinceValue, categoryValue } = this.state;
    switch (title) {
      case "Sex":
        const newSexValue = e.target.value;
        this.props.fetchPlayersAction({
          searchValue: searchValue,
          sexValue: newSexValue,
          provinceValue: provinceValue,
          categoryValue: categoryValue
        });
        this.setState({
          sexValue: newSexValue
        });
        break;
      case "Province":
        const newProvinceValue = e.target.value;
        this.props.fetchPlayersAction({
          searchValue: searchValue,
          sexValue: sexValue,
          provinceValue: newProvinceValue,
          categoryValue: categoryValue
        });
        this.setState({
          provinceValue: newProvinceValue
        });
        break;
      case "Category":
        const newCategoryValue = e.target.value;
        this.props.fetchPlayersAction({
          searchValue: searchValue,
          sexValue: sexValue,
          provinceValue: provinceValue,
          categoryValue: newCategoryValue
        });
        this.setState({
          categoryValue: newCategoryValue
        });
        break;
      default:
        break;
    }
  };

  render = () => {
    const { classes, ratingStore } = this.props;
    const { players, isFetching } = ratingStore;
    const { sexValue, provinceValue, categoryValue } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          <RatingsFilter
            handleSearchFieldChange={this.handleSearchFieldChange}
            handleSelectorChange={this.handleSelectorChange}
            sexValue={sexValue}
            provinceValue={provinceValue}
            categoryValue={categoryValue}
          />
          {isFetching && <LoadingIndicator />}
          {!isFetching && (
            <Grid item>
              <h1 className={classes.ratingTitle}>Ratings</h1>
              <RatingsTable filteredPlayers={players} />
            </Grid>
          )}
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ ratingStore }) => ({
  ratingStore
});

export default connect(
  mapStateToProps,
  {
    fetchPlayersAction: fetchPlayers
  }
)(withStyles(style)(RatingsPage));
