import mongoose, { Schema } from "mongoose";

const matchSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  tournament: { type: Schema.Types.ObjectId, ref: "Tournament" },
  date: Date,
  winner: { type: Schema.Types.ObjectId, ref: "Player" },
  loser: { type: Schema.Types.ObjectId, ref: "Player" },
  score: [String]
});

export const Match = mongoose.model("Match", matchSchema);
