"use strict";

var express = require("express");
var getData = require("./src/repository");
var app = express();
var port = 3030;

var PLAYERS = "PLAYERS";
var PLAYER_BY_ID = "PLAYER_BY_ID";
var RATINGS = "RATINGS";
var SEX_FILTER = "SEX_FILTER";
var PROVINCE_FILTER = "PROVINCE_FILTER";
var CATEGORY_FILTER = "CATEGORY_FILTER";

app.get("/", function (req, res) {
  res.send({ hi: "hello" });
});

app.get("/players", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(PLAYERS));
});

app.get("/players/:playerId", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(PLAYER_BY_ID, req.params));
});

app.get("/ratings", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(RATINGS));
});

app.get("/ratings/search=:searchValue&sex=:sexValue&province=:provinceValue&category=:categoryValue", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(RATINGS, req.params));
});

app.get("/filter/sex", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(SEX_FILTER));
});

app.get("/filter/province", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(PROVINCE_FILTER));
});

app.get("/filter/category", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(CATEGORY_FILTER));
});

app.listen(port, function (req, res) {
  console.log("server listening on port: " + port);
});