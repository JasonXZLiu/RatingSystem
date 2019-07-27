export default {
  Query: {
    players: (root, args, { dataSources }) =>
      dataSources.playerAPI.getAllPlayers(),
    player: (root, args, { dataSources }) => {
      const { id } = args;
      return dataSources.playerAPI.getPlayerById({ playerId: id });
    }
  }
};
