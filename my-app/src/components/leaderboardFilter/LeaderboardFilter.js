import React from "react";
import { Grid, TextField } from "@material-ui/core";
import DropdownSelector from "../selectors/DropdownSelector";

class LeaderboardFilter extends React.Component {
  render = () => {
    const { handleSearchFieldChange } = this.props;
    return (
      <div style={{ width: "100%", padding: "0 5%" }}>
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="center"
          spacing={16}
        >
          <Grid item xs={8}>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              margin="normal"
              variant="outlined"
              onChange={handleSearchFieldChange}
            />
          </Grid>
          <Grid item xs={4}>
            <DropdownSelector />
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default LeaderboardFilter;
