"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerRatingSchema = undefined;

var _graphql = require("graphql");

var playerType = new _graphql.GraphQLObjectType({});

var ratingType = new _graphql.GraphQLObjectType({});

var filterType = new _graphql.GraphQLObjectType({});

var queryType = new _graphql.GraphQLObjectType({
  name: "Query",
  fields: function fields() {
    return {
      player: {},
      rating: {},
      filter: {}
    };
  }
});

var PlayerRatingSchema = exports.PlayerRatingSchema = new _graphql.GraphQLSchema({
  query: queryType,
  types: [playerType, ratingType, filterType]
});