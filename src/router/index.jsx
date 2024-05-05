import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error/index";
import Home from "../pages/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
      path: "/",
      element:  <Home />,
      index: true
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
