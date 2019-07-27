"use strict";

var _apolloServer = require("apollo-server");

var _schema = require("./schema");

var server = new _apolloServer.ApolloServer({ typeDefs: _schema.typeDefs });

server.listen().then(function (_ref) {
  var url = _ref.url;

  console.log("\uD83D\uDE80 Server ready at " + url);
});