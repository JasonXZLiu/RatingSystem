import { Client } from "@elastic/elasticsearch";
import { subscribeActions } from "./src/actionSubscriber";
import { PLAYER_INDEX } from "./src/repositories/playerRepository";
import { TOURNAMENT_INDEX } from "./src/repositories/tournamentRepository";
import { MATCH_INDEX } from "./src/repositories/matchRepository";
import { setup } from "./src/setup/setup";

const ES_HOST = process.env.ES_HOST || "localhost";
const ES_PORT = process.env.ES_PORT || "9200";

const uri = `http://${ES_HOST}:${ES_PORT}`;
export const client = new Client({ node: uri });

console.log("connected to elastic search");

client.indices.create({
  index: PLAYER_INDEX,
  body: {
    id: { type: "integer" },
    name: { type: "text" },
    rating: { type: "integer" },
    province: { type: "text" },
    sex: { type: "text" },
    age: { type: "integer" }
  }
});

client.indices.create({
  index: TOURNAMENT_INDEX,
  body: {
    id: { type: "integer" },
    name: { type: "text" },
    startDate: { type: "date" },
    endDate: { type: "date" },
    location: { type: "text" },
    events: { type: "text" }
  }
});

client.indices.create({
  index: MATCH_INDEX,
  body: {
    tournament: { type: "text" },
    calculated: { type: "boolean" },
    date: { type: "date" },
    winner: { type: "string" },
    loser: { type: "string" },
    score: { type: "string" }
  }
});

subscribeActions();

setup();
