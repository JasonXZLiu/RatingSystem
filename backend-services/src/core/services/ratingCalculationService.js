import { getMatches } from "../repositories/matchRepository";
import { start } from "repl";

const getPlayerPreviousRating = player => {
  if (!!player.rating) {
    const ratingHistory = player.rating;
    return ratingHistory[ratingHistory.length - 1];
  }

  if (!!player.temporaryRating) {
    return player.temporaryRating;
  }

  return null;
};

const updatePlayerPreviousRating = (player, newRating) => {};

const calculateRating = match => {
  const winner = match.winner;
  const loser = match.loser;
  const winnerRating = getPlayerPreviousRating(winner);
  const loserRating = getPlayerPreviousRating(loser);

  // if null, create temporary rating for player (where tempRating = other rating)
  // if both null, just continue without creating

  // basically, winner or loser rating won't update if one is temporary
  // other one will update through weighted average
  // if both temporary, just continue without updating

  // update ratings based off of last played rating (in rating history)
  // calculate
  // use new ratings to update newRating field
};

const getMatchesForLastMonth = async () => {
  const startDate = new Date();
  var endDate = startDate;
  endDate.setMonth(endDate.getMonth() - 1);
  return await getMatchesBetweenDates({
    startDate: startDate,
    endDate: endDate
  });
};

export const calculateRatings = async () => {
  const matches = await getMatchesForLastMonth();
  matches.map(match => calculateRating(match));
  reconcileRatings();
};

const reconcileRatings = () => {
  const players = getPlayers();

  // basically add temporary rating to rating array
  // remember to add date on the last object of array
  // remmeber not to clear temporary rating
};
