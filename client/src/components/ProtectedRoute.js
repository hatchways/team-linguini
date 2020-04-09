import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../providers/auth/auth.provider";

const ProtectedRoute = ({ children, ...rest }) => {
  // const { isAuthenticated, user } = useContext(AuthContext)
  // console.log(isAuthenticated)
  // console.log(user)

  const checkLocalStorage = localStorage.getItem("isAuthenticated");
  console.log(checkLocalStorage);
  return (
    <Route
      {...rest}
      render={(props) =>
        checkLocalStorage ? (
          children
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
