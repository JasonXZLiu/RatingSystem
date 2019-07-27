"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlayers = getPlayers;
exports.getPlayer = getPlayer;
exports.getPlayerById = getPlayerById;
exports.getPlayerIdByName = getPlayerIdByName;
exports.getPlayerObjectIdById = getPlayerObjectIdById;
exports.getPlayerIdToVerifyByName = getPlayerIdToVerifyByName;
exports.getPlayerMatchHistory = getPlayerMatchHistory;
exports.getRatings = getRatings;

var _player = require("../schemas/player");

async function getPlayers() {
  return await _player.Player.find();
}

async function getPlayer(params) {
  return await _player.Player.findOne(params);
}

async function getPlayerById(params) {
  var findParams = {
    id: params.playerId
  };
  return await _player.Player.findOne(findParams).populate("matchHistory");
}

async function getPlayerIdByName(params) {
  return await _player.Player.find(params).then(function (data) {
    if (data.length > 1) return data.map(function (data) {
      return data._id;
    });else return data[0]._id;
  });
}

async function getPlayerObjectIdById(id) {
  return await _player.Player.find({ id: id }).then(function (data) {
    return data[0]._id;
  });
}

async function getPlayerIdToVerifyByName(params) {
  return await _player.Player.find(params).then(function (data) {
    return data.map(function (data) {
      return data.id + " - " + data.name;
    });
  });
}

async function getPlayerMatchHistory(params) {
  var findParams = {
    id: params.playerId
  };

  if (!(params.searchValue || params.resultValue)) {
    return await _player.Player.findOne(findParams).populate("matchHistory").then(function (player) {
      return player.matchHistory;
    });
  }

  return await _player.Player.findOne(findParams).populate("matchHistory").then(function (player) {
    return player.matchHistory.filter(function (match) {
      var searchValue = params.searchValue !== "undefined" ? params.searchValue.toLowerCase() : "";
      var resultValue = params.resultValue !== "undefined" ? params.resultValue : "";
      console.log(searchValue);
      if ((match.opponent.toLowerCase().includes(searchValue) || match.tournament.toLowerCase().includes(searchValue)) && match.result.includes(resultValue)) {
        return match;
      }
    });
  });
}

async function getRatings(params) {
  var findParams = {};
  if (params) {
    if (params.searchValue !== "undefined") findParams.name = {
      $regex: params.searchValue,
      $options: "mi"
    };
    if (params.sexValue !== "undefined") findParams.sex = params.sexValue;
    if (params.provinceValue !== "undefined") findParams.province = params.provinceValue;
    if (params.categoryValue !== "undefined") findParams.$where = "this.age < " + parseInt(params.categoryValue);
  }
  console.log("find parameters: ");
  console.log(findParams);
  var count = 1;
  var playerRankings = await _player.Player.find().sort({ "rating.rating": -1 }).select({ _id: 0 }).then(function (players) {
    return players.map(function (player) {
      return {
        id: player.id,
        ranking: count++
      };
    });
  });
  // TODO: jasonxzliu: switch to es2018 for spread operator
  return await _player.Player.find(findParams).sort({ "rating.rating": -1 }).then(function (players) {
    return players.map(function (player) {
      return {
        id: player.id,
        name: player.name,
        province: player.province,
        sex: player.sex,
        age: player.age,
        ranking: playerRankings.filter(function (ranking) {
          return ranking.id === player.id;
        })[0].ranking,
        rating: player.rating
      };
    });
  });
}