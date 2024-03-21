import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import AllGames from "./Components/AllGames/AllGames";
import Platforms from "./Components/Platforms/Platforms";
import Sort from "./Components/Sort/Sort";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import GameDetails from "./Components/GameDetails/GameDetails";
import { useEffect, useState } from "react";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

export default function App() {
  const [UserData, setUserData] = useState(null);

  const userToken = JSON.parse(localStorage.getItem("UserToken"));
  function saveUserData() {
    const userToken = JSON.parse(localStorage.getItem("UserToken"));
    const userData = JSON.parse(localStorage.getItem("UserData"));
    if (userData && userToken) {
      setUserData(userData);
    }
  }
  useEffect(() => {
    saveUserData();
  }, []);
  const router = createHashRouter([
    {
      path: "",
      element: <Layout UserData={UserData} setUserData={setUserData} />,
      children: [
        { index: true, element: <Home /> },
        { path: "/games/all", element: <AllGames /> },
        { path: "/games/platforms/:platform", element: <Platforms /> },
        { path: "/games/sort-by/:sort", element: <Sort /> },
        { path: "/games/Categories/:category", element: <Categories /> },
        { path: "/gameDetails/:id", element: <GameDetails /> },
        {
          path: "/Login",
          element: (
            <ProtectedRoutes userToken={userToken}>
              {" "}
              <Login setUserData={setUserData} saveUserData={saveUserData} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/ForgotPassword",
          element: (
            <ProtectedRoutes userToken={userToken}>
              {" "}
              <ForgotPassword saveUserData={saveUserData} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/resetpassword",
          element: (
            <ProtectedRoutes userToken={userToken}>
              {" "}
              <ResetPassword saveUserData={saveUserData} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/Register",
          element: (
            <ProtectedRoutes userToken={userToken}>
              {" "}
              <Register />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
