"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTournaments = getTournaments;
exports.getTournamentById = getTournamentById;
exports.getTournamentIdByName = getTournamentIdByName;

var _tournament = require("../schemas/tournament");

async function getTournaments(params) {
  return await _tournament.Tournament.find();
}

async function getTournamentById(params) {
  return await _tournament.Tournament.findOne(params);
}

async function getTournamentIdByName(params) {
  return await _tournament.Tournament.findOne(params).then(function (data) {
    return data._id;
  });
}