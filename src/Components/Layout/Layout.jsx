import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout({ UserData, setUserData }) {
  return (
    <>
      <Navbar UserData={UserData} setUserData={setUserData} />
      <Outlet></Outlet>
    </>
  );
}
