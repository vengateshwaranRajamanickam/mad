import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { store, persistor } from "./store/store.js";
import { router } from "./router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
       <ToastContainer style={{ top: "50px" }} />
    </PersistGate>
  </Provider>

  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
