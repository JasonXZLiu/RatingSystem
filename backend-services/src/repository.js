import {
  getPlayers,
  getPlayerById,
  getMatchHistoryById,
  getRatings
} from "./core/playerRepository/playerRepository";
import {
  getSex,
  getCategory,
  getProvince
} from "./core/filterRepository/filterRepository";

export const PLAYERS = "PLAYERS";
export const PLAYER_BY_ID = "PLAYER_BY_ID";
export const RATINGS = "RATINGS";
export const SEX_FILTER = "SEX_FILTER";
export const PROVINCE_FILTER = "PROVINCE_FILTER";
export const CATEGORY_FILTER = "CATEGORY_FILTER";

export const getData = (request, params) => {
  switch (request) {
    case PLAYERS:
      return getPlayers();
    case PLAYER_BY_ID:
      return getPlayerById(params);
    case RATINGS:
      return getRatings(params);
    case SEX_FILTER:
      return getSex(params);
    case PROVINCE_FILTER:
      return getProvince(params);
    case CATEGORY_FILTER:
      return getCategory(params);
    default:
      return "NOTHING HERE";
  }
};
