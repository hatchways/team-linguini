import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth/auth.provider";

import { theme } from "./themes/theme";

import Board from "./pages/Board";
import Calendar from "./pages/Calendar"
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LogOut from "./helpers/LogOut";

import "./App.css";
import {DashboardProvider} from "./context/dashboard/dashboard.provider";
import Test from './pages/Test'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
          <BrowserRouter>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/login" component={Login}/>
              <DashboardProvider>
                  <ProtectedRoute exact path="/" component={Board} />
                  <ProtectedRoute exact path="/" component={Calendar} />
              </DashboardProvider>
              <ProtectedRoute exact path="/logout" component={LogOut} />
              <Route exact path="/test" component={Test}/>
          </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
