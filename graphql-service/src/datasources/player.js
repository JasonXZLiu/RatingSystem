const { RESTDataSource } = require("apollo-datasource-rest");

class PlayerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://${process.env.SERVER_HOST}:${
      process.env.SERVER_PORT
    }/`;
  }

  playerReducer(player) {
    return player;
  }

  async getAllPlayers() {
    const response = await this.get("players");
    return Array.isArray(response)
      ? response.map(player => this.playerReducer(player))
      : [];
  }

  async getPlayerById({ playerId }) {
    const response = await this.get(`player/${playerId}`);
    return this.playerReducer(response);
  }
}

export default PlayerAPI;
