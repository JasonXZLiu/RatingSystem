"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSON = getJSON;
exports.getSex = getSex;
exports.getProvince = getProvince;
exports.getCategory = getCategory;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getJSON() {
  var data = _fs2.default.readFileSync("./src/filterRepository/filterData.json", "utf8");
  return data;
}

function getSex(params) {
  var data = JSON.parse(getJSON());
  return data.sex;
}

function getProvince(params) {
  var data = JSON.parse(getJSON());
  return data.province;
}

function getCategory(params) {
  var data = JSON.parse(getJSON());
  return data.category;
}