import React, { Component } from "react";
import { Grid, TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import DropdownSelector from "../../../components/selectors/DropdownSelector";
import { getResultFilter } from "../../../controllers/filterController";

class PlayerFilter extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      input: "",
      options: []
    };
    this.state = {
      resultFilter: initialState
    };
  }

  componentDidMount() {
    getResultFilter().then(response =>
      this.setState({ resultFilter: response })
    );
  }

  render = () => {
    const {
      handleSearchFieldChange,
      handleSelectorChange,
      handleDateChange,
      resultValue,
      dateValue
    } = this.props;
    const { resultFilter } = this.state;
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
              label="Search by tournament or opponent"
              type="search"
              margin="normal"
              variant="outlined"
              onChange={handleSearchFieldChange}
              style={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              autoOk
              animateYearScrolling
              label="Date"
              clearable
              value={dateValue}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={3}>
            <DropdownSelector
              data={resultFilter}
              value={resultValue}
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
