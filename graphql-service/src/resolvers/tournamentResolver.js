export default {
  Query: {
    tournaments: (root, args, { dataSources }) =>
      dataSources.tournamentAPI.getAllTournaments(),
    tournament: (root, args, { dataSources }) => {
      const { id } = args;
      return dataSources.tournamentAPI.getTournamentById({ tournamentId: id });
    }
  }
};
