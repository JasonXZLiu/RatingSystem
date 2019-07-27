"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Match = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _player = require("./player");

var _playerRepository = require("../repositories/playerRepository");

var _ratingCalculationService = require("../services/ratingCalculationService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var MongooseTrigger = require("mongoose-trigger");

var matchSchema = new _mongoose2.default.Schema({
  tournament: { type: _mongoose.Schema.Types.ObjectId, ref: "Tournament" },
  calculated: Boolean,
  date: Date,
  winner: { type: _mongoose.Schema.Types.ObjectId, ref: "Player" },
  loser: { type: _mongoose.Schema.Types.ObjectId, ref: "Player" },
  score: [String]
}, { collection: "matches" });

var matchEvents = MongooseTrigger(matchSchema, {
  events: {
    create: {
      select: "_id tournament date winner loser score",
      populate: {
        path: "tournament winner loser"
      }
    },
    update: {
      select: "_id tournament date winner loser score",
      populate: {
        path: "tournament winner loser"
      }
    },
    remove: {
      select: "_id tournament date winner loser score",
      populate: {
        path: "tournament winner loser"
      }
    }
  }
});

var insertPlayerMatchHistory = function insertPlayerMatchHistory(playerId, matchId) {
  (0, _playerRepository.getPlayer)({ _id: playerId }).then(function (data) {
    if (data.matchHistory && data.matchHistory.length > 0) data.matchHistory = [].concat(_toConsumableArray(data.matchHistory), [matchId]);else data.matchHistory = [matchId];
    data.save();
  });
};

var deletePlayerMatchHistory = function deletePlayerMatchHistory(playerId, matchId) {
  (0, _playerRepository.getPlayer)({ _id: playerId }).then(function (data) {
    data.matchHistory = data.matchHistory.filter(function (id) {
      id !== matchId;
    });
    data.save();
  });
};

var insertPlayerMatch = function insertPlayerMatch(data) {
  var winnerMatch = {
    _id: _mongoose2.default.Types.ObjectId(),
    tournament: data.tournament.name,
    matchId: data._id,
    date: data.date,
    opponent: data.loser.name,
    opposingRating: (0, _ratingCalculationService.getPlayerLastMonthRating)(data.loser),
    result: "W",
    score: data.score
  };
  var loserMatch = {
    _id: _mongoose2.default.Types.ObjectId(),
    tournament: data.tournament.name,
    matchId: data._id,
    date: data.date,
    opponent: data.winner.name,
    opposingRating: (0, _ratingCalculationService.getPlayerLastMonthRating)(data.winner),
    result: "L",
    score: data.score.map(function (set) {
      var setArray = set.split("-");
      return setArray[1] + "-" + setArray[0];
    })
  };
  _player.PlayerMatch.insertMany([winnerMatch, loserMatch]);
  insertPlayerMatchHistory(data.winner._id, winnerMatch._id);
  insertPlayerMatchHistory(data.loser._id, loserMatch._id);
};

var updatePlayerMatch = function updatePlayerMatch(data) {
  _player.PlayerMatch.findOneAndUpdate({ matchId: data._id }, {
    _id: _mongoose2.default.Types.ObjectId(),
    tournament: data.tournament.name,
    matchId: data._id,
    date: data.date,
    opponent: data.loser.name,
    opposingRating: (0, _ratingCalculationService.getPlayerLastMonthRating)(data.loser),
    result: "W",
    score: data.score
  });
  _player.PlayerMatch.findOneAndUpdate({ matchId: data._id }, {
    _id: _mongoose2.default.Types.ObjectId(),
    tournament: data.tournament.name,
    matchId: data._id,
    date: data.date,
    opponent: data.winner.name,
    opposingRating: (0, _ratingCalculationService.getPlayerLastMonthRating)(data.winner),
    result: "L",
    score: data.score.map(function (set) {
      var setArray = set.split("-");
      return setArray[1] + "-" + setArray[0];
    })
  });
};

matchEvents.on("create", function (data) {
  return insertPlayerMatch(data);
});
matchEvents.on("update", function (data) {
  return updatePlayerMatch(data);
});
matchEvents.on("remove", function (data) {
  var winnerId = data.winner._id;
  var loserId = data.loser._id;
  var matchId = data._id;

  _player.PlayerMatch.find({ matchId: matchId }).then(function (data) {
    _player.PlayerMatch.deleteMany(data.map(function (match) {
      return match._id;
    }));
  });

  deletePlayerMatchHistory(winnerId, matchId);
  deletePlayerMatchHistory(loserId, matchId);
});

var Match = exports.Match = _mongoose2.default.model("Match", matchSchema);