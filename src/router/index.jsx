import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error/index";
import Page404 from "../pages/Error/Page404";
import Home from "../pages/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
      path: "/",
      element:  <Home />,
      index: true
      },
      { path: "*", element: <Page404 /> },
    ],
  },
]);
