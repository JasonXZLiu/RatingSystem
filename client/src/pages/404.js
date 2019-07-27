import React from "react";
import { Grid } from "@material-ui/core";
import notFoundPhoto from "../resources/404.gif";
import NavBar from "../components/NavBar";

const NoMatch = () => {
  return (
    <div>
      <NavBar />
      <div class="container">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <img alt="" src={notFoundPhoto} />
          </Grid>
          <Grid item>
            <h3>Hmmm...</h3>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NoMatch;
