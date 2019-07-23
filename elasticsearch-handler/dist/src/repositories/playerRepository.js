"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertPlayers = insertPlayers;
exports.insertPlayer = insertPlayer;

var _index = require("../../index");

async function insertPlayers(players) {
  if (players instanceof Array) {
    return await Promise.all(players.map(player => insertMatches(player)));
  }

  return await insertMatch(players);
}

async function insertPlayer(player) {
  await _index.client.index({
    index: "player",
    body: { ...player
    }
  });
}