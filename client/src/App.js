import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { logout } from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Toast from "./components/common/Toast";
import User from "./components/user";
import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmEmail from "./components/ConfirmEmail";
import NotVerified from "./components/NotVerified";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Toast />

      <Switch>
        <Route path="/resetPassword/:token" component={ResetPassword} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/unverified-user" component={NotVerified} />
        <Route path="/confirmEmail/:token" component={ConfirmEmail} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" render={() => logout()} />
        <ProtectedRoute path="/user" component={User} />
        <Redirect from="/" to="/user" />
      </Switch>
    </div>
  );
}

export default App;
