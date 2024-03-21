import React, { useEffect, useState } from "react";
import "./FeaturedGames.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentLoader from "react-content-loader";
export default function FeaturedGames() {
  const [games, setgames] = useState([]);
  const [Allgames, setAllgames] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  let params = useParams();
  async function getAllGames() {
    setisLoading(true);
    let { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          platform: params.platform,
          category: params.category,
          "sort-by": params.sort,
        },
      }
    );
    setgames(data.slice(0, games.length + 50));
    setAllgames(data);
    setisLoading(false);
  }

  useEffect(() => {
    getAllGames();
  }, [params]);

  const MyLoader = (props) => (
    <ContentLoader
      speed={1}
      width={285}
      height={300}
      viewBox="0 0 285 300"
      backgroundColor="#383d43"
      foregroundColor="#232629"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="285" height="300" />
    </ContentLoader>
  );
  function handleSearch(event) {
    let filteredGames = Allgames.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setgames(filteredGames.slice(0, games.length + 50));
  }
  return (
    <>
      <div className="container d-flex flex-column justify-content-center">
        <input
          type="search"
          className="form-control search w-50 m-auto mt-4 text-light fw-bold"
          placeholder="Search"
          name="Search"
          id="Search"
          onChange={handleSearch}
        />
        <InfiniteScroll
          dataLength={games.length}
          next={getAllGames}
          hasMore={true}
          className="row mt-4 mb-5 gy-3 pb-5"
        >
          {games.map((game) => (
            <React.Fragment key={game.id}>
              {isLoading ? (
                <MyLoader
                  className={"col-lg-3 col-md-4 col-sm-6 col-12 h-100"}
                />
              ) : (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <Link
                    to={`/gameDetails/${game.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card shadow rounded-bottom">
                      <div className="overflow-hidden">
                        <img
                          src={game.thumbnail}
                          className="card-img-top w-100 h-100 rounded-0"
                          alt="..."
                        />
                      </div>
                      <div className="card-body pb-0">
                        <div className="cardTitle d-flex justify-content-between align-items-center">
                          <h4 className="card-text text-pack mb-0 pb-0 text-second">
                            {game.title}
                          </h4>
                          <h6 className="bg-main text-white p-1 rounded-2 m-0">
                            Free
                          </h6>
                        </div>
                        <p className="description text-pack w-75 mt-2">
                          {game.short_description}
                        </p>
                      </div>
                      <div className="card-footer d-flex justify-content-between align-items-center pt-2 pb-2">
                        <i className="fa-solid fa-plus text-small bg-secondary p-1 rounded-1 text-light"></i>
                        <div className="right d-flex align-items-center">
                          <h6 className="bg-secondary genre text-dark rounded-2 m-0 me-2">
                            {game.genre}
                          </h6>
                          {game.platform === "PC (Windows)" ? (
                            <i className="fa-brands fa-windows text-main"></i>
                          ) : (
                            <i className="fa-solid fa-window-maximize text-main"></i>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
