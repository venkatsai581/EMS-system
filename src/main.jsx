import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { EmployeeProvider } from "./context/EmployeeContext";
import { SettingsProvider } from "./context/SettingsContext";

import "./styles/global.css";
import "./styles/employees.css";
import "./styles/themes.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>
);