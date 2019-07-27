import {
  ACTION_REQUEST_RATINGS,
  ACTION_RECEIVE_RATINGS
} from "./RatingsAction";

const initialState = {
  players: [],
  searchValue: null,
  sexValue: null,
  provinceValue: null,
  categoryValue: null
};

export const ratingStore = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REQUEST_RATINGS:
      return {
        ...state,
        isFetching: true
      };
    case ACTION_RECEIVE_RATINGS:
      return {
        ...state,
        isFetching: false,
        players: action.players
      };
    default:
      return state;
  }
};
