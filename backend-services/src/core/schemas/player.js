import mongoose, { Schema } from "mongoose";

const playerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  rating: [Number],
  previousRating: Number,
  province: String,
  sex: String,
  age: Number,
  matchHistory: [{ type: Schema.Types.ObjectId, ref: "PlayerMatch" }]
});

const matchFromPlayerPerspectiveSchema = new mongoose.Schema(
  {
    matchId: { type: Schema.Types.ObjectId, ref: "Match" },
    tournament: String,
    date: Date,
    opponent: String,
    opposingRating: Number,
    result: String,
    score: [String]
  },
  { collection: "playermatches" }
);

export const Player = mongoose.model("Player", playerSchema);
export const PlayerMatch = mongoose.model(
  "PlayerMatch",
  matchFromPlayerPerspectiveSchema
);
