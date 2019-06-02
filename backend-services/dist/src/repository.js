"use strict";

var playerRepository = require("./playerRepository/playerRepository");
var getPlayers = playerRepository.getPlayers;
var getPlayerById = playerRepository.getPlayerById;
var getMatchHistoryById = playerRepository.getMatchHistoryById;
var getRatings = playerRepository.getRatings;
var filterRepository = require("./filterRepository/filterRepository");
var getSex = filterRepository.getSex;
var getCategory = filterRepository.getCategory;
var getProvince = filterRepository.getProvince;

var PLAYERS = "PLAYERS";
var PLAYER_BY_ID = "PLAYER_BY_ID";
var RATINGS = "RATINGS";
var SEX_FILTER = "SEX_FILTER";
var PROVINCE_FILTER = "PROVINCE_FILTER";
var CATEGORY_FILTER = "CATEGORY_FILTER";

function getData(request, params) {
  switch (request) {
    case PLAYERS:
      return getPlayers();
    case PLAYER_BY_ID:
      return getPlayerById(params);
    case RATINGS:
      return getRatings(params);
    case SEX_FILTER:
      return getSex(params);
    case PROVINCE_FILTER:
      return getProvince(params);
    case CATEGORY_FILTER:
      return getCategory(params);
    default:
      return "NOTHING HERE";
  }
}

module.exports = getData;