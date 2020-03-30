import React from "react";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const signin = () => {};
    const signup = () => {};
    const data = {};

    return (
        <AuthContext.Provider value = {{data, signin, signup}} {...props}/>
    )
}

const useAuth = () => React.useContext(AuthContext);

export {
    AuthContext,
    AuthProvider
}