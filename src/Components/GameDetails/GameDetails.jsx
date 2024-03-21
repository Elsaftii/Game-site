import React, { useEffect, useState } from "react";
import "./GameDetails.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import $ from "jquery";

export default function GameDetails() {
  const [gameDetails, setgameDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  let params = useParams();
  async function getAllGames() {
    setisLoading(true);
    let { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/game",
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          id: params.id,
        },
      }
    );
    setisLoading(false);
    setgameDetails(data);
  }

  useEffect(() => {
    getAllGames();
  }, [params.id]);

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 2500,
    nextArrow: <></>,
    prevArrow: <></>,
    cssEase: "linear",
  };
  function handleMouseEnter() {
    $(".gameImg").fadeOut(300);
  }
  function handleMouseOut() {
    $(".gameImg").fadeIn(300);
  }
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="list of games that can be played both online and offline on Windows operating system as well as on various web browsers. The list includes popular games from various genres such as action, adventure, puzzle, racing, and more. Users can easily browse through the list, choose their desired game"
        />
        <title>{gameDetails.title}</title>
        <link
          rel="shortcut icon"
          href="../../images/logo.png"
          type="image/x-icon"
        />
      </Helmet>
      {isLoading ? (
        <div className="mainLoading position-absolute top-50 start-50 translate-middle w-100 h-100 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        </div>
      ) : (
        <section
          style={{
            background: `url(https://www.freetogame.com/g/${gameDetails.id}/background.jpg) center/cover no-repeat`,
            position: "absolute",
            width: "100%",
            minHeight: "100%",
            top: "0",
          }}
        >
          <div className="overlay">
            <div key={gameDetails.id} className="container">
              <div className="row content">
                <div className="col-lg-4 col-md-12 mb-4">
                  <div className="leftSide">
                    <div
                      className="media position-relative mb-3"
                      onMouseLeave={handleMouseOut}
                    >
                      <img
                        src={gameDetails.thumbnail}
                        className="w-100 shadow gameImg position-absolute rounded-1"
                        alt=""
                        onMouseMove={handleMouseEnter}
                      />
                      <video
                        autoPlay
                        loop
                        muted
                        className="w-100 position-relative z-indexMin rounded-1"
                      >
                        <source
                          src={`https://www.freetogame.com/g/${gameDetails.id}/videoplayback.webm`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <div className="position-absolute top-50 start-50 translate-middle z-indexMin1 w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                        <i className="fa-solid fa-spinner fa-spin-pulse h1"></i>
                      </div>
                    </div>
                    <div className="row w-100 m-0">
                      <Link
                        to={gameDetails.freetogame_profile_url}
                        target="_blank"
                        className="btn btn-dark col-2 text-light p-2 shadow"
                      >
                        Free
                      </Link>

                      <Link
                        to={gameDetails.game_url}
                        target="_blank"
                        className="btn bg-main col-10 text-light fw-bold p-2 shadow"
                      >
                        PLAY NOW{" "}
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="rightSide col-lg-8 col-md-12">
                  <h1>{gameDetails.title}</h1>
                  <h5 className="mb-0">About {gameDetails.title}</h5>
                  <p className="fs-5 mb-4">{gameDetails.description}</p>

                  {gameDetails.minimum_system_requirements ? (
                    <>
                      <h5 className="mb-2">Minimum System Requirements</h5>
                      <p className="mb-1">
                        Graphics:{" "}
                        {gameDetails.minimum_system_requirements?.graphics}
                      </p>
                      <p className="mb-1">
                        Memory:{" "}
                        {gameDetails.minimum_system_requirements?.memory}
                      </p>
                      <p className="mb-1">
                        Os: {gameDetails.minimum_system_requirements?.os}
                      </p>
                      <p className="mb-1">
                        Processor:{" "}
                        {gameDetails.minimum_system_requirements?.processor}
                      </p>
                      <p className="mb-1">
                        Storage:{" "}
                        {gameDetails.minimum_system_requirements?.storage}
                      </p>
                    </>
                  ) : null}
                  <div className="screenshots mt-4 mb-4">
                    {gameDetails.screenshots &&
                    gameDetails.screenshots.length > 0 ? (
                      <>
                        <h5 className="mb-3">
                          {gameDetails.title} Screenshots
                        </h5>
                        <Slider {...settings}>
                          {gameDetails.screenshots.map((screenshot) => (
                            <div key={screenshot.id}>
                              <img
                                className="w-100 rounded-2 shadow"
                                src={screenshot.image}
                                alt=""
                              />
                            </div>
                          ))}
                        </Slider>
                      </>
                    ) : null}
                  </div>
                  <div className="information mb-5">
                    <h5 className="mb-3">Additional Information</h5>
                    <div className="row">
                      <div className="col-4 text-center">
                        <div>
                          <h3 className="h6 text-secondary mb-1">Title</h3>
                          <p>{gameDetails.title}</p>
                        </div>
                        <div>
                          <h3 className="h6 text-secondary mb-1">
                            Release Date
                          </h3>
                          <p>{gameDetails.release_date}</p>
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <div>
                          <h3 className="h6 text-secondary mb-1">Developer</h3>
                          <p>{gameDetails.developer}</p>
                        </div>
                        <div>
                          <h3 className="h6 text-secondary mb-1">Genre</h3>
                          <p>{gameDetails.genre}</p>
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <div>
                          <h3 className="h6 text-secondary mb-1">Publisher</h3>
                          <p>{gameDetails.publisher}</p>
                        </div>
                        <div>
                          <h3 className="h6 text-secondary mb-1">Platform</h3>
                          <p>
                            {gameDetails.platform === "Windows" ? (
                              <i className="fa-brands fa-windows text-secondary"></i>
                            ) : (
                              <i className="fa-solid fa-window-maximize text-secondary"></i>
                            )}{" "}
                            {gameDetails.platform}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
