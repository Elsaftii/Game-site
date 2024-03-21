import React from "react";
import "./Sort.css";
import FeaturedGames from "../FeaturedGames/FeaturedGames";
import { Helmet } from "react-helmet";

export default function Sort() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="list of games that can be played both online and offline on Windows operating system as well as on various web browsers. The list includes popular games from various genres such as action, adventure, puzzle, racing, and more. Users can easily browse through the list, choose their desired game"
        />
        <title>Sort</title>
      </Helmet>
      <FeaturedGames />
    </>
  );
}
