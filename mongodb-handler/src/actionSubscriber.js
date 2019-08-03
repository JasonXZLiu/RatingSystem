import NATS from "nats";
import { Player } from "./schemas/player";
import { Match } from "./schemas/match";
import { Tournament } from "./schemas/tournament";
import { RatingCalculation } from "./schemas/ratingCalculation";
import { CountryCode } from "./schemas/countryCode";
import { FilterSelector } from "./schemas/filterSelector";

export const CREATE_COUNTRY_CODE = "CREATE_COUNTRY_CODE";
export const CREATE_FILTER_SELECTOR = "CREATE_FILTER_SELECTOR";
export const CREATE_MONGO_MATCH = "CREATE_MONGO_MATCH";
export const CREATE_PLAYER = "CREATE_PLAYER";
export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";
export const CREATE_RATING_CALCULATION = "CREATE_RATING_CALCULATION";

export const subscribeActions = () => {
  var nc = NATS.connect({ url: process.env.NATS_URI });

  // inserting actions
  nc.subscribe(CREATE_COUNTRY_CODE, msg => {
    console.log(msg);
    CountryCode.create(JSON.parse(msg));
  });

  nc.subscribe(CREATE_FILTER_SELECTOR, msg => {
    console.log(msg);
    FilterSelector.create(JSON.parse(msg));
  });

  nc.subscribe(CREATE_MONGO_MATCH, msg => {
    console.log(msg);
    Match.create(JSON.parse(msg));
    return JSON.parse(msg);
  });

  nc.subscribe(CREATE_PLAYER, msg => {
    console.log(msg);
    Player.create(JSON.parse(msg));
  });

  nc.subscribe(CREATE_RATING_CALCULATION, msg => {
    console.log(msg);
    RatingCalculation.create(JSON.parse(msg));
  });

  nc.subscribe(CREATE_TOURNAMENT, msg => {
    console.log(msg);
    Tournament.create(JSON.parse(msg));
  });
};
