import {
  ACTION_REQUEST_TOURNAMENTS,
  ACTION_RECEIVE_TOURNAMENTS,
  ACTION_REQUEST_TOURNAMENT,
  ACTION_RECEIVE_TOURNAMENT,
  ACTION_RECEIVE_MATCH_VERIFICATION,
  ACTION_MATCHES_SUBMITTED,
  ACTION_SUBMIT_MATCHES_ERROR
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
    case ACTION_RECEIVE_MATCH_VERIFICATION:
      return {
        ...state,
        isFetching: false,
        isSubmitted: false,
        matches: action.matches
      };
    case ACTION_MATCHES_SUBMITTED:
      return {
        ...state,
        isFetching: false,
        isSubmitted: true,
        matches: action.matches
      };
    case ACTION_SUBMIT_MATCHES_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
