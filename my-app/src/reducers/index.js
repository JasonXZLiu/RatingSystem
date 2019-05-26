import { combineReducers } from "redux";
import { playersStore } from "../pages/ratings/RatingsReducer";
import { leaderboard } from "../pages/leaderboard/LeaderboardReducer";

export default combineReducers({
  leaderboard,
  playersStore
});
