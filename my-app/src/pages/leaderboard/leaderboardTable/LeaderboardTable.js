import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../../../components/cardView/Card";
import PlayerOverviewDialog from "../playerOverviewDialog/PlayerOverviewDialog";

const LIMIT = 8;

const ButtonRowStyle = {
  margin: "auto"
};

const ButtonStyle = {
  margin: "1rem 1rem 1rem 1rem"
};

class LeaderboardTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: 0,
      MIN: 0,
      nextIdx: 0,
      filteredLeaders: [],
      open: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const MIN =
        LIMIT > this.props.leaders.length ? this.props.leaders.length : LIMIT;
      const nextIdx = MIN;
      this.setState({ MIN, nextIdx });
      this.filterPlayers();
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
    const { idx, MIN, filteredLeaders } = this.state;
    if (idx + MIN < filteredLeaders.length) {
      const newIdx = idx + MIN;
      const newNextIdx = newIdx + MIN;
      this.setState({
        idx: newIdx,
        nextIdx: newNextIdx
      });
    }
  };

  handleModalShow = playerId => {
    this.setState({
      open: playerId
    });
  };

  handleModalClose = () => {
    this.setState({
      open: ""
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
    let filterBySexValue = filterBySearchValue.filter(player =>
      this.searchByStringValue(player.sex, this.props.sexValue)
    );
    let filterByProvinceValue = filterBySexValue.filter(player =>
      this.searchByStringValue(player.province, this.props.provinceValue)
    );
    let filterByCategoryValue = filterByProvinceValue.filter(player =>
      this.searchByNumberValue(player.age, this.props.categoryValue)
    );
    const MIN =
      LIMIT > filterByCategoryValue.length
        ? filterByCategoryValue.length
        : LIMIT;
    this.setState({ MIN, filteredLeaders: filterByCategoryValue });
  };

  render = () => {
    const { idx, nextIdx, filteredLeaders, open } = this.state;
    const sublist = filteredLeaders.slice(idx, nextIdx);
    return (
      <div>
        <div className="row">
          {sublist.map(player => {
            const card = {
              id: player.id,
              title: player.name,
              content: player.rating,
              text: "View Player Overview"
            };
            return (
              <Card
                key={player.id}
                card={card}
                open={() => this.handleModalShow(player.id)}
                action={
                  open === player.id && (
                    <PlayerOverviewDialog
                      key={player.id}
                      leader={player}
                      onClose={this.handleModalClose}
                    />
                  )
                }
              />
            );
          })}
        </div>
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

LeaderboardTable.propTypes = {
  leaders: PropTypes.array.isRequired,
  searchValue: PropTypes.string,
  sexValue: PropTypes.string,
  provinceValue: PropTypes.string,
  categoryValue: PropTypes.string
};

LeaderboardTable.defaultProps = {
  searchValue: "",
  sexValue: "",
  provinceValue: "",
  categoryValue: ""
};

export default LeaderboardTable;
