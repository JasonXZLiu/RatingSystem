import { Tournament } from "../models/tournament";

export async function getTournaments(params) {
  return await Tournament.find();
}

export async function getTournamentById(params) {
  return await Tournament.find(params);
}
