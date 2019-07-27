"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  type Query {\n    players: [Player]\n    player(id: Int!): Player\n    tournaments: [Tournament]\n    tournament(id: ID!): Tournament\n    ratings: [Rating]\n    matches: [Match]\n  }\n\n  type Player {\n    id: ID!\n    name: String\n    rating: [Rating]\n    province: String\n    sex: String\n    age: Int\n    matchHistory: PlayerMatch\n  }\n\n  type PlayerMatch {\n    id: ID!\n    tournament: String\n    date: String\n    opposingRating: Int\n    result: String\n    score: [String]\n  }\n\n  type Rating {\n    periodDate: String\n    rating: Int\n  }\n\n  type Tournament {\n    id: Int\n    name: String\n    startDate: String\n    endDate: String\n    location: Location\n    events: [String]\n  }\n\n  type Location {\n    address: String\n    city: String\n    postalCode: String\n    province: String\n    country: String\n  }\n\n  type Match {\n    tournament: Tournament!\n    calculated: Boolean\n    date: String\n    winner: Player!\n    loser: Player!\n    score: [String]\n  }\n"], ["\n  type Query {\n    players: [Player]\n    player(id: Int!): Player\n    tournaments: [Tournament]\n    tournament(id: ID!): Tournament\n    ratings: [Rating]\n    matches: [Match]\n  }\n\n  type Player {\n    id: ID!\n    name: String\n    rating: [Rating]\n    province: String\n    sex: String\n    age: Int\n    matchHistory: PlayerMatch\n  }\n\n  type PlayerMatch {\n    id: ID!\n    tournament: String\n    date: String\n    opposingRating: Int\n    result: String\n    score: [String]\n  }\n\n  type Rating {\n    periodDate: String\n    rating: Int\n  }\n\n  type Tournament {\n    id: Int\n    name: String\n    startDate: String\n    endDate: String\n    location: Location\n    events: [String]\n  }\n\n  type Location {\n    address: String\n    city: String\n    postalCode: String\n    province: String\n    country: String\n  }\n\n  type Match {\n    tournament: Tournament!\n    calculated: Boolean\n    date: String\n    winner: Player!\n    loser: Player!\n    score: [String]\n  }\n"]);

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = exports.typeDefs = (0, _apolloServer.gql)(_templateObject);