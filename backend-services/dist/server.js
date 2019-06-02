"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _restify = require("restify");

var _restify2 = _interopRequireDefault(_restify);

var _expressGraphql = require("express-graphql");

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _repository = require("./src/repository");

var _repository2 = _interopRequireDefault(_repository);

var _PlayerRepository = require("./src/core/playerRepository/PlayerRepository");

var _FilterRepository = require("./src/core/filterRepository/FilterRepository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _restify2.default.createServer();
var port = 3030;

// GraphQL API
// app.post(
//   "/graphql",
//   graphqlHTTP({
//     schema: MyGraphQLSchema,
//     graphiql: false
//   })
// );

// app.get(
//   "/graphql",
//   graphqlHTTP({
//     schema: MyGraphQLSchema,
//     graphiql: true
//   })
// );

// REST API
app.get("/", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json((0, _repository2.default)(_PlayerRepository.PLAYERS));
});

app.get("/players", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json((0, _repository2.default)(_PlayerRepository.PLAYERS));
});

app.get("/players/:playerId", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json((0, _repository2.default)(_PlayerRepository.PLAYER_BY_ID, req.params));
});

app.get("/ratings", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json((0, _repository2.default)(_PlayerRepository.RATINGS));
});

app.get("/ratings/search=:searchValue&sex=:sexValue&province=:provinceValue&category=:categoryValue", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json((0, _repository2.default)(_PlayerRepository.RATINGS, req.params));
});

app.get("/filter/sex", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json((0, _repository2.default)(_FilterRepository.SEX_FILTER));
});

app.get("/filter/province", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json((0, _repository2.default)(_FilterRepository.PROVINCE_FILTER));
});

app.get("/filter/category", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json((0, _repository2.default)(_FilterRepository.CATEGORY_FILTER));
});

app.listen(port, function (req, res) {
  console.log("server listening on port: " + port);
});