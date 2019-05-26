import { getPlayers, getRatings, getPlayerById } from "./playerController";
import { ACTION_REQUEST_RATINGS } from "../pages/ratings/RatingsAction";
import { ACTION_REQUEST_LEADERS } from "../pages/leaderboard/LeaderboardAction";
import { ACTION_REQUEST_PLAYER } from "../pages/player/PlayerAction";

export const basePath = "https://cefcf35d.ngrok.io";

export const fetch = (action, params) => {
  switch (action) {
    case ACTION_REQUEST_RATINGS:
      return getRatings(params);
    case ACTION_REQUEST_LEADERS:
      return getPlayers();
    case ACTION_REQUEST_PLAYER:
      return getPlayerById(params);
    default:
      return {};
  }
};
