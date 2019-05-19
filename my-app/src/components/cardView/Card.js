import React from "react";
import PlayerOverviewDialog from "../playerOverviewDialog/PlayerOverviewDialog";

const CardStyle = {
  width: "90%",
  margin: "1rem 2rem 1rem 2rem",
  textAlign: "center"
};

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
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

  render = () => {
    const { player } = this.props;
    return (
      <div key={player.id} className="col-sm-3">
        <div className="card" style={CardStyle}>
          <div className="card-body">
            <h5 className="card-title">{player.name}</h5>
            <p className="card-text">{player.rating}</p>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => this.handleModalShow(player.id)}
            >
              View Player Overview
            </button>
            <PlayerOverviewDialog
              key={player.id}
              open={this.state.open === player.id ? true : false}
              player={player}
              onClose={this.handleModalClose}
            />
          </div>
        </div>
      </div>
    );
  };
}
export default Card;
