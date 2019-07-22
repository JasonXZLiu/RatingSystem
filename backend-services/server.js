import mongoose from "mongoose";
import graphqlHTTP from "express-graphql";
import schedule from "node-schedule";
import { app } from "./src/middlewares/server";
import { setup } from "./src/setup/setup";
import { calculateRatings } from "./src/core/services/ratingCalculationService";

const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "ratingsystem";

const uri = `mongodb://${MONGO_HOST}:27017/${DB_NAME}`;
const options = { useNewUrlParser: true };
mongoose.connect(uri, options);

// mongoose
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  setup();
});

// REST API
const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, HOST);
console.log(`server listening on port: ${PORT}`);

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
          res.status(500).send({ error: error.message });
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
  postData(SUBMIT_TOURNAMENT_MATCHES, req.body).then(data => res.json(data));
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

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});

// GraphQL API

// node schedule
const rule = new schedule.RecurrenceRule();

// run on the 1st of every month at 5:00 PM
rule.month = [new schedule.Range(0, 11)];
rule.date = 1;
rule.hour = 17;
rule.minute = 0;

const calculateRatingsJob = schedule.scheduleJob(rule, async function() {
  await calculateRatings();
});
