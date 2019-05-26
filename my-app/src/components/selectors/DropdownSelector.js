import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select } from "@material-ui/core";

class DropdownSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  renderOptions = options => {
    return options.map(option => {
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    });
  };

  render = () => {
    const { data, value, handleSelectorChange } = this.props;
    const { title, options } = data;
    return (
      <FormControl style={{ width: "8rem" }}>
        <InputLabel htmlFor="select-native-simple">{title}</InputLabel>
        <Select
          inputProps={{
            name: "select",
            id: "select-native-simple"
          }}
          value={value}
          onChange={e => handleSelectorChange(e, title)}
        >
          <option value="" />
          {this.renderOptions(options)}
        </Select>
      </FormControl>
    );
  };
}

DropdownSelector.propTypes = {
  data: PropTypes.shape({
    input: PropTypes.string,
    options: PropTypes.array
  }).isRequired,
  value: PropTypes.string,
  handleSelectorChange: PropTypes.func.isRequired
};

DropdownSelector.defaultProps = {
  value: ""
};

export default DropdownSelector;
