import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";

import {AuthProvider} from './providers/auth/auth.provider'

import { theme } from "./themes/theme";

import Board from "./pages/Board";
import {Signup} from "./pages/Signup"
import {Login} from "./pages/Login";
import Test from "./pages/Test"

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
          <BrowserRouter>
              <Route exact path="/" component={Board} />
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/test" component={Test}/>
          </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
