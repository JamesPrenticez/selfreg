import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import './registerServiceWorker';

import { Provider as ReduxProvider } from "react-redux";
import { store } from '@redux/store';

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </ReduxProvider>
);
