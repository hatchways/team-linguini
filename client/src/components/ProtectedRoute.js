import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const checkLocalStorage = localStorage.getItem("isAuthenticated");
  return (
    <Route
      {...rest}
      render={(props) => 
        checkLocalStorage === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
