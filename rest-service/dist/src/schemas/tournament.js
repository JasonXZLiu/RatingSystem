"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tournament = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _countryCodeRepository = require("../repositories/countryCodeRepository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locationSchema = new _mongoose2.default.Schema({
  address: String,
  city: String,
  postalCode: String,
  province: String,
  country: String
});

var tournamentSchema = new _mongoose2.default.Schema({
  id: Number,
  name: String,
  startDate: Date,
  endDate: Date,
  location: locationSchema,
  events: [String]
});

locationSchema.virtual("countryCode").get(function () {
  return (0, _countryCodeRepository.getSyncCountryCode)({
    countryName: this.country
  })[0].code;
});

locationSchema.set("toJSON", { getters: true, virtuals: true });

var Tournament = exports.Tournament = _mongoose2.default.model("Tournament", tournamentSchema);