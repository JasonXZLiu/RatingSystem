const fs = require("fs");

function getJSON() {
  var data = fs.readFileSync("./src/playerRepository/playerData.json", "utf8");
  return data;
}

function getPlayers(params) {
  const data = JSON.parse(getJSON());
  return data.players;
}

function getPlayerById(params) {
  const id = params.playerId;
  const data = JSON.parse(getJSON());
  const player = data.players.filter(player => player.id == id);
  return player[0];
}

function getMatchHistoryById(params) {
  const id = params.playerId;
  const data = JSON.parse(getJSON());
  const player = data.players.filter(player => player.id == id);
  return player;
}

function getRatings(params) {
  const data = JSON.parse(getJSON());
  let players = data.players;
  players.sort((a, b) => {
    return b.rating - a.rating;
  });
  players.map(player => {
    player.matchHistory.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });
  let count = 0;
  players.map(player => {
    count++;
    player.lastplayed = player.matchHistory && player.matchHistory[0].date;
    player.ranking = count;
  });
  return players;
}

module.exports = {
  getPlayers: getPlayers,
  getPlayerById: getPlayerById,
  getMatchHistoryById: getMatchHistoryById,
  getRatings: getRatings
};
