import React from "react";
import classNames from "classnames";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { PropTypes } from "prop-types";

const style = {
  headerDiv: {
    marginTop: "-1rem",
    width: "100%",
    height: "40rem",
    overflow: "hidden",
    position: "relative",
    background: "black",
    marginBottom: "2rem"
  },
  headerImg: { width: "100%", minHeight: "100%", opacity: "0.7" },
  headerContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center"
  },
  headerText: { color: "white" }
};

class BillboardHeader extends React.Component {
  render() {
    const { photoSrc, title, details, classes } = this.props;
    return (
      <div className={classes.headerDiv}>
        <img alt="" className={classes.headerImg} src={photoSrc} />
        <div className={classes.headerContent}>
          <Typography variant="h2" className={classes.headerText} gutterBottom>
            {title}
          </Typography>
          {details.map(detail => (
            <Typography variant="h5" className={classes.headerText}>
              {detail}
            </Typography>
          ))}
        </div>
      </div>
    );
  }
}

BillboardHeader.propTypes = {
  photoSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string
};

BillboardHeader.defaultProps = {
  details: []
};

export default withStyles(style)(BillboardHeader);
