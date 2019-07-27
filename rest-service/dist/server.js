"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _csvtojson = require("csvtojson");

var _csvtojson2 = _interopRequireDefault(_csvtojson);

var _repository = require("./src/repository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = exports.app = (0, _express2.default)();

var jsonParser = _bodyParser2.default.json();
var urlEncodedParser = _bodyParser2.default.urlencoded();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (req, res) {
  res.send("welcome to the rating system");
});

app.get("/players", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.PLAYERS).then(function (data) {
    return res.json(data);
  });
});

app.get("/player/:playerId", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.PLAYER_BY_ID, req.params).then(function (data) {
    return res.json(data);
  });
});

// this is for client perspective
app.get("/player/:playerId/matchHistory", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.PLAYER_MATCH_HISTORY, req.params).then(function (data) {
    return res.json(data);
  });
});

app.get("/player/:playerId/matchHistory/search=:searchValue&result=:resultValue", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.PLAYER_MATCH_HISTORY, req.params).then(function (data) {
    return res.json(data);
  });
});

// this is for admin perspective
app.get("/player/:playerId/matches", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.MATCHES_BY_PLAYER, req.params).then(function (data) {
    return res.json(data);
  });
});

app.get("/ratings", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.RATINGS).then(function (data) {
    return res.json(data);
  });
});

app.get("/ratings/search=:searchValue&sex=:sexValue&province=:provinceValue&category=:categoryValue", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.RATINGS, req.params).then(function (data) {
    return res.json(data);
  });
});

app.get("/tournaments", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.TOURNAMENTS).then(function (data) {
    return res.json(data);
  });
});

app.get("/tournament/:id", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.TOURNAMENT_BY_ID, req.params).then(function (data) {
    return res.json(data);
  });
});

app.get("/tournament/:id/matches", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.MATCHES_BY_TOURNAMENT, req.params).then(function (data) {
    return res.json(data);
  });
});

app.post("/tournament/:id/matches/verify", urlEncodedParser, function (req, res) {
  res.type("json");
  (0, _csvtojson2.default)().fromString(req.body.matches).then(function (jsonObject) {
    (0, _repository.postData)(_repository.VERIFY_TOURNAMENT_MATCHES, {
      id: req.params.id,
      matches: jsonObject.map(function (match) {
        match.calculated = false;
        return match;
      })
    }).then(function (data) {
      res.json(data);
    }).catch(function (error) {
      console.error(error.stack);
      res.status(500).send({ error: error.message });
    });
  }).catch(function (error) {
    console.error(error.stack);
    res.status(500).send({ error: "csv is not in correct format" });
  });
});

app.post("/tournament/:id/matches/submit", jsonParser, function (req, res) {
  res.type("json");
  (0, _repository.postData)(_repository.SUBMIT_TOURNAMENT_MATCHES, req.body).then(function (data) {
    return res.json(data);
  });
});

app.get("/tournament/:tournamentId/player/:playerId/matches", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.MATCHES_BY_PLAYER, req.params).then(function (data) {
    return res.json(data);
  });
});

app.get("/countryCode/:countryName", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.COUNTRY_CODE, req.params).then(function (data) {
    return res.json(data);
  });
});

app.get("/filter/sex", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.SEX_FILTER).then(function (data) {
    return res.json(data);
  });
});

app.get("/filter/province", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.PROVINCE_FILTER).then(function (data) {
    return res.json(data);
  });
});

app.get("/filter/category", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.CATEGORY_FILTER).then(function (data) {
    return res.json(data);
  });
});

app.get("/filter/result", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.RESULT_FILTER).then(function (data) {
    return res.json(data);
  });
});

app.get("/matches", function (req, res) {
  res.type("json");
  (0, _repository.getData)(_repository.MATCHES).then(function (data) {
    return res.json(data);
  });
});

app.get("/calculateRatings", function (req, res) {
  res.type("json");
  (0, _repository.postData)(_repository.CALCULATE_RATINGS).then(function (data) {
    return res.json(data);
  });
});