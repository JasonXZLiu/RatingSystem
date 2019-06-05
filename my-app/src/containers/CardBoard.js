import React, { Component } from "react";
import PropTypes from "prop-types";
import CardBoard from "../components/cardBoard/CardBoard";

const LIMIT = 8;

class CardBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: 0,
      MIN: 0,
      nextIdx: 0,
      open: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      const MIN =
        LIMIT > this.props.list.length ? this.props.list.length : LIMIT;
      const nextIdx = MIN;
      this.setState({ MIN, nextIdx });
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
    const { idx, MIN } = this.state;
    const { list } = this.props;
    if (idx + MIN < list.length) {
      const newIdx = idx + MIN;
      const newNextIdx = newIdx + MIN;
      this.setState({
        idx: newIdx,
        nextIdx: newNextIdx
      });
    }
  };

  render = () => {
    const { idx, nextIdx } = this.state;
    const { list, rowSize, action } = this.props;
    const sublist = list.slice(idx, nextIdx);
    return (
      <CardBoard
        sublist={sublist}
        rowSize={rowSize}
        action={action}
        onNext={this.onNext}
        onBack={this.onBack}
      />
    );
  };
}

CardBoardContainer.propTypes = {
  filterList: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  action: PropTypes.object
};

CardBoardContainer.defaultProps = {
  action: {
    actionComponent: "",
    isActionOpen: false,
    openAction: null
  }
};

export default CardBoardContainer;
