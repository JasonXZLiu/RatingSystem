import { fetch } from "../../controllers/index";

export const ACTION_REQUEST_TOURNAMENTS = "REQUEST_TOURNAMENTS";
export const ACTION_RECEIVE_TOURNAMENTS = "RECEIVE_TOURNAMENTS";
export const ACTION_REQUEST_TOURNAMENT = "REQUEST_TOURNAMENT";
export const ACTION_RECEIVE_TOURNAMENT = "RECEIVE_TOURNAMENT";
export const ACTION_VERIFY_MATCHES = "VERIFY_MATCHES";
export const ACTION_RECEIVE_MATCH_VERIFICATION = "RECEIVE_MATCH_VERIFICATION";
export const ACTION_SUBMIT_MATCHES = "SUBMIT_MATCHES";
export const ACTION_SUBMIT_MATCHES_ERROR = "SUBMIT_MATCHES_ERROR";
export const ACTION_MATCHES_SUBMITTED = "MATCHES_SUBMITTED";

export const fetchTournaments = () => dispatch => {
  dispatch({
    type: ACTION_REQUEST_TOURNAMENTS
  });
  return fetch(ACTION_REQUEST_TOURNAMENTS).then(tournaments => {
    dispatch({
      type: ACTION_RECEIVE_TOURNAMENTS,
      tournaments
    });
  });
};

export const fetchTournamentById = params => dispatch => {
  dispatch({
    type: ACTION_REQUEST_TOURNAMENT
  });
  return fetch(ACTION_REQUEST_TOURNAMENT, params).then(tournament => {
    dispatch({
      type: ACTION_RECEIVE_TOURNAMENT,
      tournament
    });
  });
};

export const verifyMatches = params => dispatch => {
  dispatch({
    type: ACTION_VERIFY_MATCHES
  });
  return fetch(ACTION_VERIFY_MATCHES, params).then(matches => {
    dispatch({
      type: ACTION_RECEIVE_MATCH_VERIFICATION,
      matches
    });
  });
};

export const submitMatches = params => dispatch => {
  dispatch({
    type: ACTION_SUBMIT_MATCHES
  });
  return fetch(ACTION_SUBMIT_MATCHES, params)
    .then(matches => {
      dispatch({
        type: ACTION_MATCHES_SUBMITTED,
        matches
      });
    })
    .catch(error => {
      dispatch({
        type: ACTION_SUBMIT_MATCHES_ERROR,
        error
      });
    });
};
