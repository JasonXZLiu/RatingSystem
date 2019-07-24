import { client } from "../../index";

export const MATCH_INDEX = "match";

export async function insertMatches(matches) {
  if (matches instanceof Array) {
    return await Promise.all(matches.map(match => insertMatch(match)));
  }
  return await insertMatch(matches);
}

export async function insertMatch(match) {
  console.log("match to be inserted", match);
  const { tournament, calculated, date, winner, loser, score } = match;
  await client.index({
    index: MATCH_INDEX,
    type: MATCH_INDEX,
    body: {
      tournament,
      calculated,
      date,
      winner,
      loser,
      score
    }
  });
}
