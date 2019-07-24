import { client } from "../../index";

export const TOURNAMENT_INDEX = "tournament";

export async function insertTournaments(tournaments) {
  if (tournaments instanceof Array) {
    return await Promise.all(
      tournaments.map(tournament => insertTournament(tournament))
    );
  }
  return await insertTournament(tournaments);
}

export async function insertTournament(tournament) {
  console.log("tournament to be inserted", tournament);
  const { id, name, startDate, endDate, location, events } = tournament;
  await client.index({
    index: TOURNAMENT_INDEX,
    type: TOURNAMENT_INDEX,
    body: {
      id,
      name,
      startDate,
      endDate,
      location,
      events
    }
  });
}
