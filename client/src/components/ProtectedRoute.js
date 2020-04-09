import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../providers/auth/auth.provider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const { isAuthenticated, user } = useContext(AuthContext)
  // console.log(isAuthenticated)
  // console.log(user)

  const checkLocalStorage = localStorage.getItem("isAuthenticated");
  console.log(checkLocalStorage);
  console.log(Component)
  return (
    <Route
      {...rest}
      render={(props) => 
        checkLocalStorage === true ? (
          <Component {...rest} {...props} />
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
