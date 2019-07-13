import mongoose, { Schema } from "mongoose";
import { PlayerMatch, Player } from "./player";
import { getPlayer } from "../repositories/playerRepository";
import { getPlayerLastMonthRating } from "../services/ratingCalculationService";
const MongooseTrigger = require("mongoose-trigger");

const matchSchema = new mongoose.Schema(
  {
    tournament: { type: Schema.Types.ObjectId, ref: "Tournament" },
    calculated: Boolean,
    date: Date,
    winner: { type: Schema.Types.ObjectId, ref: "Player" },
    loser: { type: Schema.Types.ObjectId, ref: "Player" },
    score: [String]
  },
  { collection: "matches" }
);

const matchEvents = MongooseTrigger(matchSchema, {
  events: {
    create: {
      select: "_id tournament date winner loser score",
      populate: {
        path: "tournament winner loser"
      }
    },
    update: {
      select: "_id tournament date winner loser score",
      populate: {
        path: "tournament winner loser"
      }
    },
    remove: {
      select: "_id tournament date winner loser score",
      populate: {
        path: "tournament winner loser"
      }
    }
  }
});

const insertPlayerMatchHistory = (playerId, matchId) => {
  getPlayer({ _id: playerId }).then(data => {
    if (data.matchHistory && data.matchHistory.length > 0)
      data.matchHistory = [...data.matchHistory, matchId];
    else data.matchHistory = [matchId];
    data.save();
  });
};

const deletePlayerMatchHistory = (playerId, matchId) => {
  getPlayer({ _id: playerId }).then(data => {
    data.matchHistory = data.matchHistory.filter(id => {
      id !== matchId;
    });
    data.save();
  });
};

const insertPlayerMatch = data => {
  const winnerMatch = {
    _id: mongoose.Types.ObjectId(),
    tournament: data.tournament.name,
    matchId: data._id,
    date: data.date,
    opponent: data.loser.name,
    opposingRating: getPlayerLastMonthRating(data.loser).rating,
    result: "W",
    score: data.score
  };
  const loserMatch = {
    _id: mongoose.Types.ObjectId(),
    tournament: data.tournament.name,
    matchId: data._id,
    date: data.date,
    opponent: data.winner.name,
    opposingRating: getPlayerLastMonthRating(data.winner).rating,
    result: "L",
    score: data.score.map(set => {
      const setArray = set.split("-");
      return setArray[1] + "-" + setArray[0];
    })
  };
  PlayerMatch.insertMany([winnerMatch, loserMatch]);
  insertPlayerMatchHistory(data.winner._id, winnerMatch._id);
  insertPlayerMatchHistory(data.loser._id, loserMatch._id);
};

const updatePlayerMatch = data => {
  PlayerMatch.findOneAndUpdate(
    { matchId: data._id },
    {
      _id: mongoose.Types.ObjectId(),
      tournament: data.tournament.name,
      matchId: data._id,
      date: data.date,
      opponent: data.loser.name,
      opposingRating: getPlayerLastMonthRating(data.loser).rating,
      result: "W",
      score: data.score
    }
  );
  PlayerMatch.findOneAndUpdate(
    { matchId: data._id },
    {
      _id: mongoose.Types.ObjectId(),
      tournament: data.tournament.name,
      matchId: data._id,
      date: data.date,
      opponent: data.winner.name,
      opposingRating: getPlayerLastMonthRating(data.winner).rating,
      result: "L",
      score: data.score.map(set => {
        const setArray = set.split("-");
        return setArray[1] + "-" + setArray[0];
      })
    }
  );
};

matchEvents.on("create", data => insertPlayerMatch(data));
matchEvents.on("update", data => updatePlayerMatch(data));
matchEvents.on("remove", data => {
  const winnerId = data.winner._id;
  const loserId = data.loser._id;
  const matchId = data._id;

  PlayerMatch.find({ matchId: matchId }).then(data => {
    PlayerMatch.deleteMany(data.map(match => match._id));
  });

  deletePlayerMatchHistory(winnerId, matchId);
  deletePlayerMatchHistory(loserId, matchId);
});

export const Match = mongoose.model("Match", matchSchema);
