import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import THEME from "./theme";
import { Provider } from "react-redux";
import store from "./app/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
