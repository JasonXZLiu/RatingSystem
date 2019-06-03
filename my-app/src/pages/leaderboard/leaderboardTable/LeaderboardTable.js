import React, { Component } from "react";
import PropTypes from "prop-types";
import CardBoardContainer from "../../../containers/CardBoard";
import PlayerOverviewDialog from "../playerOverviewDialog/PlayerOverviewDialog";
import { findById } from "../../../utils/SearchUtil";

class LeaderboardTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: "",
      filteredLeaders: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.filterPlayers();
    }
  }

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
    this.setState({ filteredLeaders: filterByCategoryValue });
  };

  render = () => {
    const { filteredLeaders, open } = this.state;
    const cards = filteredLeaders.map(leader => {
      return {
        id: leader.id,
        title: leader.name,
        content: leader.rating,
        text: "View Player Overview"
      };
    });
    return (
      <CardBoardContainer
        filterList={this.filterPlayers}
        list={cards}
        rowSize={4}
        action={
          <PlayerOverviewDialog
            key={open}
            leader={findById(filteredLeaders, open)}
            onClose={this.handleModalClose}
          />
        }
        isActionOpen={open}
        openAction={this.handleModalShow}
      />
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
