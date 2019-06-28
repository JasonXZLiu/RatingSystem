import { getTournamentIdByName } from "../repositories/tournamentRepository";
import { getPlayerObjectIdById } from "../repositories/playerRepository";

export async function toMatchObject(match) {
  const matchObject = {
    tournament: await getTournamentIdByName({ name: match.tournament }),
    date: match.date,
    winner: await getPlayerObjectIdById(match.winner),
    loser: await getPlayerObjectIdById(match.loser),
    score: match.score
  };
  return matchObject;
}

export async function toMatchObjects(data) {
  return await Promise.all(data.map(match => toMatchObject(match)));
}
