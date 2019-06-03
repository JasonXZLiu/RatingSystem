import {
  ACTION_REQUEST_TOURNAMENTS,
  ACTION_RECEIVE_TOURNAMENTS
} from "./TournamentAction";

const initialState = {
  tournaments: []
};

export const tournament = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REQUEST_TOURNAMENTS:
      return {
        ...state,
        isFetching: true
      };
    case ACTION_RECEIVE_TOURNAMENTS:
      return {
        ...state,
        isFetching: false,
        tournaments: action.tournaments
      };
    default:
      return state;
  }
};
