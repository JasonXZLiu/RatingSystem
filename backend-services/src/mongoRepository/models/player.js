import mongoose, { Schema } from "mongoose";

const playerSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  id: Number,
  name: String,
  rating: [Number],
  province: String,
  sex: String,
  age: Number
});

// const playerSchema = new mongoose.Schema({
//   _id: Schema.Types.ObjectId,
//   id: Number,
//   name: String,
//   rating: Number,
//   province: String,
//   sex: String,
//   age: Number,
//   matchHistory: [
//     {
//       date: Date,
//       tournament: String,
//       opponent: String,
//       opposingRating: String,
//       result: String,
//       ratingChange: String
//     }
//   ]
// });

export const Player = mongoose.model("Player", playerSchema);
