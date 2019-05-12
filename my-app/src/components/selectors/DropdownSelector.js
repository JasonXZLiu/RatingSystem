import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

const DropdownSelector = () => {
  return (
    <FormControl>
      <InputLabel htmlFor="age-native-simple">Age</InputLabel>
      <Select
        inputProps={{
          name: "age",
          id: "age-native-simple"
        }}
      >
        <option value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </FormControl>
  );
};

export default DropdownSelector;
