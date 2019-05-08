import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Board from "./components/Board";

const persons = [
  {
    name: "Jason Liu",
    rating: "2800"
  },
  {
    name: "Grizz",
    rating: "2400"
  },
  {
    name: "Icebear",
    rating: "2100"
  },
  {
    name: "Icebear1",
    rating: "2100"
  },
  {
    name: "Icebear2",
    rating: "2100"
  },
  {
    name: "Icebear3",
    rating: "2100"
  },
  {
    name: "Icebear4",
    rating: "2100"
  },
  {
    name: "Icebear5",
    rating: "2100"
  }
];

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="App container">
        <Board persons={persons} />
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
    </div>
  );
};

export default App;
