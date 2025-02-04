import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TestModeContextProvider } from "./Contexts/TestModeContext";
import { ThemeContextProvider } from "./Contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TestModeContextProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
        
      </TestModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
