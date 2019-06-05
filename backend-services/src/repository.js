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
import {
  getTournaments,
  getTournamentById
} from "./core/tournamentRepository/tournamentRepository";
import { getCountryCode } from "./core/countryRepository/countryRepository";

export const PLAYERS = "PLAYERS";
export const PLAYER_BY_ID = "PLAYER_BY_ID";
export const RATINGS = "RATINGS";
export const SEX_FILTER = "SEX_FILTER";
export const PROVINCE_FILTER = "PROVINCE_FILTER";
export const CATEGORY_FILTER = "CATEGORY_FILTER";
export const TOURNAMENTS = "TOURNAMENTS";
export const TOURNAMENT = "TOURNAMENT";
export const COUNTRY_CODE = "COUNTRY_CODE";

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
    case TOURNAMENTS:
      return getTournaments(params);
    case TOURNAMENT:
      return getTournamentById(params);
    case COUNTRY_CODE:
      return getCountryCode(params);
    default:
      return "NOTHING HERE";
  }
};
