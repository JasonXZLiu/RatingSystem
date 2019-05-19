import { basePath } from "./index";

export async function getPlayers() {
  return await fetch(basePath + "/players").then(res =>
    res.json().then(data => data)
  );
}

export async function getMatchHistoryById(playerId) {
  console.log(playerId);
  return await fetch(basePath + "/players/" + playerId).then(res =>
    res.json().then(data => data)
  );
}

export async function getPlayerById(playerId) {
  return await fetch(basePath + "/players/" + playerId).then(res =>
    res.json().then(data => data)
  );
}

export async function getRatings() {
  return await fetch(basePath + "/ratings").then(res =>
    res.json().then(data => data)
  );
}
