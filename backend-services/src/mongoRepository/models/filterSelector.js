import mongoose, { Schema } from "mongoose";

const filterSelectorSchema = new mongoose.Schema(
  {
    title: String,
    options: [
      {
        label: String,
        value: String
      }
    ]
  },
  { _id: false }
);

export const FilterSelector = mongoose.model(
  "FilterSelector",
  filterSelectorSchema
);
