import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FOFContextProvider } from "./context/context";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FOFContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FOFContextProvider>
);
