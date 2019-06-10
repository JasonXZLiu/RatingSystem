import { Tournament } from "../models/tournament";

export async function getTournaments(params) {
  return await Tournament.find();
}

export async function getTournamentById(params) {
  const findParams = {
    id: params.tournamentId
  };
  return await Tournament.findOne(findParams);
}
