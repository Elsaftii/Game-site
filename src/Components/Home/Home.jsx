import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Recommendations from "../Recommendations/Recommendations";
import { Helmet } from "react-helmet";

export default function Home() {
  const [userName, setuserName] = useState(null);
  const userData = JSON.parse(localStorage.getItem("UserData"));
  function getUserData() {
    if (userData) {
      setuserName(userData.name);
    } else {
      return;
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="list of games that can be played both online and offline on Windows operating system as well as on various web browsers. The list includes popular games from various genres such as action, adventure, puzzle, racing, and more. Users can easily browse through the list, choose their desired game"
        />
        <title>Game Over</title>
      </Helmet>
      <section>
        <div className="mainLanding mb-5 d-flex justify-content-center align-items-center flex-column">
          {userData ? (
            <h1>
              Hi <span className="text-main">{userName}!</span>
            </h1>
          ) : null}
          <h1>
            Find & track the best{" "}
            <span className="text-main">free-to-play</span> games!
          </h1>
          <p className="fs-5 fw-light text-white-50 opacity-75">
            Track what you've played and search for what to play next! Plus get
            free premium loot!
          </p>
          <Link to={"/games/all"} className="btn btn-outline-light opacity-75">
            Browse Games
          </Link>
        </div>
      </section>
      <Recommendations />
    </>
  );
}
