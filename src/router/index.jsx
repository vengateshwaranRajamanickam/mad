import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error/index";
import Page404 from "../pages/Error/Page404";
import Home from "../pages/Home/index ";
import { MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["input/asciimath"] }
};

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
      path: "/",
      element:  
      <MathJaxContext config={config}>    
         <Home />
         </MathJaxContext>,
      index: true
      },
      { path: "*", element: <Page404 /> },
    ],
  },
]);
