import { getPlayers, getRatings, getPlayerById } from "./playerController";
import { getTournaments } from "./tournamentController";
import { ACTION_REQUEST_RATINGS } from "../pages/ratings/RatingsAction";
import { ACTION_REQUEST_LEADERS } from "../pages/leaderboard/LeaderboardAction";
import { ACTION_REQUEST_PLAYER } from "../pages/player/PlayerAction";
import { ACTION_REQUEST_TOURNAMENTS } from "../pages/tournament/TournamentAction";

export const basePath = "https://ca5ca789.ngrok.io";

export const fetch = (action, params) => {
  switch (action) {
    case ACTION_REQUEST_RATINGS:
      return getRatings(params);
    case ACTION_REQUEST_LEADERS:
      return getPlayers();
    case ACTION_REQUEST_PLAYER:
      return getPlayerById(params);
    case ACTION_REQUEST_TOURNAMENTS:
      return getTournaments(params);
    default:
      return {};
  }
};
