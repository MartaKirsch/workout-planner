import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { changeAxiosHeader } from "utils/functions/changeAxiosHeader";
import { hasToken } from "utils/typeGuards/hasToken.guard";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// axios setup
axios.defaults.withCredentials = true;

axios.interceptors.response.use((response) => {
  if (hasToken(response)) {
    changeAxiosHeader(response?.data.token);
  }

  return response;
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
