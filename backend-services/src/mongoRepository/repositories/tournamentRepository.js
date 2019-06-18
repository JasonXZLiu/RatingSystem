import { Tournament } from "../schemas/tournament";

export async function getTournaments(params) {
  return await Tournament.find();
}

export async function getTournamentById(params) {
  const findParams = {
    id: params.tournamentId
  };
  return await Tournament.findOne(findParams);
}

export async function getTournamentIdByName(params) {
  return await Tournament.findOne(params).then(data => data._id);
}
