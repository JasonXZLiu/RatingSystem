import { ApolloServer } from "apollo-server";
import { merge } from "lodash";
import { typeDefs } from "./schema";

import PlayerAPI from "./datasources/player";
import TournamentAPI from "./datasources/tournament";
import MatchAPI from "./datasources/match";

import playerResolver from "./resolvers/playerResolver";
import tournamentResolver from "./resolvers/tournamentResolver";
import matchResolver from "./resolvers/matchResolver";

const resolvers = merge(playerResolver, tournamentResolver, matchResolver);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    playerAPI: new PlayerAPI(),
    matchAPI: new MatchAPI(),
    tournamentAPI: new TournamentAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
