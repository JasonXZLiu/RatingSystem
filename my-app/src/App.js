import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import Leaderboard from "./components/leaderboard/Leaderboard";

const persons = [
  {
    name: "Icebear",
    rating: "2100"
  },
  {
    name: "Icebear1",
    rating: "400"
  },
  {
    name: "Icebear2",
    rating: "3030"
  },
  {
    name: "Icebear3",
    rating: "600"
  },
  {
    name: "Icebear4",
    rating: "611"
  },
  {
    name: "Icebear5",
    rating: "711"
  },
  {
    name: "Icebear6",
    rating: "3456"
  },
  {
    name: "Icebear7",
    rating: "373"
  },
  {
    name: "Icebear8",
    rating: "1451"
  },
  {
    name: "Icebear9",
    rating: "346"
  },
  {
    name: "Icebear10",
    rating: "16"
  },
  {
    name: "Icebear11",
    rating: "14"
  },
  {
    name: "Icebear12",
    rating: "324"
  },
  {
    name: "Icebear13",
    rating: "2100"
  },
  {
    name: "Icebear14",
    rating: "534"
  }
];

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="App container">
        <Leaderboard persons={persons} />
      </div>
    </div>
  );
};

export default App;
