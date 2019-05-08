import React from "react";

const CardStyle = {
  width: "90%",
  margin: "1rem 2rem 1rem 2rem"
};

const Card = props => {
  return (
    <div className="card" style={CardStyle}>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.rating}</p>
        <a href="#" className="card-link">
          View Match History
        </a>
      </div>
    </div>
  );
};
export default Card;
