import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";

const themeColor = {
  darkcyan: {
    rgba: "rgba(50, 70, 100, 0.3)",
    bg: "#c1c7d0",
    font: "#496660",
    btnFont: "darkcyan",
    fade: "#c1c7d0",
    main: "darkcyan",
  },
  salmon: {
    rgba: "rgb(231 178 157 / 32%)",
    bg: "#f7e6df",
    font: "salmon",
    btnFont: "tomato",
    fade: "#eddbd4",
    main: "salmon",
    second: "mistyrose",
  },
};

ReactDOM.render(
  <ThemeProvider theme={themeColor}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
