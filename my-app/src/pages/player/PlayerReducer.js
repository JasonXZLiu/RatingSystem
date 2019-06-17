import {
  ACTION_REQUEST_PLAYER,
  ACTION_RECEIVE_PLAYER,
  ACTION_RECEIVE_PLAYER_MATCH_HISTORY,
  ACTION_REQUEST_PLAYER_MATCH_HISTORY
} from "./PlayerAction";

const initialState = {
  player: {},
  matchHistory: []
};

export const playerStore = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REQUEST_PLAYER_MATCH_HISTORY:
    case ACTION_REQUEST_PLAYER:
      return {
        ...state,
        isFetching: true
      };
    case ACTION_RECEIVE_PLAYER:
      return {
        ...state,
        isFetching: false,
        player: action.player
      };
    case ACTION_RECEIVE_PLAYER_MATCH_HISTORY:
      return {
        ...state,
        isFetching: false,
        matchHistory: action.matchHistory
      };
    default:
      return state;
  }
};
