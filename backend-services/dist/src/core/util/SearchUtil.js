"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var searchByStringValue = exports.searchByStringValue = function searchByStringValue(value, target) {
  return target === "undefined" || value.toLowerCase().includes(target.toLowerCase());
};

var searchByNumberValue = exports.searchByNumberValue = function searchByNumberValue(value, target) {
  return target === "undefined" || value <= parseInt(target);
};