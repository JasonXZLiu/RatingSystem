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
    if (idx + MIN < filteredLeaders.length) {
      idx = idx + MIN;
      nextIdx = idx + MIN;
    }
    this.setState({
      change: 1
    });
  };

  searchByStringValue = (value, target) => {
    return target === "" || value.toLowerCase().includes(target.toLowerCase());
  };

  searchByNumberValue = (value, target) => {
    return target === "" || value <= target;
  };

  filterPlayers = () => {
    let filterBySearchValue =
      this.props.leaders.filter(player =>
        this.searchByStringValue(player.name, this.props.searchValue)
      ) || [];
    let filterByGenderValue = filterBySearchValue.filter(player =>
      this.searchByStringValue(player.gender, this.props.genderValue)
    );
    let filterByProvinceValue = filterByGenderValue.filter(player =>
      this.searchByStringValue(player.province, this.props.provinceValue)
    );
    let filterByCategoryValue = filterByProvinceValue.filter(player =>
      this.searchByNumberValue(player.age, this.props.categoryValue)
    );
    MIN =
      LIMIT > filterByCategoryValue.length
        ? filterByCategoryValue.length
        : LIMIT;
    return filterByCategoryValue;
  };

  render = () => {
    // filter the list based on the search value
    filteredLeaders = this.filterPlayers();
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
  searchValue: PropTypes.string,
  genderValue: PropTypes.string,
  provinceValue: PropTypes.string,
  categoryValue: PropTypes.string
};

Leaderboard.defaultProps = {
  searchValue: "",
  genderValue: "",
  provinceValue: "",
  categoryValue: ""
};

export default Leaderboard;
