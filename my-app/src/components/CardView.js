import React from "react";
import Card from "./Card";

const CardView = props => {
  return (
    <div className="row">
      {props.list.map(i => {
        return (
          // remember to change the key here
          <div key={i.name} className="col-sm-3">
            <Card name={i.name} rating={i.rating} />
          </div>
        );
      })}
    </div>
  );
};
export default CardView;
