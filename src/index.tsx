import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.less";
import "../styles/carbon.less";
import "../styles/example.less";
import Dashboard from "./Dashboard";

const APP_ELEMENT = document.getElementById("app");

if (APP_ELEMENT) {
  const root = createRoot(APP_ELEMENT);
  root.render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>
  );
}
