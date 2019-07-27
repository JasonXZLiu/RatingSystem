"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertMatches = insertMatches;
exports.insertMatch = insertMatch;
exports.MATCH_INDEX = void 0;

var _index = require("../../index");

const MATCH_INDEX = "match";
exports.MATCH_INDEX = MATCH_INDEX;

async function insertMatches(matches) {
  if (matches instanceof Array) {
    return await Promise.all(matches.map(match => insertMatch(match)));
  }

  return await insertMatch(matches);
}

async function insertMatch(match) {
  console.log("match to be inserted", match);
  const {
    tournament,
    calculated,
    date,
    winner,
    loser,
    score
  } = match;
  await _index.client.index({
    index: MATCH_INDEX,
    type: MATCH_INDEX,
    body: {
      tournament,
      calculated,
      date,
      winner,
      loser,
      score
    }
  });
}