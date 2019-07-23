"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertTournaments = insertTournaments;
exports.insertTournament = insertTournament;

var _index = require("../../index");

async function insertTournaments(tournaments) {
  if (tournaments instanceof Array) {
    return await Promise.all(tournaments.map(tournament => insertMatches(tournament)));
  }

  return await insertMatch(tournaments);
}

async function insertTournament(tournament) {
  await _index.client.index({
    index: "tournament",
    body: { ...tournament
    }
  });
}