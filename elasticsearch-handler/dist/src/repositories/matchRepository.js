"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertMatches = insertMatches;
exports.insertMatch = insertMatch;

var _index = require("../../index");

async function insertMatches(matches) {
  if (matches instanceof Array) {
    return await Promise.all(matches.map(match => insertMatches(match)));
  }

  return await insertMatch(matches);
}

async function insertMatch(match) {
  await _index.client.index({
    index: "match",
    body: { ...match
    }
  });
}