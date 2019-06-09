import { getMatchHistoryById } from "./core/playerRepository/playerRepository";
import {
  getPlayers,
  getPlayerById,
  getRatings
} from "./mongoRepository/repositories/playerRepository";
import {
  getSex,
  getCategory,
  getProvince
} from "./mongoRepository/repositories/filterSelectorRepository";
import {
  getTournaments,
  getTournamentById
} from "./mongoRepository/repositories/tournamentRepository";
import { getCountryCode } from "./mongoRepository/repositories/countryCodeRepository";

export const PLAYERS = "PLAYERS";
export const PLAYER_BY_ID = "PLAYER_BY_ID";
export const RATINGS = "RATINGS";
export const SEX_FILTER = "SEX_FILTER";
export const PROVINCE_FILTER = "PROVINCE_FILTER";
export const CATEGORY_FILTER = "CATEGORY_FILTER";
export const TOURNAMENTS = "TOURNAMENTS";
export const TOURNAMENT_BY_ID = "TOURNAMENT_BY_ID";
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
      return getSex();
    case PROVINCE_FILTER:
      return getProvince();
    case CATEGORY_FILTER:
      return getCategory();
    case TOURNAMENTS:
      return getTournaments(params);
    case TOURNAMENT_BY_ID:
      return getTournamentById(params);
    case COUNTRY_CODE:
      return getCountryCode(params);
    default:
      return "NOTHING HERE";
  }
};
