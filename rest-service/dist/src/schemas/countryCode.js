"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountryCode = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var countryCodeSchema = new _mongoose2.default.Schema({
  code: String,
  name: String
});

var CountryCode = exports.CountryCode = _mongoose2.default.model("CountryCode", countryCodeSchema);