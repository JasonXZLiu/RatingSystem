import { getTournamentIdByName } from "../repositories/tournamentRepository";
import {
  getPlayerIdByName,
  getPlayerObjectIdById
} from "../repositories/playerRepository";

export async function toMatchObjectByPlayerName(match) {
  const matchObject = {
    tournament: await getTournamentIdByName({ name: match.tournament }),
    calculated: match.calculated,
    date: match.date,
    winner: await getPlayerIdByName({ name: match.winner }),
    loser: await getPlayerIdByName({ name: match.loser }),
    score: match.score
  };
  return matchObject;
}

export async function toMatchObjectsByPlayerName(data) {
  return await Promise.all(data.map(match => toMatchObjectByPlayerName(match)));
}

export async function toMatchObjectByPlayerId(match) {
  const matchObject = {
    tournament: await getTournamentIdByName({ name: match.tournament }),
    calculated: match.calculated,
    date: match.date,
    winner: await getPlayerObjectIdById(match.winner),
    loser: await getPlayerObjectIdById(match.loser),
    score: match.score
  };
  return matchObject;
}

export async function toMatchObjectsByPlayerId(data) {
  return await Promise.all(data.map(match => toMatchObjectByPlayerId(match)));
}
