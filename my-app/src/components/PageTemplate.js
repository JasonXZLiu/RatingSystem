import React from "react";
import NavBar from "./NavBar";

class PageTemplate extends React.Component {
  render = () => {
    return (
      <div>
        <NavBar />
        <div className="container" />
      </div>
    );
  };
}
