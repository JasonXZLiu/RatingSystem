import mongoose, { Schema } from "mongoose";

const countryCodeSchema = new mongoose.Schema(
  {
    code: String,
    name: String
  },
  { _id: false }
);

export const CountryCode = mongoose.model("CountryCode", countryCodeSchema);
