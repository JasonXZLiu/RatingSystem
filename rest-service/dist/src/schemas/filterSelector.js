"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSelector = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterSelectorSchema = new _mongoose2.default.Schema({
  title: String,
  options: [{
    label: String,
    value: String
  }]
});

var FilterSelector = exports.FilterSelector = _mongoose2.default.model("FilterSelector", filterSelectorSchema);