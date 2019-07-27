import { basePath } from "./index";

export async function getTournaments() {
  return await fetch(basePath + "/tournaments").then(res => res);
}

export async function getCountryCode(countryName) {
  return await fetch(basePath + "/countryCode/" + countryName).then(res => res);
}

export async function getTournamentById(tournamentId) {
  return await fetch(basePath + "/tournament/" + tournamentId).then(res => res);
}

export async function getTournamentMatchesById(tournamentId) {
  return await fetch(
    basePath + "/tournament/" + tournamentId + "/matches"
  ).then(res => res);
}

export async function verifyTournamentMatches(params) {
  const { tournamentId, csv } = params;
  var map = { matches: csv };
  const urlParams = Object.keys(map)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(map[key]);
    })
    .join("&");
  return await fetch(
    basePath + "/tournament/" + tournamentId + "/matches/verify",
    {
      method: "POST",
      headers: {
        Accept: "text/csv",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlParams
    }
  ).then(res => res);
}

export async function submitTournamentMatches(params) {
  const { tournamentId, matchesToSubmit } = params;
  return await fetch(
    basePath + "/tournament/" + tournamentId + "/matches/submit",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(matchesToSubmit)
    }
  ).then(res => res);
}
