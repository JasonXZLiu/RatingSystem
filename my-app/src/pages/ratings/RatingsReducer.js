import {
  ACTION_REQUEST_PLAYERS,
  ACTION_RECEIVE_PLAYERS
} from "./RatingsAction";

const initialState = {
  players: []
};

export const playersStore = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REQUEST_PLAYERS:
      return {
        ...state,
        isFetching: true
      };
    case ACTION_RECEIVE_PLAYERS:
      return {
        ...state,
        isFetching: false,
        players: action.players
      };
    default:
      return state;
  }
};
