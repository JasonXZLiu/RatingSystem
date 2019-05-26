const playerRepository = require("./playerRepository/playerRepository");
const getPlayers = playerRepository.getPlayers;
const getPlayerById = playerRepository.getPlayerById;
const getMatchHistoryById = playerRepository.getMatchHistoryById;
const getRatings = playerRepository.getRatings;
const filterRepository = require("./filterRepository/filterRepository");
const getSex = filterRepository.getSex;
const getCategory = filterRepository.getCategory;
const getProvince = filterRepository.getProvince;

const PLAYERS = "PLAYERS";
const PLAYER_BY_ID = "PLAYER_BY_ID";
const RATINGS = "RATINGS";
const SEX_FILTER = "SEX_FILTER";
const PROVINCE_FILTER = "PROVINCE_FILTER";
const CATEGORY_FILTER = "CATEGORY_FILTER";

function getData(request, params) {
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
}

module.exports = getData;
