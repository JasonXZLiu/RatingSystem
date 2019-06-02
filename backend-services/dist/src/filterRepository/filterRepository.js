"use strict";

var fs = require("fs");

function getJSON() {
  var data = fs.readFileSync("./src/filterRepository/filterData.json", "utf8");
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

module.exports = {
  getSex: getSex,
  getProvince: getProvince,
  getCategory: getCategory
};