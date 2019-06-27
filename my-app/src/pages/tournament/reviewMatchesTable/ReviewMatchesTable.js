import React, { Component } from "react";
import {
  withStyles,
  Typography,
  Select,
  MenuItem,
  Icon
} from "@material-ui/core";
import { connect } from "react-redux";
import classNames from "classnames";
import TableView from "../../../components/tableView/TableView";
import {
  cancelSubmitMatches,
  submitMatches,
  updateMatch
} from "../TournamentAction";

const styles = {
  buttonRowStyle: { margin: "auto" },
  buttonStyle: { margin: "1rem 1rem 1rem 1rem" },
  tableView: {
    width: "80%",
    margin: "auto"
  }
};

const TOURNAMENT_MATCH_HEADER = [
  "Tournament",
  "Date",
  {
    label: "Winner",
    enableSelect: true
  },
  {
    label: "Loser",
    enableSelect: true
  },
  "Score",
  {
    label: "Status",
    valueFunction: function(rowValue) {
      if (rowValue.loser instanceof Array && rowValue.loser.length > 1)
        return <Icon style={{ color: "#f44336" }}>error_outline</Icon>;
      else return <Icon style={{ color: "#00BFA5" }}>check_circle</Icon>;
    }
  }
];

const PlayerSelector = ({ cellValues, onChange }) => {
  const [value, setValue] = React.useState("");

  const handleChange = event => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      style={{ width: "10rem", margin: "0", padding: "-1", fontSize: "1rem" }}
    >
      {cellValues.map(value => (
        <MenuItem value={value}>{value}</MenuItem>
      ))}
    </Select>
  );
};

class ReviewMatchesTable extends Component {
  constructor(props) {
    super(props);

    const { tournamentStore } = this.props;
    const { matches } = tournamentStore;
    this.state = {
      matches
    };
  }

  onCancel = () => {
    const { tournamentId, cancelSubmitMatchesAction } = this.props;
    cancelSubmitMatchesAction(tournamentId);
  };

  onSubmit = () => {
    const { tournamentId, submitMatchesAction, tournamentStore } = this.props;
    const { matchesToSubmit } = tournamentStore;
    submitMatchesAction({ tournamentId, matchesToSubmit });
  };

  handleSelectorChange = (row, column) => newValue => {
    const { updateMatchAction } = this.props;
    updateMatchAction({ row, column, newValue });
  };

  render() {
    const { classes, tournamentStore } = this.props;
    const { matchesToSubmit, matchesToBeReviewed } = tournamentStore;
    const matches = [...matchesToSubmit];
    const table = {
      headers: TOURNAMENT_MATCH_HEADER,
      rows: matches
    };
    return (
      <div>
        <div className="row">
          <Typography variant="h5" style={{ color: "#00695C" }}>
            <strong>Review Submitted Matches</strong>
          </Typography>
          <TableView
            className={classes.tableView}
            {...table}
            action={{
              selector: {
                component: PlayerSelector,
                onChange: this.handleSelectorChange
              }
            }}
            buttons={false}
          />
        </div>
        <div className="row">
          <div className={classes.buttonRowStyle}>
            <button
              type="button"
              className={classNames("btn btn-light", classes.buttonStyle)}
              onClick={this.onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={classNames("btn btn-success", classes.buttonStyle)}
              disabled={matchesToBeReviewed > 0}
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tournamentStore }) => ({
  tournamentStore: tournamentStore
});

export default connect(
  mapStateToProps,
  {
    cancelSubmitMatchesAction: cancelSubmitMatches,
    submitMatchesAction: submitMatches,
    updateMatchAction: updateMatch
  }
)(withStyles(styles)(ReviewMatchesTable));
