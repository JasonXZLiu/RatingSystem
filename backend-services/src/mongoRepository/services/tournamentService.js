import { getPlayerIdByName } from "../repositories/playerRepository";

async function verifyMatch(match) {
  const winnerId = await getPlayerIdByName({ name: match.winner });
  const loserId = await getPlayerIdByName({ name: match.loser });
  const matchObject = {
    tournament: match.tournament,
    date: match.date,
    winner: winnerId,
    loser: loserId,
    score: match.score.split(";"),
    isValid: !(winnerId instanceof Array || loserId instanceof Array)
  };
  return matchObject;
}

async function verifyMatches(data) {
  return await Promise.all(data.map(match => verifyMatch(match)));
}

export const verifyTournamentMatches = async params => {
  var matches = params.matches;
  var verifiedMatches = await verifyMatches(matches);
  return verifiedMatches;
};
