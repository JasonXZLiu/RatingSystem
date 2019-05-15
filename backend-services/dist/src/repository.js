"use strict";

var getRatings = require("./playerRepository/playerRepository");
var getPlayers = require("./playerRepository/playerRepository");

function getData(request, params) {
  switch (request) {
    case "PLAYERS":
      return getPlayers(params);
    case "GENDER_SELECTOR":
      return selectors.sex;
    case "PROVINCE_SELECTORr":
      return selectors.province;
    case "CATEGORY_SELECTOR":
      return selectors.category;
    case "RATINGS":
      return getRatings(params);
    default:
      return "NOTHING HERE";
  }
}

module.exports = getData;