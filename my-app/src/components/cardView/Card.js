import React, { Component } from "react";

const CardStyle = {
  width: "90%",
  margin: "1rem 2rem 1rem 2rem",
  textAlign: "center"
};

class Card extends Component {
  render = () => {
    const { card, cardSize, open, action } = this.props;
    const rowClass = "col-sm-" + cardSize;
    return (
      <div key={card.id} className={rowClass}>
        <div className="card" style={CardStyle}>
          {card.header && <div className="card-header">{card.header}</div>}
          {card.media}
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
