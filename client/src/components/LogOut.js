import React from "react";
import { Route, Redirect } from "react-router-dom";

const LogOut = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  return (
    <Route
      render={(props) => (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )}
    />
  );
};

export default LogOut;
