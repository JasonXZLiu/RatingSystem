import fs from "fs";
import { getCountryCode } from "../countryRepository/countryRepository";

const getJSON = () => {
  var data = fs.readFileSync(
    "./src/core/tournamentRepository/tournamentData.json",
    "utf8"
  );
  return data;
};

export const getTournaments = params => {
  const data = JSON.parse(getJSON());
  const tournaments = data.tournaments;
  tournaments.map(tournament => {
    tournament.location.countryCode = getCountryCode({
      countryName: tournament.location.country
    })[0].code;
  });
  return tournaments;
};

export const getTournamentById = params => {
  const data = JSON.parse(getJSON());
  const tournaments = data.tournaments;
  const result = tournaments.filter(tournament => {
    return tournament.id == params.tournamentId;
  })[0];

  if (!result || result.length === 0) return [];

  result.location.countryCode = getCountryCode({
    countryName: result.location.country
  })[0].code;
  return result;
};
