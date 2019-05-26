import { fetch } from "../../controllers/index";

export const ACTION_REQUEST_PLAYERS = "REQUEST_PLAYERS";
export const ACTION_RECEIVE_PLAYERS = "RECEIVE_PLAYERS";

export const fetchPlayers = () => dispatch => {
  dispatch({
    type: ACTION_REQUEST_PLAYERS
  });
  return fetch(ACTION_REQUEST_PLAYERS).then(players => {
    dispatch({
      type: ACTION_RECEIVE_PLAYERS,
      players
    });
  });
};
