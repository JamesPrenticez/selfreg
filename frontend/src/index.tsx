import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import './registerServiceWorker';

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate as ReduxPersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { persistStore } from 'redux-persist'

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

let persistor = persistStore(store);

root.render(
  <ReduxProvider store={store}>
    <ReduxPersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxPersistGate>
  </ReduxProvider>
);
