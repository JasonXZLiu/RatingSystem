import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import TableView from "../tableView/TableView";
import classNames from "classnames";

const LIMIT = 25;

const styles = {
  buttonRowStyle: { margin: "auto" },
  buttonStyle: { margin: "1rem 1rem 1rem 1rem" },
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

class RatingsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: 0,
      MIN: 0,
      nextIdx: 0,
      filteredRatings: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const MIN =
        LIMIT > this.props.ratings.length ? this.props.ratings.length : LIMIT;
      const nextIdx = MIN;
      this.setState({ MIN, nextIdx });
      this.filterRatings();
    }
  }

  onBack = () => {
    const { idx, MIN } = this.state;
    if (idx - MIN >= 0) {
      const newIdx = idx - MIN;
      const newNextIdx = newIdx + MIN;
      this.setState({
        idx: newIdx,
        nextIdx: newNextIdx
      });
    }
  };

  onNext = () => {
    const { idx, MIN, filteredRatings } = this.state;
    if (idx + MIN < filteredRatings.length) {
      const newIdx = idx + MIN;
      const newNextIdx = newIdx + MIN;
      this.setState({
        idx: newIdx,
        nextIdx: newNextIdx
      });
    }
  };

  searchByStringValue = (value, target) => {
    return target === "" || value.toLowerCase().includes(target.toLowerCase());
  };

  searchByNumberValue = (value, target) => {
    return target === "" || value <= target;
  };

  filterRatings = () => {
    let filterBySearchValue =
      this.props.ratings.filter(rating =>
        this.searchByStringValue(rating.name, this.props.searchValue)
      ) || [];
    let filterBySexValue = filterBySearchValue.filter(rating =>
      this.searchByStringValue(rating.sex, this.props.sexValue)
    );
    let filterByProvinceValue = filterBySexValue.filter(rating =>
      this.searchByStringValue(rating.province, this.props.provinceValue)
    );
    let filterByCategoryValue = filterByProvinceValue.filter(rating =>
      this.searchByNumberValue(rating.age, this.props.categoryValue)
    );
    const MIN =
      LIMIT > filterByCategoryValue.length
        ? filterByCategoryValue.length
        : LIMIT;
    this.setState({ MIN, filteredRatings: filterByCategoryValue });
  };

  render = () => {
    const { idx, nextIdx, filteredRatings } = this.state;
    const { classes } = this.props;
    const sublist = filteredRatings.slice(idx, nextIdx);
    console.log(sublist);
    const table = {
      headers: RATING_HEADER,
      rows: sublist
    };
    return (
      <div>
        <div className="row">
          <TableView className={classes.tableView} {...table} />
        </div>
        <div className="row">
          <div className={classes.buttonRowStyle}>
            <button
              type="button"
              className={classNames("btn btn-light", classes.buttonStyle)}
              onClick={this.onBack}
            >
              Back
            </button>
            <button
              type="button"
              className={classNames("btn btn-primary", classes.buttonStyle)}
              onClick={this.onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
}

RatingsTable.propTypes = {
  ratings: PropTypes.array.isRequired,
  searchValue: PropTypes.string,
  sexValue: PropTypes.string,
  provinceValue: PropTypes.string,
  categoryValue: PropTypes.string
};

RatingsTable.defaultProps = {
  searchValue: "",
  sexValue: "",
  provinceValue: "",
  categoryValue: ""
};

export default withStyles(styles)(RatingsTable);
