import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Profile from "./components/Profile";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Profile />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
