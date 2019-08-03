"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertData = exports.nc = exports.CREATE_RATING_CALCULATION = exports.CREATE_TOURNAMENT = exports.CREATE_MATCH = exports.CREATE_PLAYER = exports.CREATE_FILTER_SELECTOR = exports.CREATE_COUNTRY_CODE = exports.postData = exports.getData = exports.VERIFY_TOURNAMENT_MATCHES = exports.SUBMIT_TOURNAMENT_MATCHES = exports.CALCULATE_RATINGS = exports.PLAYER_MATCH_HISTORY = exports.MATCHES_BY_PLAYER = exports.MATCHES_BY_TOURNAMENT = exports.MATCH_BY_ID = exports.MATCHES = exports.COUNTRY_CODE = exports.TOURNAMENT_BY_ID = exports.TOURNAMENTS = exports.RESULT_FILTER = exports.CATEGORY_FILTER = exports.PROVINCE_FILTER = exports.SEX_FILTER = exports.RATINGS = exports.PLAYER_BY_ID = exports.PLAYERS = undefined;

var _nats = require("nats");

var _nats2 = _interopRequireDefault(_nats);

var _playerRepository = require("./repositories/playerRepository");

var _filterSelectorRepository = require("./repositories/filterSelectorRepository");

var _tournamentRepository = require("./repositories/tournamentRepository");

var _tournamentService = require("./services/tournamentService");

var _countryCodeRepository = require("./repositories/countryCodeRepository");

var _matchRepository = require("./repositories/matchRepository");

var _ratingCalculationService = require("./services/ratingCalculationService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLAYERS = exports.PLAYERS = "PLAYERS";
var PLAYER_BY_ID = exports.PLAYER_BY_ID = "PLAYER_BY_ID";
var RATINGS = exports.RATINGS = "RATINGS";
var SEX_FILTER = exports.SEX_FILTER = "SEX_FILTER";
var PROVINCE_FILTER = exports.PROVINCE_FILTER = "PROVINCE_FILTER";
var CATEGORY_FILTER = exports.CATEGORY_FILTER = "CATEGORY_FILTER";
var RESULT_FILTER = exports.RESULT_FILTER = "RESULT_FILTER";
var TOURNAMENTS = exports.TOURNAMENTS = "TOURNAMENTS";
var TOURNAMENT_BY_ID = exports.TOURNAMENT_BY_ID = "TOURNAMENT_BY_ID";
var COUNTRY_CODE = exports.COUNTRY_CODE = "COUNTRY_CODE";
var MATCHES = exports.MATCHES = "MATCHES";
var MATCH_BY_ID = exports.MATCH_BY_ID = "MATCH_BY_ID";
var MATCHES_BY_TOURNAMENT = exports.MATCHES_BY_TOURNAMENT = "MATCHES_BY_TOURNAMENT";
var MATCHES_BY_PLAYER = exports.MATCHES_BY_PLAYER = "MATCHES_BY_PLAYER";
var PLAYER_MATCH_HISTORY = exports.PLAYER_MATCH_HISTORY = "PLAYER_MATCH_HISTORY";
var CALCULATE_RATINGS = exports.CALCULATE_RATINGS = "CALCULATE_RATINGS";
var SUBMIT_TOURNAMENT_MATCHES = exports.SUBMIT_TOURNAMENT_MATCHES = "SUBMIT_TOURNAMENT_MATCHES";
var VERIFY_TOURNAMENT_MATCHES = exports.VERIFY_TOURNAMENT_MATCHES = "VERIFY_TOURNAMENT_MATCHES";

var getData = exports.getData = function getData(request, params) {
  switch (request) {
    case PLAYERS:
      return (0, _playerRepository.getPlayers)();
    case PLAYER_BY_ID:
      return (0, _playerRepository.getPlayerById)(params);
    case RATINGS:
      return (0, _playerRepository.getRatings)(params);
    case SEX_FILTER:
      return (0, _filterSelectorRepository.getSex)();
    case PROVINCE_FILTER:
      return (0, _filterSelectorRepository.getProvince)();
    case CATEGORY_FILTER:
      return (0, _filterSelectorRepository.getCategory)();
    case RESULT_FILTER:
      return (0, _filterSelectorRepository.getResult)();
    case TOURNAMENTS:
      return (0, _tournamentRepository.getTournaments)(params);
    case TOURNAMENT_BY_ID:
      return (0, _tournamentRepository.getTournamentById)(params);
    case COUNTRY_CODE:
      return (0, _countryCodeRepository.getCountryCode)(params);
    case MATCHES:
      return (0, _matchRepository.getMatches)();
    case MATCH_BY_ID:
      return (0, _matchRepository.getMatchById)(params);
    case MATCHES_BY_TOURNAMENT:
      return (0, _matchRepository.getMatchesByTournamentId)(params);
    case MATCHES_BY_PLAYER:
      return (0, _matchRepository.getMatchesByPlayerId)(params);
    case PLAYER_MATCH_HISTORY:
      return (0, _playerRepository.getPlayerMatchHistory)(params);
    default:
      return "NOTHING HERE";
  }
};

var postData = exports.postData = function postData(request, params) {
  switch (request) {
    case VERIFY_TOURNAMENT_MATCHES:
      return (0, _tournamentService.verifyTournamentMatches)(params);
    case SUBMIT_TOURNAMENT_MATCHES:
      return (0, _tournamentService.submitTournamentMatches)(params);
    case CALCULATE_RATINGS:
      return (0, _ratingCalculationService.calculateRatings)();
    default:
      break;
  }
};

var CREATE_COUNTRY_CODE = exports.CREATE_COUNTRY_CODE = "CREATE_COUNTRY_CODE";
var CREATE_FILTER_SELECTOR = exports.CREATE_FILTER_SELECTOR = "CREATE_FILTER_SELECTOR";
var CREATE_PLAYER = exports.CREATE_PLAYER = "CREATE_PLAYER";
var CREATE_MATCH = exports.CREATE_MATCH = "CREATE_MATCH";
var CREATE_TOURNAMENT = exports.CREATE_TOURNAMENT = "CREATE_TOURNAMENT";
var CREATE_RATING_CALCULATION = exports.CREATE_RATING_CALCULATION = "CREATE_RATING_CALCULATION";

var nc = exports.nc = _nats2.default.connect({ url: process.env.NATS_URI });

var insertData = exports.insertData = async function insertData(request, params) {
  switch (request) {
    case CREATE_COUNTRY_CODE:
    case CREATE_FILTER_SELECTOR:
    case CREATE_MATCH:
    case CREATE_PLAYER:
    case CREATE_TOURNAMENT:
    case CREATE_RATING_CALCULATION:
      return nc.publish(request, JSON.stringify(params));
  }
};