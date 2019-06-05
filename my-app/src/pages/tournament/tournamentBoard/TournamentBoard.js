import React, { Component } from "react";
import PropTypes from "prop-types";
import CardBoardContainer from "../../../containers/CardBoard";
import TournamentBoardContent from "./tournamentBoardContent/TournamentBoardContent";
import TournamentDetailsPage from "../tournamentDetails/TournamentDetailsPage";
import tournamentPhoto from "../../../resources/tournament.jpg";

class TournamentBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: "",
      filteredTournaments: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.filterTournaments();
    }
  }

  handleViewTournamentClick = tournamentId => {
    window.location.assign("/tournament/" + tournamentId);
  };

  searchByStringValue = (value, target) => {
    return target === "" || value.toLowerCase().includes(target.toLowerCase());
  };

  searchByNumberValue = (value, target) => {
    return target === "" || value <= target;
  };

  filterTournaments = () => {
    let filteredTournaments = this.props.tournaments;
    this.setState({ filteredTournaments: filteredTournaments });
  };

  render = () => {
    const { filteredTournaments, open } = this.state;
    const cards = filteredTournaments.map(tournament => {
      return {
        media: <img src={tournamentPhoto} className="card-img-top" />,
        id: tournament.id,
        title: tournament.name,
        content: <TournamentBoardContent tournament={tournament} />,
        text: "View Tournament"
      };
    });
    const action = {
      actionComponent: "",
      isActionOpen: open,
      openAction: this.handleViewTournamentClick
    };
    return (
      <CardBoardContainer
        filterList={this.filterTournaments}
        list={cards}
        rowSize={3}
        action={action}
      />
    );
  };
}

TournamentBoard.propTypes = {
  tournaments: PropTypes.array.isRequired,
  searchValue: PropTypes.string,
  sexValue: PropTypes.string,
  provinceValue: PropTypes.string,
  categoryValue: PropTypes.string
};

TournamentBoard.defaultProps = {
  searchValue: "",
  sexValue: "",
  provinceValue: "",
  categoryValue: ""
};

export default TournamentBoard;
