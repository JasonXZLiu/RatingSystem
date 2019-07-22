import mongoose, { Schema } from "mongoose";

const filterSelectorSchema = new mongoose.Schema({
  title: String,
  options: [
    {
      label: String,
      value: String
    }
  ]
});

export const FilterSelector = mongoose.model(
  "FilterSelector",
  filterSelectorSchema
);
