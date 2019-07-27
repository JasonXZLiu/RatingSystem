"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRatingCalculation = getRatingCalculation;

var _ratingCalculation = require("../schemas/ratingCalculation");

async function getRatingCalculation(params) {
  var ratingChange = await _ratingCalculation.RatingCalculation.findOne().where("pointDifference").lt(params.pointDifference).sort("-pointDifference").then(function (data) {
    return data;
  });
  return ratingChange || _ratingCalculation.RatingCalculation.findOne().sort("-pointDifference").then(function (data) {
    return data;
  });
}