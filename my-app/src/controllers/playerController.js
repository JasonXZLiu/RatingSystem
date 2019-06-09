import { basePath } from "./index";

export async function getPlayers() {
  return await fetch(basePath + "/ratings").then(res =>
    res.json().then(data => data)
  );
}

export async function getLeaders() {
  return await fetch(basePath + "/players").then(res =>
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
    res.json().then(data => data[0])
  );
}

export async function getRatings(params) {
  if (params) {
    const searchValue = params.searchValue || "undefined";
    const sexValue = params.sexValue || "undefined";
    const provinceValue = params.provinceValue || "undefined";
    const categoryValue = params.categoryValue || "undefined";
    return await fetch(
      basePath +
        "/ratings/search=" +
        searchValue +
        "&sex=" +
        sexValue +
        "&province=" +
        provinceValue +
        "&category=" +
        categoryValue
    ).then(res => res.json().then(data => data));
  }
  return await fetch(basePath + "/ratings").then(res =>
    res.json().then(data => data)
  );
}
