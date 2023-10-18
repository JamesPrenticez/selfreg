import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
// import './registerServiceWorker';


const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
