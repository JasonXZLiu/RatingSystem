"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RatingCalculation = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ratingCalculationSchema = new _mongoose2.default.Schema({
  pointDifference: Number,
  winner: Number,
  loser: Number
});

var RatingCalculation = exports.RatingCalculation = _mongoose2.default.model("RatingCalculation", ratingCalculationSchema);