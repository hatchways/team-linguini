import React from "react";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const login = () => {};
    const signup = () => {};
    const data = {};

    return (
        <AuthContext.Provider value = {{data, login, signup}} {...props}/>
    )
}

const useAuth = () => React.useContext(AuthContext);

export {
    AuthContext,
    AuthProvider
}