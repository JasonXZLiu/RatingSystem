import { fetch } from "../../controllers/index";

export const ACTION_REQUEST_PLAYER = "REQUEST_PLAYER";
export const ACTION_RECEIVE_PLAYER = "RECEIVE_PLAYER";
export const ACTION_REQUEST_PLAYER_MATCH_HISTORY =
  "REQUEST_PLAYER_MATCH_HISTORY";
export const ACTION_RECEIVE_PLAYER_MATCH_HISTORY =
  "RECEIVE_PLAYER_MATCH_HISTORY";

export const fetchPlayerById = params => dispatch => {
  dispatch({
    type: ACTION_REQUEST_PLAYER
  });
  return fetch(ACTION_REQUEST_PLAYER, params).then(player => {
    dispatch({
      type: ACTION_RECEIVE_PLAYER,
      player: {
        ...player,
        rating: player.rating[0].rating
      }
    });
  });
};

export const fetchPlayerMatchHistory = params => dispatch => {
  dispatch({
    type: ACTION_REQUEST_PLAYER_MATCH_HISTORY
  });
  return fetch(ACTION_REQUEST_PLAYER_MATCH_HISTORY, params).then(
    matchHistory => {
      dispatch({
        type: ACTION_RECEIVE_PLAYER_MATCH_HISTORY,
        matchHistory
      });
    }
  );
};
