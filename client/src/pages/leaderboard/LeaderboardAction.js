import { fetch } from "../../controllers/index";

export const ACTION_REQUEST_LEADERS = "REQUEST_LEADERS";
export const ACTION_RECEIVE_LEADERS = "RECEIVE_LEADERS";

export const fetchLeaders = () => dispatch => {
  dispatch({
    type: ACTION_REQUEST_LEADERS
  });
  return fetch(ACTION_REQUEST_LEADERS).then(leaders => {
    dispatch({
      type: ACTION_RECEIVE_LEADERS,
      leaders
    });
  });
};
