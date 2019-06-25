import { Match } from "../schemas/match";
import { getTournamentById } from "./tournamentRepository";
import { getPlayerById } from "./playerRepository";

export async function getMatches() {
  return await Match.find()
    .populate("tournament")
    .populate("winner")
    .populate("loser");
}

export async function getMatchById(params) {
  const findParams = {
    id: params.id
  };
  return await Match.findOne(findParams);
}

export async function getMatchesByTournamentId(params) {
  const tournament = await getTournamentById(params);
  const findQueryString = "this.tournament == '" + tournament._id + "'";
  return await Match.find({ $where: findQueryString })
    .populate("tournament")
    .populate("winner")
    .populate("loser");
}

export async function getMatchesByPlayerId(params) {
  const player = await getPlayerById(params);
  let findQueryString =
    "(this.loser == '" +
    player._id +
    "' || this.winner == '" +
    player._id +
    "')";
  if (params.tournamentId) {
    const tournament = await getTournamentById(params);
    findQueryString += " && this.tournament == '" + tournament._id + "'";
  }
  console.log(findQueryString);
  return await Match.find({ $where: findQueryString })
    .populate("tournament")
    .populate("winner")
    .populate("loser");
}
