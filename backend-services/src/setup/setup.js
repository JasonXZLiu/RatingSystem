import { playerData } from "./playerData";
import { matchHistoryData } from "./matchHistoryData";
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
    console.log("here");
    await FilterSelector.create(filterData);
    console.log("here1");
    await Player.create(playerData);
    console.log("here2");
    await Tournament.create(tournamentData);
    console.log("here3");
    const matchData = await toMatchObjects(matchHistoryData);
    await Match.create(matchData);
    console.log("here4");
    console.log("seed data succeeded");
  } else console.log("database already seeded");
}
