import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FOFContextProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FOFContextProvider>
    <App />
  </FOFContextProvider>
);
