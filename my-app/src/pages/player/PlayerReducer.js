import { ACTION_REQUEST_PLAYER, ACTION_RECEIVE_PLAYER } from "./PlayerAction";

const initialState = {
  player: {}
};

export const playerStore = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
