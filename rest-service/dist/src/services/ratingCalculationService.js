"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateRatings = exports.getPlayerLastMonthRating = undefined;

var _matchRepository = require("../repositories/matchRepository");

var _repl = require("repl");

var _playerRepository = require("../repositories/playerRepository");

var _ratingCalculationRepository = require("../repositories/ratingCalculationRepository");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var calculateTemporaryRating = function calculateTemporaryRating(playerId, matches) {
  if (matches.length === 1) return 100;

  var lowestLostRating = Math.min(matches.filter(function (match) {
    return match.loser.id;
  }).map(function (match) {
    return match.rating;
  }));
  var highestWinRating = Math.max(matches.filter(function (match) {
    return match.winner.id;
  }).map(function (match) {
    return match.rating;
  }));
  return Math.round((lowestLostRating + highestWinRating) / 2);
};

var updateTemporaryRating = function updateTemporaryRating(player, match) {
  var oldMatches = player.temporaryRating ? player.temporaryRating.matches : [];
  var matches = [].concat(_toConsumableArray(oldMatches), [match]);
  var temporaryRating = calculateTemporaryRating(player.id, matches);
  player.temporaryRating = {
    rating: temporaryRating,
    matches: matches
  };
  // turns temporary rating to permanent after certain condition
  if (matches.length === 10) {
    player.newRating = [{
      rating: player.temporaryRating.rating,
      periodDate: new Date()
    }];
    player.temporaryRating = null;
  }
  player.save();
  return player;
};

var getPlayerLastMonthRating = exports.getPlayerLastMonthRating = function getPlayerLastMonthRating(player) {
  if (!!player.rating) {
    var ratingHistory = player.rating;
    return ratingHistory[0].rating;
  }

  // null means no rating (temporary or permanent) ever existed
  return null;
};

var updatePlayerRatingsForMatch = async function updatePlayerRatingsForMatch(winner, loser, winnerRating, loserRating) {
  var pointDifference = winnerRating - loserRating;
  var ratingChange = await (0, _ratingCalculationRepository.getRatingCalculation)({
    pointDifference: pointDifference
  });
  winner.newRating.rating += ratingChange.winner;
  loser.newRating.rating -= ratingChange.loser;
  await winner.save();
  await loser.save();
};

var calculateRating = async function calculateRating(match) {
  var winner = match.winner;
  var loser = match.loser;
  var winnerRating = await getPlayerLastMonthRating(winner);
  var loserRating = await getPlayerLastMonthRating(loser);

  console.log("calculating rating");
  console.log("last winner rating", winnerRating);
  console.log("last loser rating", loserRating);

  // if both null, just continue without updating rating for either
  if (!winnerRating && !loserRating) return;

  // if just one is null, then update temporary ratings
  if (!winnerRating) await updateTemporaryRating(winner, match);
  if (!loserRating) await updateTemporaryRating(loser, match);

  // change only newRating field (will be reconciled later at the end)
  if (winnerRating && loserRating) {
    await updatePlayerRatingsForMatch(winner, loser, winnerRating, loserRating);
    console.log("new winner rating", winner.newRating.rating);
    console.log("new loser rating", loser.newRating.rating);
  }

  match.calculated = true;
  await match.save();
};

var calculateRatings = exports.calculateRatings = async function calculateRatings() {
  await setupPlayerNewRatings();
  var matches = await (0, _matchRepository.getMatchesToBeCalculated)();
  return await Promise.all(matches.map(function (match) {
    return calculateRating(match);
  })).then(async function () {
    return await reconcileRatings();
  });
};

var setupNewRating = async function setupNewRating(player) {
  if (!!player.temporaryRating && player.temporaryRating.matches.length > 0) return;
  console.log("rating", (await getPlayerLastMonthRating(player)));
  player.newRating = {
    periodDate: new Date(),
    rating: await getPlayerLastMonthRating(player)
  };
  await console.log(player.newRating);
  player.save();
};

var setupPlayerNewRatings = async function setupPlayerNewRatings() {
  var players = await (0, _playerRepository.getPlayers)();
  await Promise.all(players.map(function (player) {
    return setupNewRating(player);
  }));
  await console.log(players);
};

var reconcileRatings = async function reconcileRatings() {
  var players = await (0, _playerRepository.getPlayers)();
  players.map(function (player) {
    var newRating = player.newRating;
    console.log("player " + player.id + " newRating", newRating);
    player.rating = [newRating].concat(_toConsumableArray(player.rating));
    player.newRating = {};
    player.save();
  });
  return players;
};