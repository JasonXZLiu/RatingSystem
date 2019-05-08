import React from "react";

const NavBarStyle = {
  padding: "0.5rem 18rem 0.5rem 18rem",
  margin: "0rem 0rem 1rem 0rem"
};

class NavBar extends React.Component {
  render = () => {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={NavBarStyle}
      >
        <a className="navbar-brand" href="#">
          ReactApp
        </a>
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
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Tournaments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Ratings
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
}
export default NavBar;
