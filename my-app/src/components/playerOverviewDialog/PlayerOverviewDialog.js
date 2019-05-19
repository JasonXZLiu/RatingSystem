import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  withStyles,
  DialogContent,
  Grid
} from "@material-ui/core";
import { getPlayerById } from "../../controllers/playerController";
import RatingChart from "../ratingChart/RatingChart";

const styles = {
  dialog: {
    padding: "2rem 2rem 2rem 2rem",
    textAlign: "center",
    alignItems: "center"
  }
};

class PlayerOverviewDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { player: [] };
    getPlayerById(props.player.id).then(response =>
      this.setState({ player: response })
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      getPlayerById(this.props.player.id).then(response => {
        this.setState({ player: response });
      });
    }
  }

  render = () => {
    const { onClose, classes, ...other } = this.props;
    const { player } = this.state;
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
          <RatingChart />
        </DialogContent>
      </Dialog>
    );
  };
}

PlayerOverviewDialog.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(PlayerOverviewDialog);
