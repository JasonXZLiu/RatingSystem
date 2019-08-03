import { Client } from "@elastic/elasticsearch";
import { subscribeActions } from "./src/actionSubscriber";
import { setup } from "./src/setup/setup";

const ES_HOST = process.env.ES_HOST || "localhost";
const ES_PORT = process.env.ES_PORT || "9200";

const uri = `http://${ES_HOST}:${ES_PORT}`;
export const client = new Client({ node: uri });

console.log("connected to elastic search");

const run = async () => {
  await subscribeActions();
  await setup();
};

run();
