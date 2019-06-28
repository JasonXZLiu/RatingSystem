import { getMatches } from "../repositories/matchRepository";
import { start } from "repl";

const getMatchesForLastMonth = async () => {
  const startDate = new Date();
  var endDate = startDate;
  endDate.setMonth(endDate.getMonth() - 1);
  return await getMatchesBetweenDates({
    startDate: startDate,
    endDate: endDate
  });
};

const calculateRating = match => {
  // const winner = match.winner;
  // const loser = match.loser;
  // const pointDifference =
  // always change temporary rating field
  // if no temporary rating field, add one
  // then perform calculations
};

const reconcileRatings = () => {
  const players = getPlayers();

  // basically add temporary rating to rating array
  // remember to add date on the last object of array
  // remmeber not to clear temporary rating
};

export const calculateRatings = async () => {
  const matches = await getMatchesForLastMonth();
  matches.map(match => calculateRating(match));
  reconcileRatings();
};
