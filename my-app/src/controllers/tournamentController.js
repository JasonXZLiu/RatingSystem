import { basePath } from "./index";
import { format } from "date-fns";

export async function getTournaments() {
  return await fetch(basePath + "/tournaments").then(res =>
    res.json().then(data =>
      data.map(tournament => {
        const startDate = format(new Date(tournament.startDate), "MM/DD/YYYY");
        const endDate = format(new Date(tournament.endDate), "MM/DD/YYYY");
        return {
          ...tournament,
          startDate,
          endDate
        };
      })
    )
  );
}

export async function getCountryCode(countryName) {
  return await fetch(basePath + "/countryCode/" + countryName).then(res =>
    res.json().then(data => data)
  );
}

export async function getTournamentById(tournamentId) {
  return await fetch(basePath + "/tournament/" + tournamentId).then(res =>
    res.json().then(data => {
      const startDate = format(new Date(data.startDate), "MM/DD/YYYY");
      const endDate = format(new Date(data.endDate), "MM/DD/YYYY");
      return {
        ...data,
        startDate,
        endDate
      };
    })
  );
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
  ).then(res => res.json().then(data => data));
}

export async function submitTournamentMatches(params) {
  const { tournamentId, matches } = params;
  return await fetch(
    basePath + "/tournament/" + tournamentId + "/matches/submit",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: matches
    }
  ).then(res => res.json().then(data => data));
}
