import { Player } from "../models/player";

export async function getPlayers() {
  return await Player.find();
}

export async function getPlayerById(params) {
  return await Player.find(params);
}

export function getMatchHistoryById(params) {
  const id = params.playerId;
  const data = JSON.parse(getJSON());
  const player = data.players.filter(player => player.id == id);
  return player;
}

export async function getRatings(params) {
  let findParams = {};
  if (params) {
    if (params.searchValue !== "undefined")
      findParams.name = {
        $regex: params.searchValue,
        $options: "mi"
      };
    if (params.sexValue !== "undefined") findParams.sex = params.sexValue;
    if (params.provinceValue !== "undefined")
      findParams.province = params.provinceValue;
    if (params.categoryValue !== "undefined")
      findParams.$where = "this.age < " + parseInt(params.categoryValue);
  }
  console.log("find parameters: ");
  console.log(findParams);
  return await Player.find(findParams).then(players => {
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
  });
}
