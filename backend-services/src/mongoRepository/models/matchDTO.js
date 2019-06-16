import { getTournamentIdByName } from "../repositories/tournamentRepository";
import { getPlayerIdByName } from "../repositories/playerRepository";

async function toMatchObject(match) {
  const matchObject = {
    tournament: await getTournamentIdByName({ name: match.tournament }),
    date: match.date,
    winner: await getPlayerIdByName({ name: match.winner }),
    loser: await getPlayerIdByName({ name: match.loser }),
    score: match.score
  };
  return matchObject;
}

export async function toMatchObjects(data) {
  return await Promise.all(data.map(match => toMatchObject(match)));
}
