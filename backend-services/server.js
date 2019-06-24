import express from "express";
import bodyParser from "body-parser";
import csv from "csvtojson";
import restify from "restify";
import mongoose from "mongoose";
import graphqlHTTP from "express-graphql";
import {
  postData,
  getData,
  PLAYERS,
  PLAYER_BY_ID,
  RATINGS,
  SEX_FILTER,
  PROVINCE_FILTER,
  CATEGORY_FILTER,
  RESULT_FILTER,
  TOURNAMENT_BY_ID,
  TOURNAMENTS,
  COUNTRY_CODE,
  MATCHES,
  MATCHES_BY_TOURNAMENT,
  MATCHES_BY_PLAYER,
  PLAYER_MATCH_HISTORY,
  VERIFY_TOURNAMENT_MATCHES,
  SUBMIT_TOURNAMENT_MATCHES
} from "./src/repository";
import { setup } from "./src/setup/setup";

const app = express();
const port = 4000;
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded();

const uri = "mongodb://localhost/ratingSystem";
const options = { useNewUrlParser: true };
mongoose.connect(uri, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  setup();
});

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
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send("welcome to the rating system");
});

app.get("/players", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(PLAYERS).then(data => res.json(data));
});

app.get("/player/:playerId", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(PLAYER_BY_ID, req.params).then(data => res.json(data));
});

// this is for client perspective
app.get("/player/:playerId/matchHistory", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(PLAYER_MATCH_HISTORY, req.params).then(data => res.json(data));
});

app.get(
  "/player/:playerId/matchHistory/search=:searchValue&result=:resultValue",
  (req, res) => {
    res.type("json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    getData(PLAYER_MATCH_HISTORY, req.params).then(data => res.json(data));
  }
);

// this is for admin perspective
app.get("/player/:playerId/matches", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(MATCHES_BY_PLAYER, req.params).then(data => res.json(data));
});

app.get("/ratings", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(RATINGS).then(data => res.json(data));
});

app.get(
  "/ratings/search=:searchValue&sex=:sexValue&province=:provinceValue&category=:categoryValue",
  (req, res) => {
    res.type("json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    getData(RATINGS, req.params).then(data => res.json(data));
  }
);

app.get("/tournaments", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(TOURNAMENTS).then(data => res.json(data));
});

app.get("/tournament/:id", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(TOURNAMENT_BY_ID, req.params).then(data => res.json(data));
});

app.get("/tournament/:id/matches", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(MATCHES_BY_TOURNAMENT, req.params).then(data => res.json(data));
});

app.post("/tournament/:id/matches/verify", urlEncodedParser, (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  csv()
    .fromString(req.body.matches)
    .then(jsonObject => {
      postData(VERIFY_TOURNAMENT_MATCHES, {
        id: req.params.id,
        matches: jsonObject
      })
        .then(data => {
          res.json(data);
        })
        .catch(error => {
          console.error(error.stack);
          res.status(500).send({ error: "could not map csv to object" });
        });
    })
    .catch(error => {
      console.error(error.stack);
      res.status(500).send({ error: "csv is not in correct format" });
    });
});

app.post("/tournament/:id/matches/submit", jsonParser, (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  postData(SUBMIT_TOURNAMENT_MATCHES, req.params).then(data => res.json(data));
});

app.get("/tournament/:tournamentId/player/:playerId/matches", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(MATCHES_BY_PLAYER, req.params).then(data => res.json(data));
});

app.get("/countryCode/:countryName", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(COUNTRY_CODE, req.params).then(data => res.json(data));
});

app.get("/filter/sex", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(SEX_FILTER).then(data => res.json(data));
});

app.get("/filter/province", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(PROVINCE_FILTER).then(data => res.json(data));
});

app.get("/filter/category", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(CATEGORY_FILTER).then(data => res.json(data));
});

app.get("/filter/result", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(RESULT_FILTER).then(data => res.json(data));
});

app.get("/matches", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  getData(MATCHES).then(data => res.json(data));
});

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
