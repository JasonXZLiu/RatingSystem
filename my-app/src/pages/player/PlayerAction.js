import { fetch } from "../../controllers/index";

export const ACTION_REQUEST_PLAYER = "REQUEST_PLAYER";
export const ACTION_RECEIVE_PLAYER = "RECEIVE_PLAYER";

export const fetchPlayerById = params => dispatch => {
  dispatch({
    type: ACTION_REQUEST_PLAYER
  });
  return fetch(ACTION_REQUEST_PLAYER, params).then(player => {
    dispatch({
      type: ACTION_RECEIVE_PLAYER,
      player
    });
  });
};
