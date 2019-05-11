import React from "react";
import { Grid } from "@material-ui/core";
import DropdownSelector from "../selectors/DropdownSelector";

const LeaderboardFilter = () => {
  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      justify="center"
      spacing={16}
    >
      <DropdownSelector />
    </Grid>
  );
};

export default LeaderboardFilter;
