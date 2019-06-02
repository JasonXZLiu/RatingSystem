"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSON = getJSON;
exports.getPlayers = getPlayers;
exports.getPlayerById = getPlayerById;
exports.getMatchHistoryById = getMatchHistoryById;
exports.filterRatings = filterRatings;
exports.getRatings = getRatings;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _SearchUtil = require("../util/SearchUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getJSON() {
  var data = _fs2.default.readFileSync("./src/playerRepository/playerData.json", "utf8");
  return data;
}

function getPlayers(params) {
  var data = JSON.parse(getJSON());
  return data.players;
}

function getPlayerById(params) {
  var id = params.playerId;
  var data = JSON.parse(getJSON());
  var player = data.players.filter(function (player) {
    return player.id == id;
  });
  return player[0];
}

function getMatchHistoryById(params) {
  var id = params.playerId;
  var data = JSON.parse(getJSON());
  var player = data.players.filter(function (player) {
    return player.id == id;
  });
  return player;
}

function filterRatings(ratings, params) {
  return ratings.filter(function (rating) {
    return (0, _SearchUtil.searchByStringValue)(rating.name, params.searchValue);
  }).filter(function (rating) {
    return (0, _SearchUtil.searchByStringValue)(rating.sex, params.sexValue);
  }).filter(function (rating) {
    return (0, _SearchUtil.searchByStringValue)(rating.province, params.provinceValue);
  }).filter(function (rating) {
    return (0, _SearchUtil.searchByNumberValue)(rating.age, params.categoryValue);
  }) || [];
}

function getRatings(params) {
  var data = JSON.parse(getJSON());
  var players = data.players;
  players.sort(function (a, b) {
    return b.rating - a.rating;
  });
  players.map(function (player) {
    player.matchHistory.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  });
  var count = 0;
  players.map(function (player) {
    count++;
    player.lastPlayed = player.matchHistory && player.matchHistory[0].date;
    player.ranking = count;
  });
  if (params) return filterRatings(players, params);else return players;
}