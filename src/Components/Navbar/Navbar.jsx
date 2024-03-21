import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import Swal from "sweetalert2";
export default function Navbar({ UserData, setUserData }) {
  function handleLogout() {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserData");
    setUserData(null);
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-start",
      background: "#1d2024",
      color: "white",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      title: "Logged out",
    });
  }
  return (
    <>
      <nav className="navbar shadow navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand text-white me-5" to={""}>
            <img className="logoimg" src={logo} alt="" width={70} />
            Game Over
          </NavLink>
          <button
            className="navbar-toggler bg-main shadow"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={""}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/games/all"}>
                  All Games
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/platforms"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Platforms
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/platforms/pc"}
                    >
                      PC
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/platforms/browser"}
                    >
                      Browser
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/sort"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/sort-by/release-date"}
                    >
                      Release-Date
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/sort-by/popularity"}
                    >
                      Popularity
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/sort-by/alphabetical"}
                    >
                      Alphabetical
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/sort-by/relevance"}
                    >
                      Relevance
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/Categories"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Racing"}
                    >
                      Racing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Sports"}
                    >
                      Sports
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Social"}
                    >
                      Social
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Shooter"}
                    >
                      Shooter
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Open-World"}
                    >
                      Open-World
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Zombie"}
                    >
                      Zombie
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Fantasy"}
                    >
                      Fantasy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Action-RPG"}
                    >
                      Action-RPG
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Action"}
                    >
                      Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/Flight"}
                    >
                      Flight
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/games/categories/battle-royale"}
                    >
                      Battle-Royale
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            {UserData ? (
              <NavLink
                to={"/"}
                onClick={handleLogout}
                className="logout btn btn-outline-main text-light border-0 border-bottom rounded-0 opacity-75"
              >
                Logout
              </NavLink>
            ) : (
              <div className="d-flex justify-content-center">
                <NavLink to={"/login"} className="btn btn-outline-main m-2">
                  Login
                </NavLink>
                <NavLink to={"/register"} className="btn btn-outline-main m-2">
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
