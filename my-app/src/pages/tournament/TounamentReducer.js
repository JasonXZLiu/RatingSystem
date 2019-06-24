import {
  ACTION_REQUEST_TOURNAMENTS,
  ACTION_RECEIVE_TOURNAMENTS,
  ACTION_REQUEST_TOURNAMENT,
  ACTION_RECEIVE_TOURNAMENT,
  ACTION_RECEIVE_TOURNAMENT_MATCHES,
  ACTION_RECEIVE_MATCH_VERIFICATION,
  ACTION_MATCHES_SUBMITTED,
  ACTION_CANCEL_MATCHES
} from "./TournamentAction";

const initialState = {
  tournaments: [],
  tournament: {
    location: {},
    events: []
  },
  currentStep: 1,
  matches: []
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
    case ACTION_RECEIVE_TOURNAMENT_MATCHES:
      return {
        ...state,
        matches: action.tournament
      };
    case ACTION_RECEIVE_MATCH_VERIFICATION:
      return {
        ...state,
        currentStep: 2,
        matches: action.matches
      };
    case ACTION_MATCHES_SUBMITTED:
      return {
        ...state,
        currentStep: 1,
        matches: action.matches
      };
    case ACTION_CANCEL_MATCHES:
      return {
        ...state,
        currentStep: 1
      };
    default:
      return state;
  }
};
