import mongoose, { Schema } from "mongoose";

const ratingCalculationSchema = new mongoose.Schema({
  pointDifference: Number,
  winner: Number,
  loser: Number
});

export const RatingCalculation = mongoose.model(
  "RatingCalculation",
  ratingCalculationSchema
);
