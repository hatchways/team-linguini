import React, { useState } from "react";
import { useAuth } from "../context/auth/auth.provider";
import { authStyle } from "../themes/signup.style";
import {
  setIsAuthenticated,
  fetchUserSuccess,
  fetchUserRequest,
  fetchUserFailure,
} from "../context/auth/auth.action";

import { AuthForm, RedirectDiv } from "../components/auth";
import { Grid, makeStyles, Typography, Box, Button } from "@material-ui/core";

const Login = () => {
  const auth = useAuth();
  const { dispatchIsAuthenticated, dispatchUser } = auth;
  const [serverResponse, setServerResponse] = useState("");

  //Classes of CSS style
  const classes = makeStyles(authStyle)();

  //Callback for the form submission after validating successfully
  const onSubmit = (data) => {
    const { email, password } = data;

    setServerResponse("");

    //Make request to check whether the email and password are valid
    const url = "/api/v1/auth/login"; //It is mock data, it will change when sever can provide auth api

    dispatchUser(fetchUserRequest());

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        //If success to create a new account, redirect to login page
        if (!res.error) {
          //Save data on local storage
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.token));

          //Update the state of Auth providers
          dispatchIsAuthenticated(setIsAuthenticated(true));
          dispatchUser(fetchUserSuccess(res.user));
          console.log("login successfully");

          //Redirect to dashboard
          window.location.replace("/");
        } else {
          throw Error(res.error);
        }
      })
      .catch((e) => {
        // console.log(e);
        dispatchUser(fetchUserFailure(e.message));
        setServerResponse(e.message);
      });
  };
  const onDemoSubmit = () => {
    const { email, password } = {
      email: "test@test.com",
      password: "testtest",
    };

    setServerResponse("");

    //Make request to check whether the email and password are valid
    const url = "/api/v1/auth/login"; //It is mock data, it will change when sever can provide auth api

    dispatchUser(fetchUserRequest());

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        //If success to create a new account, redirect to login page
        if (!res.error) {
          //Save data on local storage
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.token));

          //Update the state of Auth providers
          dispatchIsAuthenticated(setIsAuthenticated(true));
          dispatchUser(fetchUserSuccess(res.user));
          console.log("login successfully");

          //Redirect to dashboard
          window.location.replace("/");
        } else {
          throw Error(res.error);
        }
      })
      .catch((e) => {
        // console.log(e);
        dispatchUser(fetchUserFailure(e.message));
        setServerResponse(e.message);
      });
  };
  return (
    <Grid container className={classes.vh100}>
      <Grid item md={6} xs={12} className={classes.img}>
        {/*<img alt='' src={"/images/image1.png"} className={classes.img}/>*/}
      </Grid>
      <Grid item md={6} xs={12}>
        <AuthForm
          title="Welcome back!"
          input1="Enter email"
          input2="Password"
          submit="Log in"
          onSubmit={onSubmit}
          serverResponse={serverResponse}
        />
        <RedirectDiv
          title={"Don't have an account?"}
          link={"/signup"}
          desc={"Create"}
        />
        <Box className={classes.demoContainer} mt={3} mb={2}>
          <Typography className={classes.demoDescription}>
            Do not want to create an account. Click Below:
          </Typography>
        </Box>
        <Box className={classes.demoContainer}>
          <Button
            variant="contained"
            onClick={onDemoSubmit}
            className={classes.demoButton}
          >
            <Typography className={classes.demoDescription}>
              Try Demo!
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export { Login };
