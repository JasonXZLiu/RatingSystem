"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CREATE_MATCH = undefined;
exports.setup = setup;

var _repository = require("../repository");

var _player = require("../schemas/player");

var _match = require("../schemas/match");

var _tournament = require("../schemas/tournament");

var _ratingCalculation = require("../schemas/ratingCalculation");

var _countryCode = require("../schemas/countryCode");

var _filterSelector = require("../schemas/filterSelector");

var _playerData = require("./playerData");

var _matchData = require("./matchData");

var _filterData = require("./filterData");

var _countryCodeData = require("./countryCodeData");

var _tournamentData = require("./tournamentData");

var _ratingCalculationData = require("./ratingCalculationData");

var _matchDTO = require("../models/matchDTO");

var CREATE_MATCH = exports.CREATE_MATCH = "CREATE_MATCH";

var checkIfDatabaseSeeded = async function checkIfDatabaseSeeded() {
  var countryCodeCount = await _countryCode.CountryCode.estimatedDocumentCount();
  var filterSelectorCount = await _filterSelector.FilterSelector.estimatedDocumentCount();
  var ratingCalculationCount = await _ratingCalculation.RatingCalculation.estimatedDocumentCount();
  var playerCount = await _player.Player.estimatedDocumentCount();
  var tournamentCount = await _tournament.Tournament.estimatedDocumentCount();
  var matchCount = await _match.Match.estimatedDocumentCount();

  return countryCodeCount === 0 && filterSelectorCount === 0 && playerCount === 0 && tournamentCount === 0 && matchCount === 0 && ratingCalculationCount === 0;
};

async function setup() {
  var checkIfSeeded = await checkIfDatabaseSeeded();

  if (checkIfSeeded) {
    await _countryCode.CountryCode.create(_countryCodeData.countryCodeData);
    await _filterSelector.FilterSelector.create(_filterData.filterData);
    await _ratingCalculation.RatingCalculation.create(_ratingCalculationData.ratingCalculationData);
    await _player.Player.create(_playerData.playerData);
    await _tournament.Tournament.create(_tournamentData.tournamentData);
    var matches = await (0, _matchDTO.toMatchObjects)(_matchData.matchData);
    await _repository.nc.publish(CREATE_MATCH, JSON.stringify(matches));

    console.log("seed data succeeded");
  } else console.log("database already seeded");
}