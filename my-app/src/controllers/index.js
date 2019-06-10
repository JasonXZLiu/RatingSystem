import {
  getLeaders,
  getRatings,
  getPlayerById,
  getPlayerMatchHistory
} from "./playerController";
import { getTournaments, getTournamentById } from "./tournamentController";

import { ACTION_REQUEST_RATINGS } from "../pages/ratings/RatingsAction";
import { ACTION_REQUEST_LEADERS } from "../pages/leaderboard/LeaderboardAction";
import {
  ACTION_REQUEST_PLAYER,
  ACTION_REQUEST_PLAYER_MATCH_HISTORY
} from "../pages/player/PlayerAction";
import {
  ACTION_REQUEST_TOURNAMENTS,
  ACTION_REQUEST_TOURNAMENT
} from "../pages/tournament/TournamentAction";

export const basePath = "https://31292889.ngrok.io";

export const fetch = (action, params) => {
  switch (action) {
    case ACTION_REQUEST_RATINGS:
      return getRatings(params);
    case ACTION_REQUEST_LEADERS:
      return getLeaders();
    case ACTION_REQUEST_PLAYER:
      return getPlayerById(params);
    case ACTION_REQUEST_PLAYER_MATCH_HISTORY:
      return getPlayerMatchHistory(params);
    case ACTION_REQUEST_TOURNAMENTS:
      return getTournaments(params);
    case ACTION_REQUEST_TOURNAMENT:
      return getTournamentById(params);
    default:
      return {};
  }
};
