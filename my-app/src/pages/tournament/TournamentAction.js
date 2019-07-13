import { fetch } from "../../controllers/index";
import toast from "../../components/toast/toast";

export const ACTION_REQUEST_TOURNAMENTS = "REQUEST_TOURNAMENTS";
export const ACTION_RECEIVE_TOURNAMENTS = "RECEIVE_TOURNAMENTS";
export const ACTION_REQUEST_TOURNAMENT = "REQUEST_TOURNAMENT";
export const ACTION_RECEIVE_TOURNAMENT = "RECEIVE_TOURNAMENT";
export const ACTION_REQUEST_TOURNAMENT_MATCHES = "REQUEST_TOURNAMENT_MATCHES";
export const ACTION_RECEIVE_TOURNAMENT_MATCHES = "RECEIVE_TOURNAMENT_MATCHES";
export const ACTION_VERIFY_MATCHES = "VERIFY_MATCHES";
export const ACTION_RECEIVE_MATCH_VERIFICATION = "RECEIVE_MATCH_VERIFICATION";
export const ACTION_UPDATE_MATCHES = "UPDATE_MATCHES";
export const ACTION_SUBMIT_MATCHES = "SUBMIT_MATCHES";
export const ACTION_CANCEL_MATCHES = "CANCEL_MATCHES";
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

export const fetchTournamentMatches = params => dispatch => {
  dispatch({
    type: ACTION_REQUEST_TOURNAMENT_MATCHES
  });
  return fetch(ACTION_REQUEST_TOURNAMENT_MATCHES, params).then(tournament => {
    dispatch({
      type: ACTION_RECEIVE_TOURNAMENT_MATCHES,
      tournament
    });
  });
};

export const verifyMatches = params => dispatch => {
  dispatch({
    type: ACTION_VERIFY_MATCHES
  });
  return fetch(ACTION_VERIFY_MATCHES, params)
    .then(verifiedMatches => {
      const matches = verifiedMatches.matches;
      const count = verifiedMatches.count;
      dispatch({
        type: ACTION_RECEIVE_MATCH_VERIFICATION,
        matches,
        count
      });
    })
    .catch(error => {
      toast.error(error.message);
    });
};

export const updateMatch = params => dispatch => {
  dispatch({
    type: ACTION_UPDATE_MATCHES,
    row: params.row,
    column: params.column,
    newValue: params.newValue
  });
};

export const submitMatches = params => dispatch => {
  dispatch({
    type: ACTION_SUBMIT_MATCHES,
    matchesToSubmit: params.matchesToSubmit
  });
  return fetch(ACTION_SUBMIT_MATCHES, params)
    .then(matches => {
      dispatch({
        type: ACTION_MATCHES_SUBMITTED,
        matches
      });
      toast.success("matches were successfully submitted");
    })
    .catch(error => {
      toast.error(error.message);
    });
};

export const cancelSubmitMatches = params => dispatch => {
  dispatch({
    type: ACTION_CANCEL_MATCHES
  });
  toast.error("matches were cancelled");
};
