import { client } from "../../index";
import { PLAYER_INDEX, insertPlayers } from "../repositories/playerRepository";
import {
  TOURNAMENT_INDEX,
  insertTournaments
} from "../repositories/tournamentRepository";

import { playerData } from "./playerData";
import { tournamentData } from "./tournamentData";

const checkIfDatabaseSeeded = async () => {
  const playerCount = await client.count({ index: PLAYER_INDEX });
  const tournamentCount = await client.count({ index: TOURNAMENT_INDEX });

  return playerCount === 0 && tournamentCount === 0;
};

export async function setup() {
  const checkIfSeeded = await checkIfDatabaseSeeded();

  if (checkIfSeeded) {
    await insertPlayers(playerData);
    await insertTournaments(tournamentData);
    console.log("seed data succeeded");
  } else console.log("database already seeded");
}
