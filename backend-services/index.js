const express = require("express");
const getData = require("./src/repository");
const app = express();
const port = 3030;

const PLAYERS = "PLAYERS";
const PLAYER_BY_ID = "PLAYER_BY_ID";
const RATINGS = "RATINGS";
const SEX_FILTER = "SEX_FILTER";
const PROVINCE_FILTER = "PROVINCE_FILTER";
const CATEGORY_FILTER = "CATEGORY_FILTER";

app.get("/", (req, res) => {
  res.send({ hi: "hello" });
});

app.get("/players", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(PLAYERS));
});

app.get("/players/:playerId", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(PLAYER_BY_ID, req.params));
});

app.get("/ratings", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(RATINGS));
});

app.get(
  "/ratings/search=:searchValue&sex=:sexValue&province=:provinceValue&category=:categoryValue",
  (req, res) => {
    res.type("json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.json(getData(RATINGS, req.params));
  }
);

app.get("/filter/sex", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(SEX_FILTER));
});

app.get("/filter/province", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(PROVINCE_FILTER));
});

app.get("/filter/category", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(CATEGORY_FILTER));
});

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
