import axios from "axios";
import "./Recommendations.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Recommendations() {
  const [games, setgames] = useState([]);
  async function getAllGames() {
    let { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    setgames(data.slice(30, 33));
  }

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="mb-5">
          <i className="fas fa-robot mr-2"> </i> Personalized Recommendations
        </h3>
        <div className="row gy-4 mb-5">
          {games.map((game) => (
            <Link
              key={game.id}
              className="col-md-4 col-sm-6 col-12 text-decoration-none"
              to={`/gameDetails/${game.id}`}
            >
              <div className="card shadow rounded-bottom">
                <div className="overflow-hidden">
                  <img
                    src={game.thumbnail}
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <div className="cardTitle d-flex justify-content-between">
                    <h4 className="card-text text-pack mb-0 text-second">
                      {game.title}
                    </h4>
                    <h6 className="bg-main text-white p-1 rounded-2 m-0">
                      Free
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
