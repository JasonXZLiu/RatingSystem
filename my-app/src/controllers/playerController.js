import { basePath } from "./index";

export async function getPlayers() {
  return await fetch(basePath + "/ratings").then(res =>
    res.json().then(data => data)
  );
}

export async function getLeaders() {
  return await fetch(basePath + "/leaders").then(res =>
    res.json().then(data => data)
  );
}

export async function getMatchHistoryById(playerId) {
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
