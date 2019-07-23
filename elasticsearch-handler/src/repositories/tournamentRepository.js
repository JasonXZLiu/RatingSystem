import { client } from "../../index";

export async function insertTournaments(tournaments) {
  if (tournaments instanceof Array) {
    return await Promise.all(
      tournaments.map(tournament => insertMatches(tournament))
    );
  }
  return await insertMatch(tournaments);
}

export async function insertTournament(tournament) {
  await client.index({
    index: "tournament",
    type: "_doc",
    body: {
      ...tournament
    }
  });
}
