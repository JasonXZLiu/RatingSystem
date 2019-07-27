"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSex = getSex;
exports.getProvince = getProvince;
exports.getCategory = getCategory;
exports.getResult = getResult;

var _filterSelector = require("../schemas/filterSelector");

function getSex() {
  var params = {
    title: {
      $regex: "Sex",
      $options: "mi"
    }
  };
  return _filterSelector.FilterSelector.findOne(params);
}

function getProvince() {
  var params = {
    title: {
      $regex: "province",
      $options: "mi"
    }
  };
  return _filterSelector.FilterSelector.findOne(params);
}

function getCategory() {
  var params = {
    title: {
      $regex: "category",
      $options: "mi"
    }
  };
  return _filterSelector.FilterSelector.findOne(params);
}

function getResult() {
  var params = {
    title: {
      $regex: "result",
      $options: "mi"
    }
  };
  return _filterSelector.FilterSelector.findOne(params);
}