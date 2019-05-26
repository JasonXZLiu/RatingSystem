import React from "react";
import { withStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import { getRatings } from "../controllers/playerController.js";
import LeaderboardFilter from "../components/leaderboardFilter/LeaderboardFilter";
import RatingsTable from "../components/ratingsTable/RatingsTable";

const style = {
  ratingTitle: {
    color: "#005cb2",
    margin: "2rem 0 1rem 0"
  }
};

class RatingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: "", ratings: [] };
    getRatings().then(response => this.setState({ ratings: response }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      getRatings().then(response => this.setState({ ratings: response }));
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
      ratings,
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
          <h1 className={classes.ratingTitle}>Ratings</h1>
          <RatingsTable
            ratings={ratings}
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

export default withStyles(style)(RatingsPage);
