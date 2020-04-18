import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth/auth.provider";

import { theme } from "./themes/theme";

import Board from "./pages/Board";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LogOut from "./helpers/LogOut";

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute exact path="/" component={Board} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/logout" component={LogOut} />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
