import mongoose from "mongoose";
import schedule from "node-schedule";
import { app } from "./server";
import { setup } from "./src/setup/setup";
import { calculateRatings } from "./src/services/ratingCalculationService";

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
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, HOST);
console.log(`server listening on port: ${PORT}`);

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
