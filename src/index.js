import React from "react";
import ReactDOM from "react-dom/client";
import "./my_reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import KakaoMapScript from './KakaoMapScript';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <KakaoMapScript />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
