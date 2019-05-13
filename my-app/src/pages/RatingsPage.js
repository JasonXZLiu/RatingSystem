import React from "react";
import { withStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import TableView from "../components/tableView/TableView";
import get from "../util/Repository";

const style = {
  ratingTitle: {
    color: "#005cb2",
    margin: "2rem 0 1rem 0"
  },
  tableView: {
    width: "80%",
    margin: "auto"
  }
};

const RATING_HEADER = [
  "Ranking",
  "Name",
  "Province",
  "Sex",
  "Rating",
  "Last Played"
];

class RatingsPage extends React.Component {
  constructor(props) {
    super(props);

    const ratings = get("RATINGS");
    this.state = { searchValue: "", ratings };
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
    const { ratings } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          <h1 className={classes.ratingTitle}>Ratings</h1>
          <TableView
            className={classes.tableView}
            table={{
              headers: RATING_HEADER,
              rows: ratings
            }}
          />
        </div>
      </div>
    );
  };
}

export default withStyles(style)(RatingsPage);
