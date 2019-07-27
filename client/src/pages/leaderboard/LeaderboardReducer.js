import {
  ACTION_REQUEST_LEADERS,
  ACTION_RECEIVE_LEADERS
} from "./LeaderboardAction";

const initialState = {
  leaders: []
};

export const leaderboard = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REQUEST_LEADERS:
      return {
        ...state,
        isFetching: true
      };
    case ACTION_RECEIVE_LEADERS:
      return {
        ...state,
        isFetching: false,
        leaders: action.leaders
      };
    default:
      return state;
  }
};
