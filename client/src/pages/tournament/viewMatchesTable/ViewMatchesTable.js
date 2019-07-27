import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import TableView from "../../../components/tableView/TableView";
import { fetchTournamentMatches } from "../TournamentAction";

const LIMIT = 25;

const styles = {
  tableView: {
    width: "80%",
    margin: "auto"
  }
};

const TOURNAMENT_MATCH_HEADER = [
  {
    label: "Tournament",
    accessor: "tournament.name"
  },
  "Date",
  {
    label: "Winner",
    accessor: "winner.name"
  },
  {
    label: "Loser",
    accessor: "loser.name"
  },
  "Score"
];

class ViewMatchesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: 0,
      nextIdx: 0
    };
    const { tournamentId, fetchTournamentMatchesAction } = this.props;
    fetchTournamentMatchesAction(tournamentId);
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
    const { idx, MIN, filteredRatings } = this.state;
    if (idx + MIN < filteredRatings.length) {
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
    const { classes, tournamentStore } = this.props;
    const { matches } = tournamentStore;
    const MIN = matches.length > LIMIT ? LIMIT : matches.length;
    let sublist = matches.slice(idx, nextIdx === 0 && MIN);
    const table = {
      headers: TOURNAMENT_MATCH_HEADER,
      rows: sublist
    };
    return (
      <div>
        <div className="row">
          <TableView
            className={classes.tableView}
            tableTitle="Matches"
            {...table}
            buttonAction={{
              hasNext: idx + MIN >= matches.length,
              hasBack: idx === 0
            }}
          />
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ tournamentStore }) => ({
  tournamentStore: tournamentStore
});

export default connect(
  mapStateToProps,
  {
    fetchTournamentMatchesAction: fetchTournamentMatches
  }
)(withStyles(styles)(ViewMatchesTable));
