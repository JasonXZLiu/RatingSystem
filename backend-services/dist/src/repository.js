"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = exports.COUNTRY_CODE = exports.TOURNAMENT = exports.TOURNAMENTS = exports.CATEGORY_FILTER = exports.PROVINCE_FILTER = exports.SEX_FILTER = exports.RATINGS = exports.PLAYER_BY_ID = exports.PLAYERS = undefined;

var _playerRepository = require("./core/playerRepository/playerRepository");

var _filterRepository = require("./core/filterRepository/filterRepository");

var _tournamentRepository = require("./core/tournamentRepository/tournamentRepository");

var _countryRepository = require("./core/countryRepository/countryRepository");

var PLAYERS = exports.PLAYERS = "PLAYERS";
var PLAYER_BY_ID = exports.PLAYER_BY_ID = "PLAYER_BY_ID";
var RATINGS = exports.RATINGS = "RATINGS";
var SEX_FILTER = exports.SEX_FILTER = "SEX_FILTER";
var PROVINCE_FILTER = exports.PROVINCE_FILTER = "PROVINCE_FILTER";
var CATEGORY_FILTER = exports.CATEGORY_FILTER = "CATEGORY_FILTER";
var TOURNAMENTS = exports.TOURNAMENTS = "TOURNAMENTS";
var TOURNAMENT = exports.TOURNAMENT = "TOURNAMENT";
var COUNTRY_CODE = exports.COUNTRY_CODE = "COUNTRY_CODE";

var getData = exports.getData = function getData(request, params) {
  switch (request) {
    case PLAYERS:
      return (0, _playerRepository.getPlayers)();
    case PLAYER_BY_ID:
      return (0, _playerRepository.getPlayerById)(params);
    case RATINGS:
      return (0, _playerRepository.getRatings)(params);
    case SEX_FILTER:
      return (0, _filterRepository.getSex)(params);
    case PROVINCE_FILTER:
      return (0, _filterRepository.getProvince)(params);
    case CATEGORY_FILTER:
      return (0, _filterRepository.getCategory)(params);
    case TOURNAMENTS:
      return (0, _tournamentRepository.getTournaments)(params);
    case TOURNAMENT:
      return (0, _tournamentRepository.getTournamentById)(params);
    case COUNTRY_CODE:
      return (0, _countryRepository.getCountryCode)(params);
    default:
      return "NOTHING HERE";
  }
};