import mongoose from "mongoose";
import schedule from "node-schedule";
import { calculateRatings } from "./src/services/ratingCalculationService";
import { subscribeActions } from "./src/actionSubscriber";

const uri = `mongodb://${process.env.MONGO_HOST}:27017/${process.env.DB_NAME}`;
const options = { useNewUrlParser: true };
mongoose.connect(uri, options);

// mongoose
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {});

subscribeActions();

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
