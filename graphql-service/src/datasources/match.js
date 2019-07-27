const { RESTDataSource } = require("apollo-datasource-rest");

class MatchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://${process.env.SERVER_HOST}:${
      process.env.SERVER_PORT
    }/`;
  }

  matchReducer(match) {
    return match;
  }

  async getAllMatches() {
    const response = await this.get("matches");
    return Array.isArray(response)
      ? response.map(match => this.matchReducer(match))
      : [];
  }

  async getMatchesByTournamentID({ tournamentId }) {
    const response = await this.get(`tournament/${tournamentId}/matches`);
    return Array.isArray(response)
      ? response.map(match => this.matchReducer(match))
      : [];
  }

  async getMatchesByPlayerID({ playerId }) {
    const response = await this.get(`player/${playerId}/matches`);
    return Array.isArray(response)
      ? response.map(match => this.matchReducer(match))
      : [];
  }

  async getMatch({ id }) {
    const response = await this.get(`match/${id}`);
    return this.matchReducer(response);
  }
}

export default MatchAPI;
