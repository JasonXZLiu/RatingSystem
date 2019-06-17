import { playerData } from "./playerData";
import { matchData } from "./matchData";
import { filterData } from "./filterData";
import { countryCodeData } from "./countryCodeData";
import { tournamentData } from "./tournamentData";

import { Player } from "../mongoRepository/schemas/player";
import { Match } from "../mongoRepository/schemas/match";
import { Tournament } from "../mongoRepository/schemas/tournament";
import { CountryCode } from "../mongoRepository/schemas/countryCode";
import { FilterSelector } from "../mongoRepository/schemas/filterSelector";
import { toMatchObjects } from "../mongoRepository/models/matchDTO";

export async function setup() {
  const countryCodeCount = await CountryCode.estimatedDocumentCount();
  const filterSelectorCount = await FilterSelector.estimatedDocumentCount();
  const playerCount = await Player.estimatedDocumentCount();
  const tournamentCount = await Tournament.estimatedDocumentCount();
  const matchCount = await Match.estimatedDocumentCount();

  if (
    countryCodeCount === 0 &&
    filterSelectorCount === 0 &&
    playerCount === 0 &&
    tournamentCount === 0 &&
    matchCount === 0
  ) {
    await CountryCode.create(countryCodeData);
    await FilterSelector.create(filterData);
    await Player.create(playerData);
    await Tournament.create(tournamentData);
    const matches = await toMatchObjects(matchData);
    await Match.create(matches);
    console.log("seed data succeeded");
  } else console.log("database already seeded");
}
