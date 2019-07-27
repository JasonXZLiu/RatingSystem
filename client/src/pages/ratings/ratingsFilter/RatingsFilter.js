import React, { Component } from "react";
import { Grid, TextField } from "@material-ui/core";
import DropdownSelector from "../../../components/selectors/DropdownSelector";
import {
  getSexFilter,
  getProvinceFilter,
  getCategoryFilter
} from "../../../controllers/filterController";

class PlayerFilter extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      input: "",
      options: []
    };
    this.state = {
      categoryFilter: initialState,
      sexFilter: initialState,
      provinceFilter: initialState
    };
  }

  componentDidMount() {
    getSexFilter()
      .then(response => this.setState({ sexFilter: response }))
      .then(data =>
        getProvinceFilter().then(response =>
          this.setState({ provinceFilter: response })
        )
      )
      .then(
        getCategoryFilter().then(response =>
          this.setState({ categoryFilter: response })
        )
      );
  }

  render = () => {
    const {
      handleSearchFieldChange,
      handleSelectorChange,
      sexValue,
      categoryValue,
      provinceValue
    } = this.props;
    const { sexFilter, categoryFilter, provinceFilter } = this.state;
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
              data={categoryFilter}
              value={categoryValue}
              handleSelectorChange={handleSelectorChange}
              style={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <DropdownSelector
              data={provinceFilter}
              value={provinceValue}
              handleSelectorChange={handleSelectorChange}
              style={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <DropdownSelector
              data={sexFilter}
              value={sexValue}
              handleSelectorChange={handleSelectorChange}
              style={{ width: "80%" }}
            />
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default PlayerFilter;
