"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = void 0;

var _elasticsearch = require("@elastic/elasticsearch");

var _actionSubscriber = require("./src/actionSubscriber");

const ES_HOST = process.env.ES_HOST || "localhost";
const ES_PORT = process.env.ES_PORT || "9200";
const uri = `http://${ES_HOST}:${ES_PORT}`;
const client = new _elasticsearch.Client({
  node: uri
});
exports.client = client;
(0, _actionSubscriber.subscribeActions)();