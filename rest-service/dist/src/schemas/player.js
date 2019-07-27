"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerMatch = exports.Player = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playerSchema = new _mongoose2.default.Schema({
  id: Number,
  name: String,
  // can extract rating into separate schema
  rating: [{
    periodDate: Date,
    rating: Number
  }],
  newRating: {
    periodDate: Date,
    rating: Number
  },
  temporaryRating: {
    rating: Number,
    matches: [{ type: _mongoose.Schema.Types.ObjectId, ref: "Match" }]
  },
  province: String,
  sex: String,
  age: Number,
  matchHistory: [{ type: _mongoose.Schema.Types.ObjectId, ref: "PlayerMatch" }]
});

var matchFromPlayerPerspectiveSchema = new _mongoose2.default.Schema({
  matchId: { type: _mongoose.Schema.Types.ObjectId, ref: "Match" },
  tournament: String,
  date: Date,
  opponent: String,
  opposingRating: Number,
  result: String,
  score: [String]
}, { collection: "playermatches" });

var Player = exports.Player = _mongoose2.default.model("Player", playerSchema);
var PlayerMatch = exports.PlayerMatch = _mongoose2.default.model("PlayerMatch", matchFromPlayerPerspectiveSchema);