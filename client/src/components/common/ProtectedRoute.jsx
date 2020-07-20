import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, render, ...rest }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to="/login" />;
        if (isAuthenticated && !user.isVerified)
          return <Redirect to="/unverified-user" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
