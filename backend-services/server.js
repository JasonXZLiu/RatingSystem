import express from "express";
import restify from "restify";
import graphqlHTTP from "express-graphql";
import {
  getData,
  PLAYERS,
  PLAYER_BY_ID,
  RATINGS,
  SEX_FILTER,
  PROVINCE_FILTER,
  CATEGORY_FILTER,
  TOURNAMENTS,
  COUNTRY_CODE
} from "./src/repository";

const app = express();
const port = 3030;

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
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(PLAYERS));
});

app.get("/players", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(PLAYERS));
});

app.get("/tournaments", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(TOURNAMENTS));
});

app.get("/countryCode/:countryName", (req, res) => {
  res.type("json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(getData(COUNTRY_CODE, req.params));
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
