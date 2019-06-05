import { fetch } from "../../controllers/index";

export const ACTION_REQUEST_TOURNAMENTS = "REQUEST_TOURNAMENTS";
export const ACTION_RECEIVE_TOURNAMENTS = "RECEIVE_TOURNAMENTS";
export const ACTION_REQUEST_TOURNAMENT = "REQUEST_TOURNAMENT";
export const ACTION_RECEIVE_TOURNAMENT = "RECEIVE_TOURNAMENT";

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
