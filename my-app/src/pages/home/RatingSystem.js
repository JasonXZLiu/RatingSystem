import React from "react";
import BillboardHeader from "../../components/billboardHeader/BillboardHeader";
import teamCanada from "../../resources/teamCanada.jpg";
import NavBar from "../../components/NavBar";

export const RatingSystem = () => (
  <div>
    <NavBar />
    <BillboardHeader photoSrc={teamCanada} title="Rating System" />
  </div>
);
