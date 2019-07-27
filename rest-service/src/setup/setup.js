import { nc } from "../repository";

import { Player } from "../schemas/player";
import { Match } from "../schemas/match";
import { Tournament } from "../schemas/tournament";
import { RatingCalculation } from "../schemas/ratingCalculation";
import { CountryCode } from "../schemas/countryCode";
import { FilterSelector } from "../schemas/filterSelector";

import { playerData } from "./playerData";
import { matchData } from "./matchData";
import { filterData } from "./filterData";
import { countryCodeData } from "./countryCodeData";
import { tournamentData } from "./tournamentData";
import { ratingCalculationData } from "./ratingCalculationData";
import { toMatchObjects } from "../models/matchDTO";

export const CREATE_MATCH = "CREATE_MATCH";

const checkIfDatabaseSeeded = async () => {
  const countryCodeCount = await CountryCode.estimatedDocumentCount();
  const filterSelectorCount = await FilterSelector.estimatedDocumentCount();
  const ratingCalculationCount = await RatingCalculation.estimatedDocumentCount();
  const playerCount = await Player.estimatedDocumentCount();
  const tournamentCount = await Tournament.estimatedDocumentCount();
  const matchCount = await Match.estimatedDocumentCount();

  return (
    countryCodeCount === 0 &&
    filterSelectorCount === 0 &&
    playerCount === 0 &&
    tournamentCount === 0 &&
    matchCount === 0 &&
    ratingCalculationCount === 0
  );
};

export async function setup() {
  const checkIfSeeded = await checkIfDatabaseSeeded();

  if (checkIfSeeded) {
    await CountryCode.create(countryCodeData);
    await FilterSelector.create(filterData);
    await RatingCalculation.create(ratingCalculationData);
    await Player.create(playerData);
    await Tournament.create(tournamentData);
    const matches = await toMatchObjects(matchData);
    await nc.publish(CREATE_MATCH, JSON.stringify(matches));

    console.log("seed data succeeded");
  } else console.log("database already seeded");
}
