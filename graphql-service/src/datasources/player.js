const { RESTDataSource } = require("apollo-datasource-rest");

class PlayerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://api:5001/";
  }

  playerReducer(player) {
    // finish this
    return;
  }

  async getAllPlayers() {
    const response = await this.get("players");
    return Array.isArray(response)
      ? response.map(player => this.playerReducer(player))
      : [];
  }

  async getPlayer(id) {
    const response = await this.get(`player/${id}`);
    return this.playerReducer(response);
  }
}

export default PlayerAPI;
