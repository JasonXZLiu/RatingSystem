import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

const MyApp = () => {
  return (
    <div>
      <App />
    </div>
  );
};

render(<MyApp />, document.getElementById("root"));
