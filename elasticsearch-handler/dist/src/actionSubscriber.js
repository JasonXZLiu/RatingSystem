"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeActions = exports.CREATE_TOURNAMENT = exports.CREATE_PLAYER = exports.CREATE_MATCH = void 0;

var _nats = _interopRequireDefault(require("nats"));

var _matchRepository = require("./repositories/matchRepository");

var _playerRepository = require("./repositories/playerRepository");

var _tournamentRepository = require("./repositories/tournamentRepository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CREATE_MATCH = "CREATE_MATCH";
exports.CREATE_MATCH = CREATE_MATCH;
const CREATE_PLAYER = "CREATE_PLAYER";
exports.CREATE_PLAYER = CREATE_PLAYER;
const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";
exports.CREATE_TOURNAMENT = CREATE_TOURNAMENT;

const subscribeActions = () => {
  var nc = _nats.default.connect({
    url: process.env.NATS_URI
  }); // inserting actions


  nc.subscribe(CREATE_MATCH, async msg => {
    return await (0, _matchRepository.insertMatches)(msg);
  });
  nc.subscribe(CREATE_PLAYER, async msg => {
    return await (0, _playerRepository.insertPlayers)(msg);
  });
  nc.subscribe(CREATE_TOURNAMENT, async msg => {
    return await (0, _tournamentRepository.insertTournaments)(msg);
  });
};

exports.subscribeActions = subscribeActions;