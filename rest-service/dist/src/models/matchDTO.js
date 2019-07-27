"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toMatchObject = toMatchObject;
exports.toMatchObjects = toMatchObjects;

var _tournamentRepository = require("../repositories/tournamentRepository");

var _playerRepository = require("../repositories/playerRepository");

async function toMatchObject(match) {
  var matchObject = {
    tournament: await (0, _tournamentRepository.getTournamentIdByName)({ name: match.tournament }),
    calculated: match.calculated,
    date: match.date,
    winner: await (0, _playerRepository.getPlayerObjectIdById)(match.winner),
    loser: await (0, _playerRepository.getPlayerObjectIdById)(match.loser),
    score: match.score
  };
  return matchObject;
}

async function toMatchObjects(data) {
  return await Promise.all(data.map(function (match) {
    return toMatchObject(match);
  }));
}