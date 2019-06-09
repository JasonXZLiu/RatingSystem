import mongoose from "mongoose";
import { Player } from "./models/player";

const uri = "mongodb://localhost/ratingSystem";
const options = { useNewUrlParser: true };
mongoose.connect(uri, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  const player1 = new Player({
    name: "Icebear",
    rating: 2100,
    province: "ON",
    sex: "F",
    age: 18
  });
  player1.save(function(err, player1) {
    if (err) return console.error(err);
    console.log(player1.name + " has been saved");
  });
});
