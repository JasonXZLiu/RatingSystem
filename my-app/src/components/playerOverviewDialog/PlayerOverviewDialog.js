import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  withStyles,
  DialogContent,
  Grid
} from "@material-ui/core";
import TableView from "../tableView/TableView";

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
  "Name",
  "Rating",
  "Win/Loss",
  "Rating Change"
];

class PlayerOverviewDialog extends React.Component {
  render() {
    const { onClose, player, classes, ...other } = this.props;

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        {...other}
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
              {player.name} Match History
            </Grid>
            <Grid item xs={4}>
              {player.rating}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <TableView
            styling={tableViewStyle}
            table={{ headers: MATCH_HISTORY_HEADER, rows: player.matchHistory }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

PlayerOverviewDialog.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(PlayerOverviewDialog);
