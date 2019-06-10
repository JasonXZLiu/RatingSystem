import { playerData } from "./playerData";
import { matchHistoryData } from "./matchHistoryData";
import { filterData } from "./filterData";
import { countryCodeData } from "./countryCodeData";
import { tournamentData } from "./tournamentData";

import { Player } from "../mongoRepository/models/player";
import { Match } from "../mongoRepository/models/match";
import { Tournament } from "../mongoRepository/models/tournament";
import { CountryCode } from "../mongoRepository/models/countryCode";
import { FilterSelector } from "../mongoRepository/models/filterSelector";

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
    CountryCode.bulkWrite(countryCodeData);
    FilterSelector.bulkWrite(filterData);
    Player.bulkWrite(playerData);
    Tournament.bulkWrite(tournamentData);
    Match.bulkWrite(matchHistoryData);
    console.log("seed data succeeded");
  } else console.log("database already seeded");
}
