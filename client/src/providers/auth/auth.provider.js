import React, {useReducer} from "react";
import isAuthenticatedReducer from './isAuthenticated.reducer';
import userReducer from './user.reducer'

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    //2 states of AuthProviders to store the state of authentication
    const preAuthenticated = window.localStorage.getItem('isAuthenticated') || false;
    const preUserInfo = window.localStorage.getItem('user') || null;
    const [isAuthenticated, dispatchIsAuthenticated] = useReducer(isAuthenticatedReducer, preAuthenticated);
    const [user, dispatchUser] = useReducer(userReducer, preUserInfo);


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