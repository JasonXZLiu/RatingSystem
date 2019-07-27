"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = void 0;

var _elasticsearch = require("@elastic/elasticsearch");

var _actionSubscriber = require("./src/actionSubscriber");

var _playerRepository = require("./src/repositories/playerRepository");

var _tournamentRepository = require("./src/repositories/tournamentRepository");

var _matchRepository = require("./src/repositories/matchRepository");

var _setup = require("./src/setup/setup");

const ES_HOST = process.env.ES_HOST || "localhost";
const ES_PORT = process.env.ES_PORT || "9200";
const uri = `http://${ES_HOST}:${ES_PORT}`;
const client = new _elasticsearch.Client({
  node: uri
});
exports.client = client;
console.log("connected to elastic search");
client.indices.create({
  index: _playerRepository.PLAYER_INDEX,
  body: {
    id: {
      type: "integer"
    },
    name: {
      type: "text"
    },
    rating: {
      type: "integer"
    },
    province: {
      type: "text"
    },
    sex: {
      type: "text"
    },
    age: {
      type: "integer"
    }
  }
});
client.indices.create({
  index: _tournamentRepository.TOURNAMENT_INDEX,
  body: {
    id: {
      type: "integer"
    },
    name: {
      type: "text"
    },
    startDate: {
      type: "date"
    },
    endDate: {
      type: "date"
    },
    location: {
      type: "text"
    },
    events: {
      type: "text"
    }
  }
});
client.indices.create({
  index: _matchRepository.MATCH_INDEX,
  body: {
    tournament: {
      type: "text"
    },
    calculated: {
      type: "boolean"
    },
    date: {
      type: "date"
    },
    winner: {
      type: "string"
    },
    loser: {
      type: "string"
    },
    score: {
      type: "string"
    }
  }
});
(0, _actionSubscriber.subscribeActions)();
(0, _setup.setup)();