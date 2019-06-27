import React, { Component } from "react";
import classNames from "classnames";
import Card from "../../components/cardView/Card";
import { withStyles } from "@material-ui/styles";

const style = {
  buttonRowStyle: {
    margin: "auto"
  },
  buttonStyle: {
    margin: "1rem 1rem 1rem 1rem"
  }
};

class CardBoardContainer extends Component {
  render = () => {
    const {
      sublist,
      action,
      onNext,
      onBack,
      hasNext,
      hasBack,
      classes,
      rowSize
    } = this.props;
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
          <div className={classes.buttonRowStyle}>
            <button
              type="button"
              className={classNames("btn btn-light", classes.buttonStyle)}
              disabled={hasBack}
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="button"
              className={classNames("btn btn-primary", classes.buttonStyle)}
              disabled={hasNext}
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

export default withStyles(style)(CardBoardContainer);
