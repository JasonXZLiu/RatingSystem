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

function searchByStringValue(value, target) {
  return (
    target === "undefined" || value.toLowerCase().includes(target.toLowerCase())
  );
}
function searchByNumberValue(value, target) {
  return target === "undefined" || value <= parseInt(target);
}

function filterRatings(ratings, params) {
  return (
    ratings
      .filter(rating => searchByStringValue(rating.name, params.searchValue))
      .filter(rating => searchByStringValue(rating.sex, params.sexValue))
      .filter(rating =>
        searchByStringValue(rating.province, params.provinceValue)
      )
      .filter(rating =>
        searchByNumberValue(rating.age, params.categoryValue)
      ) || []
  );
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
    player.lastPlayed = player.matchHistory && player.matchHistory[0].date;
    player.ranking = count;
  });
  if (params) return filterRatings(players, params);
  else return players;
}

module.exports = {
  getPlayers: getPlayers,
  getPlayerById: getPlayerById,
  getMatchHistoryById: getMatchHistoryById,
  getRatings: getRatings
};
