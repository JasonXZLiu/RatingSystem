import React, { Component } from "react";

const CardStyle = {
  width: "90%",
  margin: "1rem 2rem 1rem 2rem",
  textAlign: "center"
};

class Card extends Component {
  render = () => {
    const { card, open, action } = this.props;
    return (
      <div key={card.id} className="col-sm-3">
        <div className="card" style={CardStyle}>
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.content}</p>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={open}
            >
              {card.text}
            </button>
            {action}
          </div>
        </div>
      </div>
    );
  };
}
export default Card;
