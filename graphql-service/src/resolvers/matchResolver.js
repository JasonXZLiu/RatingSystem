export default {
  Query: {
    matches: (root, args, { dataSources }) => {
      const { tournamentId, playerId } = args;
      if (playerId)
        return dataSources.matchAPI.getMatchesByPlayerID({ playerId });
      if (tournamentId)
        return dataSources.matchAPI.getMatchesByTournamentID({ tournamentId });
      return dataSources.matchAPI.getAllMatches();
    },
    match: (root, { id }, { dataSources }) => {
      return dataSources.matchAPI.getMatchByID({ id });
    }
  }
};
