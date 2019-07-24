import NATS from "nats";
import { insertMatches } from "./repositories/matchRepository";
import { insertPlayers } from "./repositories/playerRepository";
import { insertTournaments } from "./repositories/tournamentRepository";

export const CREATE_MATCH = "CREATE_MATCH";
export const CREATE_PLAYER = "CREATE_PLAYER";
export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";

export const subscribeActions = () => {
  var nc = NATS.connect({ url: process.env.NATS_URI });
  console.log("here");

  // inserting actions
  nc.subscribe(CREATE_MATCH, msg => {
    insertMatches(JSON.parse(msg));
  });

  nc.subscribe(CREATE_PLAYER, msg => {
    insertPlayers(JSON.parse(msg));
  });

  nc.subscribe(CREATE_TOURNAMENT, msg => {
    insertTournaments(JSON.parse(msg));
  });
};
