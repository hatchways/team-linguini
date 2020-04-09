import React, { useContext } from 'react'
import {} from 'react-router-dom'
import { AuthContext } from "../providers/auth/auth.provider"

const ProtectedRoute = () => {
   // const { isAuthenticated, user } = useContext(AuthContext)
   // console.log(isAuthenticated)
   // console.log(user)
    
    const checkLocalStorage = localStorage.getItem("isAuthenticated")
    console.log(checkLocalStorage)
return(
    <div>ProtectedRoute</div>
)
}

export default ProtectedRoute