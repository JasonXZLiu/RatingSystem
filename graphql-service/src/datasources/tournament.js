const { RESTDataSource } = require("apollo-datasource-rest");

class TournamentAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://${process.env.SERVER_HOST}:${
      process.env.SERVER_PORT
    }/`;
  }

  tournamentReducer(tournament) {
    return tournament;
  }

  async getAllTournaments() {
    const response = await this.get("tournaments");
    return Array.isArray(response)
      ? response.map(tournament => this.tournamentReducer(tournament))
      : [];
  }

  async getTournamentById({ tournamentId }) {
    const response = await this.get(`tournament/${tournamentId}`);
    return this.tournamentReducer(response);
  }
}

export default TournamentAPI;
