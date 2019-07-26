import { client } from "../../index";
import { PLAYER_INDEX, insertPlayers } from "../repositories/playerRepository";
import {
  TOURNAMENT_INDEX,
  insertTournaments
} from "../repositories/tournamentRepository";
import { MATCH_INDEX } from "../repositories/matchRepository";

import { playerData } from "./playerData";
import { tournamentData } from "./tournamentData";

const checkIfDatabaseSeeded = async () => {
  try {
    await client.create({ index: PLAYER_INDEX, type: PLAYER_INDEX, id: 1 });
    await client.create({
      index: TOURNAMENT_INDEX,
      type: TOURNAMENT_INDEX,
      id: 1
    });
    await client.create({
      index: MATCH_INDEX,
      type: MATCH_INDEX,
      id: 1
    });
  } catch (err) {
    return true;
  }

  return false;
};

export async function setup() {
  const checkIfSeeded = await checkIfDatabaseSeeded();

  if (!checkIfSeeded) {
    await insertPlayers(playerData);
    await insertTournaments(tournamentData);
    console.log("seed data succeeded");
  } else console.log("database already seeded");
}
