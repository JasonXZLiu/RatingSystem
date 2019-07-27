import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

const LoadingIndicator = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item style={{ marginBottom: "1rem" }}>
        <CircularProgress size="2rem" style={{ color: "#9FA8DA" }} />
      </Grid>
      <Grid item>
        <h4 style={{ color: "#5C6BC0" }}>
          <span role="img" aria-label="aria-label">
            🏓
          </span>
          &nbsp;Loading players&nbsp;
          <span role="img" aria-label="aria-label">
            🏓
          </span>
        </h4>
      </Grid>
    </Grid>
  );
};

export default LoadingIndicator;
