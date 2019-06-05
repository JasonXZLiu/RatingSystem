import {
  ACTION_REQUEST_TOURNAMENTS,
  ACTION_RECEIVE_TOURNAMENTS,
  ACTION_REQUEST_TOURNAMENT,
  ACTION_RECEIVE_TOURNAMENT
} from "./TournamentAction";

const initialState = {
  tournaments: [],
  tournament: {
    location: {},
    events: []
  }
};

export const tournamentStore = (state = initialState, action) => {
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
    case ACTION_REQUEST_TOURNAMENT:
      return {
        ...state,
        isFetching: true
      };
    case ACTION_RECEIVE_TOURNAMENT:
      return {
        ...state,
        isFetching: false,
        tournament: action.tournament
      };
    default:
      return state;
  }
};
