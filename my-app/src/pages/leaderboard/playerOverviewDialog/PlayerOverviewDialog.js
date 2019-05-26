import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  withStyles,
  DialogContent,
  Grid
} from "@material-ui/core";
import TableView from "../../../components/tableView/TableView";
import RowView from "../../../components/tableView/rowView/RowView";
import TableHeader from "../../../components/tableView/TableHeader";

const styles = {
  dialog: {
    padding: "2rem 2rem 2rem 2rem",
    textAlign: "center",
    alignItems: "center"
  }
};

const tableViewStyle = {
  width: "95%",
  margin: "auto"
};

const MATCH_HISTORY_HEADER = [
  "Date",
  "Tournament",
  "Opponent",
  "Opposing Rating",
  "Result",
  "Rating Change"
];

class PlayerOverviewDialog extends Component {
  render = () => {
    const { onClose, classes, leader } = this.props;
    const headers = MATCH_HISTORY_HEADER;
    const rows = leader.matchHistory;
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
              {leader.rating}
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

export default withStyles(styles)(PlayerOverviewDialog);
