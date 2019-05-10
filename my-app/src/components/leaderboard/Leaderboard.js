import React from "react";
import Card from "../cardView/Card";

const LIMIT = 8;

const ButtonRowStyle = {
  margin: "auto"
};

const ButtonStyle = {
  margin: "1rem 1rem 1rem 1rem"
};

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    let idx = 0;
    let min = LIMIT > props.leaders.length ? props.leaders.length : LIMIT;
    let sublist = props.leaders.slice(0, min);
    this.state = { idx, min, sublist, ...this.state };
  }

  onBack = () => {
    if (this.state.idx - this.state.min >= 0) {
      let idx = this.state.idx - this.state.min;
      this.setState((state, props) => ({
        idx,
        sublist: this.props.leaders.slice(idx, this.state.idx)
      }));
    }
  };

  onNext = () => {
    if (this.state.idx + this.state.min < this.props.leaders.length) {
      let idx = this.state.idx + this.state.min;
      this.setState((state, props) => ({
        idx,
        sublist: this.props.leaders.slice(idx, idx + this.state.min)
      }));
    }
  };

  render = () => {
    return (
      <div>
        <Card list={this.state.sublist} />
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

export default Leaderboard;
