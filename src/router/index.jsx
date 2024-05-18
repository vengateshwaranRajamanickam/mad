import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error/index";
import Page404 from "../pages/Error/Page404";
import Home from "../pages/Home/index ";
import { MathJaxContext } from "better-react-mathjax";

  /*MathJax*/
  const config = {
    loader: { load: ["input/asciimath"] },
    asciimath: {
      displaystyle: true,
      delimiters: [
        ["$", "$"],
        ["`", "`"]
      ]
    }
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
