"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatches = getMatches;
exports.getMatchById = getMatchById;
exports.getMatchesByTournamentId = getMatchesByTournamentId;
exports.getMatchesByPlayerId = getMatchesByPlayerId;
exports.getMatchesBetweenDates = getMatchesBetweenDates;
exports.getMatchesToBeCalculated = getMatchesToBeCalculated;

var _match = require("../schemas/match");

var _tournamentRepository = require("./tournamentRepository");

var _playerRepository = require("./playerRepository");

async function getMatches() {
  return await _match.Match.find().populate("tournament").populate("winner").populate("loser");
}

async function getMatchById(params) {
  var findParams = {
    id: params.id
  };
  return await _match.Match.findOne(findParams);
}

async function getMatchesByTournamentId(params) {
  var tournament = await (0, _tournamentRepository.getTournamentById)(params);
  var findQueryString = "this.tournament == '" + tournament._id + "'";
  return await _match.Match.find({ $where: findQueryString }).populate("tournament").populate("winner").populate("loser");
}

async function getMatchesByPlayerId(params) {
  var player = await (0, _playerRepository.getPlayerById)(params);
  var findQueryString = "(this.loser == '" + player._id + "' || this.winner == '" + player._id + "')";
  if (params.tournamentId) {
    var tournament = await (0, _tournamentRepository.getTournamentById)(params);
    findQueryString += " && this.tournament == '" + tournament._id + "'";
  }
  console.log(findQueryString);
  return await _match.Match.find({ $where: findQueryString }).populate("tournament").populate("winner").populate("loser");
}

async function getMatchesBetweenDates(params) {
  var startDate = params.startDate;
  var endDate = params.endDate;
  return await _match.Match.find().populate("tournament").populate("winner").populate("loser").then(function (data) {
    return data.filter(function (match) {
      return match.tournament.endDate < endDate && match.tournament.endDate >= startDate;
    });
  });
}

async function getMatchesToBeCalculated(params) {
  return await _match.Match.find({ calculated: false }).populate("tournament").populate("winner").populate("loser");
}