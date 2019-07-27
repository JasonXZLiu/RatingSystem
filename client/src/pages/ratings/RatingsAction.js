import { fetch } from "../../controllers/index";

export const ACTION_REQUEST_RATINGS = "REQUEST_RATINGS";
export const ACTION_RECEIVE_RATINGS = "RECEIVE_RATINGS";

export const fetchPlayers = params => dispatch => {
  dispatch({
    type: ACTION_REQUEST_RATINGS
  });
  return fetch(ACTION_REQUEST_RATINGS, params).then(players => {
    dispatch({
      type: ACTION_RECEIVE_RATINGS,
      players
    });
  });
};
