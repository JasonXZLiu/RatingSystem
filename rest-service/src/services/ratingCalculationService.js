import {
  getMatches,
  getMatchesBetweenDates,
  getMatchesToBeCalculated
} from "../repositories/matchRepository";
import { start } from "repl";
import { getPlayers } from "../repositories/playerRepository";
import {
  getRatingCalculation,
  clearRatingCalculation
} from "../repositories/ratingCalculationRepository";

const calculateTemporaryRating = (playerId, matches) => {
  if (matches.length === 1) return 100;

  const lowestLostRating = Math.min(
    matches.filter(match => match.loser.id).map(match => match.rating)
  );
  const highestWinRating = Math.max(
    matches.filter(match => match.winner.id).map(match => match.rating)
  );
  return Math.round((lowestLostRating + highestWinRating) / 2);
};

const updateTemporaryRating = (player, match) => {
  const oldMatches = player.temporaryRating
    ? player.temporaryRating.matches
    : [];
  const matches = [...oldMatches, match];
  const temporaryRating = calculateTemporaryRating(player.id, matches);
  player.temporaryRating = {
    rating: temporaryRating,
    matches: matches
  };
  // turns temporary rating to permanent after certain condition
  if (matches.length === 10) {
    player.newRating = [
      {
        rating: player.temporaryRating.rating,
        periodDate: new Date()
      }
    ];
    player.temporaryRating = null;
  }
  player.save();
  return player;
};

export const getPlayerLastMonthRating = player => {
  if (!!player.rating) {
    const ratingHistory = player.rating;
    return ratingHistory[0].rating;
  }

  // null means no rating (temporary or permanent) ever existed
  return null;
};

const updatePlayerRatingsForMatch = async (
  winner,
  loser,
  winnerRating,
  loserRating
) => {
  const pointDifference = winnerRating - loserRating;
  const ratingChange = await getRatingCalculation({
    pointDifference: pointDifference
  });
  winner.newRating.rating += ratingChange.winner;
  loser.newRating.rating -= ratingChange.loser;
  await winner.save();
  await loser.save();
};

const calculateRating = async match => {
  const winner = match.winner;
  const loser = match.loser;
  const winnerRating = await getPlayerLastMonthRating(winner);
  const loserRating = await getPlayerLastMonthRating(loser);

  console.log("calculating rating");
  console.log("last winner rating", winnerRating);
  console.log("last loser rating", loserRating);

  // if both null, just continue without updating rating for either
  if (!winnerRating && !loserRating) return;

  // if just one is null, then update temporary ratings
  if (!winnerRating) await updateTemporaryRating(winner, match);
  if (!loserRating) await updateTemporaryRating(loser, match);

  // change only newRating field (will be reconciled later at the end)
  if (winnerRating && loserRating) {
    console.log("not temporary");
    await updatePlayerRatingsForMatch(winner, loser, winnerRating, loserRating);
    console.log("new winner rating", winner.newRating.rating);
    console.log("new loser rating", loser.newRating.rating);
  }

  match.calculated = true;
  await match.save();
};

export const calculateRatings = async () => {
  await setupPlayerNewRatings();
  const matches = await getMatchesToBeCalculated();
  return await Promise.all(matches.map(match => calculateRating(match))).then(
    async () => {
      return await reconcileRatings();
    }
  );
};

const setupNewRating = async player => {
  if (!!player.temporaryRating && player.temporaryRating.matches.length > 0)
    return;
  console.log("rating", await getPlayerLastMonthRating(player));
  player.newRating = {
    periodDate: new Date(),
    rating: await getPlayerLastMonthRating(player)
  };
  await console.log(player.newRating);
  player.save();
};

const setupPlayerNewRatings = async () => {
  const players = await getPlayers();
  await Promise.all(players.map(player => setupNewRating(player)));
  await console.log(players);
};

const reconcileRatings = async () => {
  const players = await getPlayers();
  players.map(player => {
    const newRating = player.newRating;
    console.log(`player ${player.id} newRating`, newRating);
    player.rating = [newRating, ...player.rating];
    player.newRating = {};
    player.save();
  });
  return players;
};
