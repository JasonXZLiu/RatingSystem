import { combineReducers } from "redux";
import { playerStore } from "../pages/player/PlayerReducer";
import { ratingStore } from "../pages/ratings/RatingsReducer";
import { leaderboard } from "../pages/leaderboard/LeaderboardReducer";

export default combineReducers({
  leaderboard,
  ratingStore,
  playerStore
});
