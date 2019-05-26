"use strict";

var fs = require("fs");

function getJSON() {
  var data = fs.readFileSync("./src/playerRepository/playerData.json", "utf8");
  return data;
}

function getRatings(params) {
  var data = getJSON();
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
    player.lastplayed = player.matchHistory && player.matchHistory[0].date;
    player.ranking = count;
  });
  return players;
}

function getPlayers(params) {
  return getJSON();
}

module.exports = getPlayers, getRatings;