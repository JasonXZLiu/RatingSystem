import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import TableView from "../../../components/tableView/TableView";
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

class RatingsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,
      nextIdx: 0
    };
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

  render = () => {
    const { idx, nextIdx } = this.state;
    const { classes, filteredPlayers } = this.props;
    const MIN = filteredPlayers.length > LIMIT ? LIMIT : filteredPlayers.length;
    const sublist = filteredPlayers.slice(idx, nextIdx === 0 && MIN);
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
  filteredPlayers: PropTypes.array.isRequired,
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
