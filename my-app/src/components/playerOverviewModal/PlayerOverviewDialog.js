import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle } from "@material-ui/core";

class PlayerOverviewDialog extends React.Component {
  render() {
    const { onClose, player, ...other } = this.props;

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">{player.name}</DialogTitle>
        <div>{player.rating}</div>
      </Dialog>
    );
  }
}

PlayerOverviewDialog.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default PlayerOverviewDialog;
