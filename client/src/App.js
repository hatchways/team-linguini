import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import {AuthProvider} from './helpers/auth'

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import {Signup} from "./pages/Signup"
import {Login} from "./pages/Login";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
          <AuthProvider>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/login" component={Login}/>
          </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
