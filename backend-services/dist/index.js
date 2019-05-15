"use strict";

var express = require("express");
var getData = require("./src/repository");
var app = express();
var port = 3030;

app.set("json spaces", 40);

app.get("/", function (req, res) {
  res.send({ hi: "hello" });
});

app.get("/players", function (req, res) {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData("PLAYERS"));
});

app.get("/ratings", function (req, res) {
  res.send(getData("RATINGS"));
});

app.get("/players/search/:search/category/:category/gender/:gender/province/:province", function (req, res) {
  res.status(200).json(getData("PLAYERS", req.params));
});

app.listen(port, function (req, res) {
  console.log("server listening on port: " + port);
});