import React, {useReducer, useState} from "react";
import isAuthenticatedReducer from './isAuthenticated.reducer';
import userReducer from './user.reducer'

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    //2 states of AuthProviders to store the state of authentication
    const preAuthenticated = window.localStorage.getItem('isAuthenticated') || false;
    const preUserInfo = window.localStorage.getItem('userInfor') || null;
    const [isAuthenticated, dispatchIsAuthenticated] = useReducer(isAuthenticatedReducer, preAuthenticated);
    const [user, dispatchUser] = useReducer(userReducer, preUserInfo);

    //Make callbacks as the state which will be called when user triggers actions (login, sign up or logout)
    // const login = (data) => {};
    // const signup = (data) => {};

    // const data = {isAuthenticated, user};

    const defaultContext = {
        isAuthenticated,
        user,
        dispatchIsAuthenticated,
        dispatchUser
    }

    return (
        <AuthContext.Provider value = {defaultContext} {...props}/>
    )
}

const useAuth = () => React.useContext(AuthContext);

export {
    useAuth,
    AuthProvider
}