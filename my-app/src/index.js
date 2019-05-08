import React from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

const state = [];

const MyApp = () => {
  return (
    <div>
      <App />
    </div>
  );
};

render(<MyApp />, document.getElementById("root"));
