import React from "react";
import { Link } from "react-router-dom";

const NavBarStyle = {
  padding: "0.5% 10%",
  margin: "0rem 0rem 1rem 0rem"
};

class NavBar extends React.Component {
  render = () => {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={NavBarStyle}
      >
        <Link className="navbar-brand" to="/">
          ReactApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link
                className="nav-link"
                to={{ pathname: "/", state: "desiredState" }}
              >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={{ pathname: "/tournaments", state: "desiredState" }}
              >
                Tournaments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={{ pathname: "/rating", state: "desiredState" }}
              >
                Ratings
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
}
export default NavBar;
