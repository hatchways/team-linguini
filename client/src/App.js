import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";

<<<<<<< HEAD
import { AuthProvider } from "./providers/auth/auth.provider";
=======
import {AuthProvider} from './context/auth/auth.provider'
>>>>>>> caba56ffba4e77a39783110e42dfaf5f1f756d43

import { theme } from "./themes/theme";

import Board from "./pages/Board";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
<<<<<<< HEAD
import Test from "./pages/Test";
=======
import ProtectedRoute from "./components/ProtectedRoute";
import LogOut from "./helpers/LogOut";
>>>>>>> caba56ffba4e77a39783110e42dfaf5f1f756d43

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
<<<<<<< HEAD
          <Route exact path="/" component={Board} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/test" component={Test} />
=======
          <ProtectedRoute exact path="/" component={Board} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/logout" component={LogOut} />
>>>>>>> caba56ffba4e77a39783110e42dfaf5f1f756d43
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
