import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error/index";
import Page404 from "../pages/Error/Page404";
import Home from "../pages/Home/index ";
import { MathJaxContext } from "better-react-mathjax";


const config = {
 

  // loader: { load: ["input/asciimath"] },
  // asciimath: {
  //   displaystyle: true,
  //   delimiters: [
  //     ["$", "$"],
  //     ["`", "`"],
  //   ]
  // } 
  //working

  // loader: { load: ["[tex]/html","input/asciimath"] },
  // tex: {
  //   packages: { "[+]": ["html"] },
  //   inlineMath: [
  //     ["$", "$"],
  //     ["\\(", "\\)"]
  //   ],
  //   displayMath: [
  //     ["$$", "$$"],
  //     ["\\[", "\\]"]
  //   ],
  // },
  // asciimath: {
  //   displaystyle: true,
  //   delimiters: [
  //     ["$", "$"],
  //     ["`", "`"]
  //   ]
  // } 
  // combine

  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
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
      <MathJaxContext  version={3} config={config}>    
         <Home />
      </MathJaxContext>,
      index: true
      },
      { path: "*", element: <Page404 /> },
    ],
  },
]);
