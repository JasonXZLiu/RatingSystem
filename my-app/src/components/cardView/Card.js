import React from "react";
import PlayerOverviewDialog from "../playerOverviewModal/PlayerOverviewDialog";

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

  handleModalShow = player => {
    this.setState({
      open: player.name
    });
  };

  handleModalClose = () => {
    this.setState({
      open: ""
    });
  };

  render = () => {
    return (
      <div className="row">
        {this.props.list.map(player => {
          return (
            <div key={player.name} className="col-sm-3">
              <div className="card" style={CardStyle}>
                <div className="card-body">
                  <h5 className="card-title">{player.name}</h5>
                  <p className="card-text">{player.rating}</p>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => this.handleModalShow(player)}
                  >
                    View Match History
                  </button>
                  <PlayerOverviewDialog
                    open={this.state.open === player.name ? true : false}
                    player={player}
                    onClose={this.handleModalClose}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
}
export default Card;
