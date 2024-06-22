/* eslint-disable react-refresh/only-export-components */
import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import { useEffect } from "react";
import img from "../assets/background/img4.jpg";
import Login from "../pages/Login/Index";
import Register from "../pages/Register/";
import ProtectedRoute from "./ProtectedRoute";
import NoteList from "../component/NoteList";
import NoteDetail from "../component/NoteDetail";
import { listFolderLoader } from "../apiLoader";

const AuthLayout = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      document.body.style.backgroundImage = `Url(${img})`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.height = "93vh";
      document.body.style.display = "flex";
    } else {
      document.body.style.background = "#ffffff";
    }
  }, [location]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            loader: listFolderLoader,
            path: "",
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                children: [
                  {
                    element: <NoteDetail />,
                    path: `notes/:noteId`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
