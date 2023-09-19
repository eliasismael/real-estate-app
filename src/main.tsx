import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import HouseContextProvider from "./context/House";
import UserContextProvider from "./context/User/index.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <UserContextProvider>
    <HouseContextProvider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </HouseContextProvider>
  </UserContextProvider>
);
