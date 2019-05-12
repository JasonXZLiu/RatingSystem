import React from "react";
import { Grid, TextField } from "@material-ui/core";
import DropdownSelector from "../selectors/DropdownSelector";
import get from "../../util/Repository";

class LeaderboardFilter extends React.Component {
  render = () => {
    const {
      handleSearchFieldChange,
      handleSelectorChange,
      genderValue,
      categoryValue,
      provinceValue
    } = this.props;
    return (
      <div style={{ width: "100%", padding: "0 5%", marginBottom: "2rem" }}>
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="center"
          spacing={12}
        >
          <Grid item xs={6}>
            <TextField
              id="outlined-search"
              label="Search by name"
              type="search"
              margin="normal"
              variant="outlined"
              onChange={handleSearchFieldChange}
              style={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <DropdownSelector
              data={get("CATEGORY")}
              value={categoryValue}
              handleSelectorChange={handleSelectorChange}
              style={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <DropdownSelector
              data={get("PROVINCE")}
              value={provinceValue}
              handleSelectorChange={handleSelectorChange}
              style={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <DropdownSelector
              data={get("GENDER")}
              value={genderValue}
              handleSelectorChange={handleSelectorChange}
              style={{ width: "80%" }}
            />
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default LeaderboardFilter;
