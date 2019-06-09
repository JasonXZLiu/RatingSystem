import { basePath } from "./index";

export async function getTournaments() {
  return await fetch(basePath + "/tournaments").then(res =>
    res.json().then(data => data)
  );
}

export async function getCountryCode(countryName) {
  return await fetch(basePath + "/countryCode/" + countryName).then(res =>
    res.json().then(data => data)
  );
}

export async function getTournamentById(tournamentId) {
  return await fetch(basePath + "/tournament/" + tournamentId).then(res =>
    res.json().then(data => data[0])
  );
}
