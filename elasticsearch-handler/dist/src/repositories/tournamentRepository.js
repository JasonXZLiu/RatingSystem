"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertTournaments = insertTournaments;
exports.insertTournament = insertTournament;
exports.TOURNAMENT_INDEX = void 0;

var _index = require("../../index");

const TOURNAMENT_INDEX = "tournament";
exports.TOURNAMENT_INDEX = TOURNAMENT_INDEX;

async function insertTournaments(tournaments) {
  if (tournaments instanceof Array) {
    return await Promise.all(tournaments.map(tournament => insertTournament(tournament)));
  }

  return await insertTournament(tournaments);
}

async function insertTournament(tournament) {
  console.log("tournament to be inserted", tournament);
  const {
    id,
    name,
    startDate,
    endDate,
    location,
    events
  } = tournament;
  await _index.client.index({
    index: TOURNAMENT_INDEX,
    type: TOURNAMENT_INDEX,
    body: {
      id,
      name,
      startDate,
      endDate,
      location,
      events
    }
  });
}