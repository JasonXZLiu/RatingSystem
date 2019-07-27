"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitTournamentMatches = exports.verifyTournamentMatches = undefined;

var _playerRepository = require("../repositories/playerRepository");

var _match = require("../schemas/match");

var _matchDTO = require("../models/matchDTO");

var _tournamentRepository = require("../repositories/tournamentRepository");

var _repository = require("../repository");

async function verifyMatchForTournament(tournament, match) {
  if (tournament.name !== match.tournament) {
    throw Error("some matches were submitted for the wrong tournament");
  }
  var winnerId = await (0, _playerRepository.getPlayerIdToVerifyByName)({ name: match.winner });
  var loserId = await (0, _playerRepository.getPlayerIdToVerifyByName)({ name: match.loser });
  var matchObject = {
    tournament: match.tournament,
    date: match.date,
    winner: winnerId,
    loser: loserId,
    score: match.score.split(";"),
    isValid: !(winnerId instanceof Array || loserId instanceof Array)
  };
  return matchObject;
}

async function verifyMatchesForTournament(tournamentId, data) {
  var tournament = await (0, _tournamentRepository.getTournamentById)({ id: tournamentId });
  var matches = await Promise.all(data.map(function (match) {
    return verifyMatchForTournament(tournament, match);
  }));
  var count = 0;
  matches.map(function (match) {
    if (match.winner instanceof Array && match.winner.length > 1 || match.loser instanceof Array && match.loser.length > 1) count++;
  });
  return { count: count, matches: matches };
}

var verifyTournamentMatches = exports.verifyTournamentMatches = async function verifyTournamentMatches(params) {
  var id = params.id,
      matches = params.matches;

  var verifiedMatches = await verifyMatchesForTournament(id, matches);
  return verifiedMatches;
};

var getMatchFromVerifiedMatches = function getMatchFromVerifiedMatches(match) {
  match.winner = match.winner[0].replace(" ", "").split("-")[0];
  match.loser = match.loser[0].replace(" ", "").split("-")[0];
  return match;
};

var submitTournamentMatches = exports.submitTournamentMatches = async function submitTournamentMatches(params) {
  var verifiedMatches = params;
  var matchesToSubmit = await Promise.all(verifiedMatches.map(function (match) {
    return getMatchFromVerifiedMatches(match);
  }));
  var matches = await (0, _matchDTO.toMatchObjects)(matchesToSubmit);
  _repository.nc.publish(_repository.CREATE_MATCH, JSON.stringify(matches));
  return matchesToSubmit;
};