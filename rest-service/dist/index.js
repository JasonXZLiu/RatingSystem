"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nodeSchedule = require("node-schedule");

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _server = require("./server");

var _setup = require("./src/setup/setup");

var _ratingCalculationService = require("./src/services/ratingCalculationService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONGO_HOST = process.env.MONGO_HOST || "localhost";
var DB_NAME = process.env.DB_NAME || "ratingsystem";

var uri = "mongodb://" + MONGO_HOST + ":27017/" + DB_NAME;
var options = { useNewUrlParser: true };
_mongoose2.default.connect(uri, options);

// mongoose
var db = _mongoose2.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  (0, _setup.setup)();
});

// REST API
var HOST = process.env.SERVER_HOST || "localhost";
var PORT = process.env.SERVER_PORT || 5000;

_server.app.listen(PORT, HOST);
console.log("server listening on port: " + PORT);

// node schedule
var rule = new _nodeSchedule2.default.RecurrenceRule();

// run on the 1st of every month at 5:00 PM
rule.month = [new _nodeSchedule2.default.Range(0, 11)];
rule.date = 1;
rule.hour = 17;
rule.minute = 0;

var calculateRatingsJob = _nodeSchedule2.default.scheduleJob(rule, async function () {
  await (0, _ratingCalculationService.calculateRatings)();
});