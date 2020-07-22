import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { setCurrentUser } from "./actions/authActions";
import { getJwt, getCurrentUser, logout } from "./services/authService";
import http from "./services/httpService";

// Check for Token
if (getJwt()) {
  // Set auth token in http headers
  http.setJwt(getJwt());
  // Decode token and get user info and expression
  const decoded = getCurrentUser();
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded && decoded.exp < currentTime) {
    // Logout User
    logout();
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
