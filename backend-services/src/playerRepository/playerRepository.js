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
    player.lastPlayed = player.matchHistory && player.matchHistory[0].date;
    player.ranking = count;
  });
  return players;
}

// filterRatings = () => {
//     let filterBySearchValue =
//       this.props.ratings.filter(rating =>
//         this.searchByStringValue(rating.name, this.props.searchValue)
//       ) || [];
//     let filterBySexValue = filterBySearchValue.filter(rating =>
//       this.searchByStringValue(rating.sex, this.props.sexValue)
//     );
//     let filterByProvinceValue = filterBySexValue.filter(rating =>
//       this.searchByStringValue(rating.province, this.props.provinceValue)
//     );
//     let filterByCategoryValue = filterByProvinceValue.filter(rating =>
//       this.searchByNumberValue(rating.age, this.props.categoryValue)
//     );
//     const MIN =
//       LIMIT > filterByCategoryValue.length
//         ? filterByCategoryValue.length
//         : LIMIT;
//     this.setState({ MIN, filteredRatings: filterByCategoryValue });
//   };

module.exports = {
  getPlayers: getPlayers,
  getPlayerById: getPlayerById,
  getMatchHistoryById: getMatchHistoryById,
  getRatings: getRatings
};
