import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  withStyles,
  DialogContent,
  Grid
} from "@material-ui/core";
import { fetchPlayerMatchHistory } from "../PlayerAction";
import RowView from "../../../components/tableView/rowView/RowView";
import TableHeader from "../../../components/tableView/TableHeader";

const styles = {
  dialog: {
    padding: "2rem 2rem 2rem 2rem",
    textAlign: "center",
    alignItems: "center"
  }
};

const MATCH_HISTORY_HEADER = [
  "Date",
  "Tournament",
  "Opponent",
  "Opposing Rating",
  "Result"
];

class PlayerOverviewDialog extends Component {
  constructor(props) {
    super(props);

    const { fetchPlayerMatchHistoryAction } = this.props;
    const { playerId } = props;
    fetchPlayerMatchHistoryAction({ playerId });
  }

  render = () => {
    const { onClose, classes, leader, playerStore } = this.props;
    const { matchHistory } = playerStore;
    const headers = MATCH_HISTORY_HEADER;
    const rows = matchHistory;
    let count = 0;
    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={true}
        className={classes.dialog}
      >
        <DialogTitle id="simple-dialog-title">
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="center"
            spacing={16}
          >
            <Grid item xs={8}>
              {leader.name} Match History
            </Grid>
            <Grid item xs={4}>
              {leader.rating[0].rating}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <table className="table">
            <TableHeader header={headers} />
            <tbody>
              {rows.map(row => {
                count++;
                return <RowView key={count} headers={headers} rowValue={row} />;
              })}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    );
  };
}

PlayerOverviewDialog.propTypes = {
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = ({ playerStore }) => ({
  playerStore: playerStore
});

export default connect(
  mapStateToProps,
  {
    fetchPlayerMatchHistoryAction: fetchPlayerMatchHistory
  }
)(withStyles(styles)(PlayerOverviewDialog));
