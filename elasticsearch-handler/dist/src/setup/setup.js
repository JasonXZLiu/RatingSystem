"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;

var _index = require("../../index");

var _playerRepository = require("../repositories/playerRepository");

var _tournamentRepository = require("../repositories/tournamentRepository");

var _playerData = require("./playerData");

var _tournamentData = require("./tournamentData");

const checkIfDatabaseSeeded = async () => {
  const playerCount = await _index.client.count({
    index: _playerRepository.PLAYER_INDEX
  });
  const tournamentCount = await _index.client.count({
    index: _tournamentRepository.TOURNAMENT_INDEX
  });
  return playerCount === 0 && tournamentCount === 0;
};

async function setup() {
  const checkIfSeeded = await checkIfDatabaseSeeded();

  if (checkIfSeeded) {
    await (0, _playerRepository.insertPlayers)(_playerData.playerData);
    await (0, _tournamentRepository.insertTournaments)(_tournamentData.tournamentData);
    console.log("seed data succeeded");
  } else console.log("database already seeded");
}