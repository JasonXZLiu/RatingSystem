"use strict";

var fs = require("fs");

function getJSON() {
  var data = fs.readFileSync("./src/playerRepository/playerData.json", "utf8");
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

function searchByStringValue(value, target) {
  return target === "undefined" || value.toLowerCase().includes(target.toLowerCase());
}
function searchByNumberValue(value, target) {
  return target === "undefined" || value <= parseInt(target);
}

function filterRatings(ratings, params) {
  return ratings.filter(function (rating) {
    return searchByStringValue(rating.name, params.searchValue);
  }).filter(function (rating) {
    return searchByStringValue(rating.sex, params.sexValue);
  }).filter(function (rating) {
    return searchByStringValue(rating.province, params.provinceValue);
  }).filter(function (rating) {
    return searchByNumberValue(rating.age, params.categoryValue);
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

module.exports = {
  getPlayers: getPlayers,
  getPlayerById: getPlayerById,
  getMatchHistoryById: getMatchHistoryById,
  getRatings: getRatings
};