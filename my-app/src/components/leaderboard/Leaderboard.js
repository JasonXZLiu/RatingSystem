import React from "react";
import PropTypes from "prop-types";
import Card from "../cardView/Card";

const LIMIT = 8;
let idx = 0,
  nextIdx = 0,
  MIN = 0,
  filteredLeaders = [],
  sublist = [];

const ButtonRowStyle = {
  margin: "auto"
};

const ButtonStyle = {
  margin: "1rem 1rem 1rem 1rem"
};

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    MIN = LIMIT > this.props.leaders.length ? this.props.leaders.length : LIMIT;
    nextIdx = MIN;
  }

  onBack = () => {
    if (idx - MIN >= 0) {
      idx = idx - MIN;
      nextIdx = idx + MIN;
    }
    this.setState({
      change: 1
    });
  };

  onNext = () => {
    if (idx + MIN < this.props.leaders.length) {
      idx = idx + MIN;
      nextIdx = idx + MIN;
    }
    this.setState({
      change: 1
    });
  };

  handleSearch = (value, target) => {
    return target === "" || value.toLowerCase().includes(target.toLowerCase());
  };

  render = () => {
    // filter the list based on the search value
    const filteredLeaders = this.props.leaders.filter(player =>
      this.handleSearch(player.name, this.props.filterValue)
    );
    sublist = filteredLeaders.slice(idx, nextIdx);
    return (
      <div>
        <Card list={sublist} />
        <div className="row">
          <div style={ButtonRowStyle}>
            <button
              type="button"
              className="btn btn-light"
              style={ButtonStyle}
              onClick={this.onBack}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={ButtonStyle}
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

Leaderboard.propTypes = {
  leaders: PropTypes.array.isRequired,
  filterValue: PropTypes.string
};

Leaderboard.defaultProps = {
  filterValue: ""
};

export default Leaderboard;
