import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import {AuthProvider} from './providers/auth/auth.provider'

import { theme } from "./themes/theme";

import Board from "./pages/Board";
import {Signup} from "./pages/Signup"
import {Login} from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
          <BrowserRouter>
              <Route exact path="/" component={Board} />
              <Route exact path="/protected" component={ProtectedRoute} />
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/login" component={Login}/>
          </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
