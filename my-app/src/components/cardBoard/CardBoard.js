import React, { Component } from "react";
import Card from "../../components/cardView/Card";

const ButtonRowStyle = {
  margin: "auto"
};

const ButtonStyle = {
  margin: "1rem 1rem 1rem 1rem"
};

class CardBoardContainer extends Component {
  render = () => {
    const { sublist, action, onNext, onBack, rowSize } = this.props;
    const { actionComponent, isActionOpen, openAction } = action;
    return (
      <div>
        <div className="row">
          {sublist.map(card => {
            return (
              <Card
                key={card.id}
                cardSize={12 / rowSize}
                card={card}
                open={() => openAction(card.id)}
                action={card.id === isActionOpen && actionComponent}
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
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={ButtonStyle}
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default CardBoardContainer;
