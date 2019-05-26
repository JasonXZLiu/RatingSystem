import React, { Component } from "react";
import NavBar from "./NavBar";

class PageTemplate extends Component {
  render = () => {
    return (
      <div>
        <NavBar />
        <div className="container" />
      </div>
    );
  };
}
