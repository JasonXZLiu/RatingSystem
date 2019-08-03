import { Match } from "../schemas/match";
import { getTournamentById } from "./tournamentRepository";
import { getPlayerById } from "./playerRepository";
import { CREATE_ES_MATCH, nc } from "../repository";

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

export async function getAllFieldsFromMatchById(params) {
  return await Match.findOne({ id: params.id })
    .populate("tournament")
    .populate("winner")
    .populate("loser");
}

export async function getAllFieldsFromMatchesWithIds(matchIds) {
  const matches = await Promise.all(
    matchIds.map(id => getAllFieldsFromMatchById({ id }))
  );
  console.log(matches);
  return matches;
}

export const insertMatches = async matches => {
  await Match.create(matches);
  const matchesWithAllFields = await getAllFieldsFromMatchesWithIds(
    matches.map(match => match.id)
  );
  nc.publish(CREATE_ES_MATCH, JSON.stringify(matchesWithAllFields));
};

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

export async function getMatchesBetweenDates(params) {
  const startDate = params.startDate;
  const endDate = params.endDate;
  return await Match.find()
    .populate("tournament")
    .populate("winner")
    .populate("loser")
    .then(data =>
      data.filter(
        match =>
          match.tournament.endDate < endDate &&
          match.tournament.endDate >= startDate
      )
    );
}

export async function getMatchesToBeCalculated(params) {
  return await Match.find({ calculated: false })
    .populate("tournament")
    .populate("winner")
    .populate("loser");
}
