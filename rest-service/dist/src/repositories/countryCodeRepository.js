"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountryCode = getCountryCode;
exports.getSyncCountryCode = getSyncCountryCode;

var _countryCodeData = require("../setup/countryCodeData.js");

var _countryCode = require("../schemas/countryCode");

async function getCountryCode(params) {
  var findParams = {
    name: params.countryName
  };
  return await _countryCode.CountryCode.findOne(findParams).then(function (data) {
    return data.code;
  });
}

var searchByName = function searchByName(countries, name) {
  return countries.filter(function (country) {
    return country.name === name;
  });
};

function getSyncCountryCode(params) {
  return searchByName(_countryCodeData.countryCodeData, params.countryName);
}