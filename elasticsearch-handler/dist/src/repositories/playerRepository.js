"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertPlayers = insertPlayers;
exports.insertPlayer = insertPlayer;
exports.PLAYER_INDEX = void 0;

var _index = require("../../index");

const PLAYER_INDEX = "player";
exports.PLAYER_INDEX = PLAYER_INDEX;

async function insertPlayers(players) {
  if (players instanceof Array) {
    return await Promise.all(players.map(player => insertPlayer(player)));
  }

  return await insertPlayer(players);
}

async function insertPlayer(player) {
  console.log("player to be inserted", player);
  const {
    id,
    name,
    rating,
    province,
    sex,
    age
  } = player;
  await _index.client.index({
    index: PLAYER_INDEX,
    type: PLAYER_INDEX,
    body: {
      id,
      name,
      rating,
      province,
      sex,
      age
    }
  });
}